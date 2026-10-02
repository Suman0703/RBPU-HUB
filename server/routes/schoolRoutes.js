const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate);

router.post('/', authorize('admin'), schoolController.createSchool);
router.get('/', authorize('admin'), schoolController.getSchools);
router.get('/:id', authorize('admin'), schoolController.getSchoolById);
router.put('/:id', authorize('admin'), schoolController.updateSchool);
router.delete('/:id', authorize('admin'), schoolController.deleteSchool);

module.exports = router;
