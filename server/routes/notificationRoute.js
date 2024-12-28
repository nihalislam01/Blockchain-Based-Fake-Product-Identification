const express = require('express');
const { get, deleteNotification} = require('../controllers/notificationController');
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.get('/get',isAuthenticatedUser, get);
router.delete('/delete/:id', isAuthenticatedUser, deleteNotification)

module.exports = router;