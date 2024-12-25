const crypto = require('crypto');
const Product = require('../models/productModel');
const Business = require('../models/businessModel');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { ethers, keccak256, toUtf8Bytes } = require('ethers');
const contractABI = require('../utils/contractABI.json');
const contractAddress = process.env.BLOCKCHAIN_CONTRACT_ADDRESS;

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_SERVER);
const wallet = new ethers.Wallet(process.env.BLOCKCHAIN_PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

exports.uploadSingleProduct = catchAsyncErrors(async (req, res, next) => {

    const productInfo = req.body;
    const business = await Business.findOne({ownerId: req.user.id});
    const productHash = keccak256(toUtf8Bytes(`${productInfo.productId}${business._id}`));
    const isVerified = await contract.verifyProduct(productHash);
    if (isVerified) {
      return next(new ErrorHandler("Product already exists", 400));
    }
    await contract.addProduct(productHash);
    productInfo.hashedValue = productHash;
    productInfo.businessId = business._id;
    const newProduct = new Product(productInfo);
    await newProduct.save();
    res.status(201).json({ success: true, message: 'Product uploaded successfully' });

});

// exports.uploadBulkProduct = catchAsyncErrors(async (req, res) => {

//     const { file } = req.body;
//     if (!file) {
//         return next(new ErrorHandler("No file provided", 404));
//     }
//     const base64Data = file.split(',')[1];
//     const csvBuffer = Buffer.from(base64Data, 'base64');
//     const products = [];
//     csvBuffer
//       .toString()
//       .split('\n')
//       .slice(1)
//       .forEach((line) => {
//         const [productId, name, description, price] = line.split(',');
//         if (productId && name && description && price) {
//           const hash = crypto.createHash('sha256').update(productId.trim()).digest('hex');
//           products.push({ productId: productId.trim(), name,  description, price, ownerId: req.user.id, hash});
//         }
//       });

//     for (const product of products) {
//       await contract.addProduct(product.hash);
//       const newProduct = new Product(product);
//       await newProduct.save();
//     }
//     res.status(201).json({ success: true, message: 'Bulk products uploaded successfully' });

// });

exports.uploadBulkProduct = catchAsyncErrors(async (req, res, next) => {

  const { products } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'No products to upload.' });
  }
  const business = await Business.findOne({ ownerId: req.user.id });

  if (!business) {
      return next(new ErrorHandler('Business not found for the user.', 404));
  }

  const validProducts = [];
  const duplicateProducts = [];
  for (const product of products) {

      const existingProduct = await Product.findOne({
          productId: product.productId,
          businessId: business._id,
      });

      if (existingProduct) {
          duplicateProducts.push(product.productId);
        continue;
    }
    const productHash = keccak256(toUtf8Bytes(`${product.productId}${business._id}`));
    validProducts.push({
        ...product,
        businessId: business._id,
        hashedValue: productHash,
    });
  }
  const productHashes = validProducts.map(product => product.hashedValue);

  if (validProducts.length > 0) {
      await contract.bulkAddProducts(productHashes);
      await Product.insertMany(validProducts);
  }

  res.status(200).json({success: true, message: 'Products uploaded successfully.', uploaded: validProducts.length,duplicates: duplicateProducts});
});

exports.verifyProduct = catchAsyncErrors(async (req, res, next) => {

  const productId = req.params.productId;
  const businessId = req.params.businessId;
  const productHash = keccak256(toUtf8Bytes(`${productId}${businessId}`));
  const isVerified = await contract.verifyProduct(productHash);
  if (!isVerified) {
    return next(new ErrorHandler("Product is not registered", 400));
  }
  res.status(201).json({ success: true, message: 'Product is verified' });

});

exports.getProductsByBusiness = catchAsyncErrors(async (req, res, next) => {
  const business = await Business.findOne({ownerId: req.user.id});
  const businessId = business._id;
  const products = await Product.find({ businessId }).sort({createdAt: -1});
  res.status(200).json({ success: true, products });
});