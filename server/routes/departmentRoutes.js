const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { authenticate, authorize, scopeToDepartment } = require('../middleware/auth');

router.post('/', authenticate, authorize('admin'), departmentController.createDepartment);
router.get('/', authenticate, authorize('admin', 'hod', 'teacher', 'student'), scopeToDepartment, departmentController.getDepartments);
router.get('/:id', authenticate, authorize('admin', 'hod', 'teacher', 'student'), scopeToDepartment, departmentController.getDepartmentById);
router.put('/:id', authenticate, authorize('admin', 'hod'), scopeToDepartment, departmentController.updateDepartment);
router.delete('/:id', authenticate, authorize('admin'), departmentController.deleteDepartment);

module.exports = router;
