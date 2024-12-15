const express = require('express');
const { uploadSingleProduct, uploadBulkProduct, verifyProduct } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post('/upload-single',isAuthenticatedUser, authorizeRoles("owner"), uploadSingleProduct);
router.post('/upload-bulk',isAuthenticatedUser, authorizeRoles("owner"), uploadBulkProduct);
router.get('/verify/:id',isAuthenticatedUser, verifyProduct);

module.exports = router;