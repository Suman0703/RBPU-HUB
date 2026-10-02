const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/assign-teacher', authenticate, authorize('admin', 'hod'), userController.assignTeacher);
router.post('/assign-student', authenticate, authorize('admin', 'hod'), userController.assignStudent);

module.exports = router;
