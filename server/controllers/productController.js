const express = require('express');
const crypto = require('crypto');
const Product = require('../models/Product');
const { ethers } = require('ethers');
const contractABI = require('../utils/contractABI.json');
const contractAddress = process.env.BLOCKCHAIN_PUBLIC_KEY;

const router = express.Router();
const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_SERVER);
const wallet = new ethers.Wallet(process.env.BLOCKCHAIN_PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

exports.uploadSingleProduct = catchAsyncErrors(async (req, res) => {

    const productInfo = req.body;
    const hash = crypto.createHash('sha256').update(productInfo.productId).digest('hex');
    await contract.addProduct(hash);
    productInfo.ownerId = req.user.id;
    const newProduct = new Product(productInfo);
    await newProduct.save();
    res.status(201).json({ message: 'Product uploaded successfully' });

});

exports.uploadBulkProduct = catchAsyncErrors(async (req, res) => {

    const { file } = req.body;
    if (!file) {
        return next(new ErrorHandler("No file provided", 404));
    }
    const base64Data = file.split(',')[1];
    const csvBuffer = Buffer.from(base64Data, 'base64');
    const products = [];
    csvBuffer
      .toString()
      .split('\n')
      .slice(1)
      .forEach((line) => {
        const [productId, name, description, price] = line.split(',');
        if (productId && name && description && price) {
          const hash = crypto.createHash('sha256').update(productId.trim()).digest('hex');
          products.push({ productId: productId.trim(), name,  description, price, ownerId: req.user.id, hash});
        }
      });

    for (const product of products) {
      await contract.addProduct(product.hash);
      const newProduct = new Product(product);
      await newProduct.save();
    }
    res.status(201).json({ message: 'Bulk products uploaded successfully' });

});

module.exports = router;