const Product = require('../models/productModel');
const Business = require('../models/businessModel');
const Verification = require('../models/verificationModel');
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
  const business = await Business.findById(req.params.businessId);
  if (!business) {
    return next(new ErrorHandler("Business not found", 404));
  }
  const businessId = business._id;
  const verification = new Verification({productId, businessId, verifiedBy: req.user.id});
  const productHash = keccak256(toUtf8Bytes(`${productId}${businessId}`));
  const isVerified = await contract.verifyProduct(productHash);
  if (!isVerified) {
    verification.status = false;
    await verification.save();
    return next(new ErrorHandler("Product is not registered", 400));
  }
  verification.status = true;
  await verification.save();
  res.status(201).json({ success: true, message: 'Product is verified' });

});

exports.getProductsByBusiness = catchAsyncErrors(async (req, res, next) => {
  const business = await Business.findOne({ownerId: req.user.id});
  const businessId = business._id;
  const products = await Product.find({ businessId }).sort({createdAt: -1});
  res.status(200).json({ success: true, products });
});

exports.getVerifiedProducts = catchAsyncErrors(async (req, res, next) => {

  const business = await Business.findOne({ownerId: req.user.id});
  const result = await Verification.aggregate([
    {
      $match: {
        businessId: business._id,
      },
    },
      {
          $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
              validVerifications: { $sum: { $cond: [{ $eq: ["$status", true] }, 1, 0] } },
              invalidVerifications: { $sum: { $cond: [{ $eq: ["$status", false] }, 1, 0] } },
          },
      },
      { $sort: { _id: 1 } },
  ]);
  res.status(200).json({success: true, result});
});

exports.getTotalProducts = catchAsyncErrors(async (req, res, next) =>{
  const business = await Business.findOne({ownerId: req.user.id});
  const totalProducts = await Product.countDocuments({businessId: business._id});
  const totalVerifications = await Verification.countDocuments({businessId: business._id});
  res.status(200).json({ success: true, totalProducts, totalVerifications });
});

exports.getVerificationHistory = catchAsyncErrors(async (req, res, next) => {
  const verifications = await Verification.find({ verifiedBy: req.user.id })
  .populate({
      path: "businessId",
      select: "organizationName",
  })
  .sort({ createdAt: -1 });
  res.status(200).json({ success: true, history: verifications });
});