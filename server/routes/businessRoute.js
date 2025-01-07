const express = require('express');
const { check, create, updateStatus, cancel, getBusinessData, getAll, getStatus, getAllPending, update} = require('../controllers/businessController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post('/create/:id',isAuthenticatedUser, create);
router.get('/check', isAuthenticatedUser, check)
router.patch('/updateStatus/:id',isAuthenticatedUser, authorizeRoles("admin"), updateStatus);
router.post('/cancel',isAuthenticatedUser, authorizeRoles("owner"), cancel);
router.get('/get', isAuthenticatedUser, getBusinessData);
router.get("/get-all", isAuthenticatedUser, authorizeRoles("admin"), getAllPending);
router.get('/all', getAll);
router.get('/status', isAuthenticatedUser, getStatus);
router.patch('/update',isAuthenticatedUser, authorizeRoles("owner"), update);

module.exports = router;