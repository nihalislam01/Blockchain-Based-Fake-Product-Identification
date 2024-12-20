const express = require('express');
const { uploadSingleProduct, uploadBulkProduct, verifyProduct, getProductsByBusiness } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post('/upload-single',isAuthenticatedUser, authorizeRoles("owner"), uploadSingleProduct);
router.post('/upload-bulk',isAuthenticatedUser, authorizeRoles("owner"), uploadBulkProduct);
router.get('/verify/:productId/:businessId',isAuthenticatedUser, verifyProduct);
router.get('/get', isAuthenticatedUser, getProductsByBusiness);

module.exports = router;