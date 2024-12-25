const express = require('express');
const { register, verifyCallback, get, getAll,
    updatePassword, oauth, oauthCallback, login, logout, updateStatus,
    checkUser, resetPassword, forgotPassword, getAvatar,
    updateProfile, uploadAvatar, getLoginMethods } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post('/register', register);
router.get('/verify-email', verifyCallback);
router.get('/get', isAuthenticatedUser, get);
router.get('/get-all', isAuthenticatedUser, authorizeRoles("admin"), getAll);
router.put('/password/update',isAuthenticatedUser, updatePassword);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset', resetPassword);
router.post('/login', login);
router.get('/auth/google', oauth)
router.get('/auth/google/callback', oauthCallback);
router.post('/logout', isAuthenticatedUser, logout);
router.get('/check', isAuthenticatedUser, checkUser);
router.get("/getAvatar", isAuthenticatedUser, getAvatar);
router.put("/updateProfile", isAuthenticatedUser, updateProfile);
router.put("/uploadAvatar", isAuthenticatedUser, uploadAvatar);
router.get('/get/login-methods', isAuthenticatedUser, getLoginMethods);
router.patch('/updateStatus/:id', isAuthenticatedUser, authorizeRoles("admin"), updateStatus);

module.exports = router;