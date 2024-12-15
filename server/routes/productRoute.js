const express = require('express');
const { uploadSingleProduct, uploadBulkProduct } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post('/upload-single',isAuthenticatedUser, authorizeRoles("owner"), uploadSingleProduct);
router.post('/upload-bulk',isAuthenticatedUser, authorizeRoles("owner"), uploadBulkProduct);

module.exports = router;