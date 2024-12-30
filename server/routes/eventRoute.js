const express = require('express');
const { get, create} = require('../controllers/eventController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get('/get',isAuthenticatedUser, authorizeRoles("owner", "admin"), get);
router.post('/create', isAuthenticatedUser, authorizeRoles("owner", "admin"), create);

module.exports = router;