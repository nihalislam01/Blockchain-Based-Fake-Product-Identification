const express = require('express');
const { uploadSingleProduct, uploadBulkProduct, verifyProduct, 
    getProductsByBusiness, getVerifiedProducts, getTotalProducts, 
    getVerificationHistory, deleteVerification } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post('/upload-single',isAuthenticatedUser, authorizeRoles("owner"), uploadSingleProduct);
router.post('/upload-bulk',isAuthenticatedUser, authorizeRoles("owner"), uploadBulkProduct);
router.get('/verify/:productId/:businessId',isAuthenticatedUser, verifyProduct);
router.get('/get', isAuthenticatedUser, getProductsByBusiness);
router.get('/verification-data', isAuthenticatedUser, authorizeRoles("owner"), getVerifiedProducts);
router.get('/total-products', isAuthenticatedUser, authorizeRoles("owner"), getTotalProducts);
router.get('/history', isAuthenticatedUser, getVerificationHistory);
router.delete('/delete-verification/:id', isAuthenticatedUser, deleteVerification);

module.exports = router;