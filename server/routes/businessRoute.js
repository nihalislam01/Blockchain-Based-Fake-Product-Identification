const express = require('express');
const { check, create, updateStatus, cancel } = require('../controllers/businessController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post('/create/:id',isAuthenticatedUser, create);
router.get('/check', isAuthenticatedUser, check)
router.get('/updateStatus',isAuthenticatedUser, updateStatus);
router.get('/cancel',isAuthenticatedUser, authorizeRoles("owner"), cancel);

module.exports = router;