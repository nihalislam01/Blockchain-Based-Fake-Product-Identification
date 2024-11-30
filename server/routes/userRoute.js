const express = require('express');
const { register, verifyCallback, get, getAll, updatePassword, oauth, oauthCallback, login, logout } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post('/register', register);
router.get('/verify-email', verifyCallback);
router.get('/get', isAuthenticatedUser, get);
router.get('/get/all', isAuthenticatedUser, authorizeRoles("admin"), getAll);
router.patch('/update/password', updatePassword);
router.post('/login', login);
router.get('/auth/google', oauth)
router.get('/auth/google/callback', oauthCallback);
router.post('/logout', logout);

module.exports = router;