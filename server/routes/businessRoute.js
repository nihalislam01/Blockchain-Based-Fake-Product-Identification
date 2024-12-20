const express = require('express');
const { check, create, updateStatus, cancel, getBusinessData, getAll } = require('../controllers/businessController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post('/create/:id',isAuthenticatedUser, create);
router.get('/check', isAuthenticatedUser, check)
router.get('/updateStatus',isAuthenticatedUser, updateStatus);
router.post('/cancel',isAuthenticatedUser, authorizeRoles("owner"), cancel);
router.get('/get', isAuthenticatedUser, getBusinessData);
router.get('/all', isAuthenticatedUser, getAll);

module.exports = router;