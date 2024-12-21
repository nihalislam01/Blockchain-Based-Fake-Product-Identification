const express = require('express');
const { getAll, get, create, update, updateStatus } = require('../controllers/stripeController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get('/getAll',isAuthenticatedUser, authorizeRoles('admin'), getAll);
router.get('/get',isAuthenticatedUser, get);
router.post('/create',isAuthenticatedUser, authorizeRoles('admin'), create);
router.patch('/update/:paymentId',isAuthenticatedUser, authorizeRoles('admin'), update);
router.patch('/updateStatus/:paymentId',isAuthenticatedUser, authorizeRoles('admin'), updateStatus);

module.exports = router;