const express = require('express');
const { verifyAdmin } = require('../controllers/auth');
const { getRequestById, makeRequest, getAllRequests, deleteRequest } = require('../controllers/request');
const { getUserById } = require('../controllers/user');
const router = express();

router.param('requestId',getRequestById);
router.param('userId',getUserById);
router.post('/make-request/:userId',makeRequest)
router.get('/get-all-requests',verifyAdmin,getAllRequests)
router.delete('/delete-request/:requestId',deleteRequest)

module.exports = router;