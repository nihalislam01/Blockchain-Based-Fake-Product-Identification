const express = require('express');
const { register, verifyCallback, get, getAll, updatePassword, oauth, oauthCallback, login, logout, checkUser, resetPassword, forgotPassword } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post('/register', register);
router.get('/verify-email', verifyCallback);
router.get('/get', isAuthenticatedUser, get);
router.get('/get/all', isAuthenticatedUser, authorizeRoles("admin"), getAll);
router.put('/password/update', updatePassword);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset', resetPassword);
router.post('/login', login);
router.get('/auth/google', oauth)
router.get('/auth/google/callback', oauthCallback);
router.post('/logout', logout);
router.get('/check', isAuthenticatedUser, checkUser)

module.exports = router;