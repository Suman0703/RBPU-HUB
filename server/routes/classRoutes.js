const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { authenticate, authorize, scopeToDepartment } = require('../middleware/auth');

router.post('/', authenticate, authorize('admin'), classController.createClass);
router.get('/', authenticate, authorize('admin', 'hod', 'teacher', 'student'), scopeToDepartment, classController.getClasses);
router.get('/:id', authenticate, authorize('admin', 'hod', 'teacher', 'student'), scopeToDepartment, classController.getClassById);
router.put('/:id', authenticate, authorize('admin', 'hod'), scopeToDepartment, classController.updateClass);
router.delete('/:id', authenticate, authorize('admin'), classController.deleteClass);

module.exports = router;
