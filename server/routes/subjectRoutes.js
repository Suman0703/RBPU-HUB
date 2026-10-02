const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const { authenticate, authorize, scopeToDepartment } = require('../middleware/auth');

router.post('/', authenticate, authorize('admin'), subjectController.createSubject);
router.get('/', authenticate, authorize('admin', 'hod', 'teacher', 'student'), scopeToDepartment, subjectController.getSubjects);
router.get('/:id', authenticate, authorize('admin', 'hod', 'teacher', 'student'), scopeToDepartment, subjectController.getSubjectById);
router.put('/:id', authenticate, authorize('admin', 'hod'), scopeToDepartment, subjectController.updateSubject);
router.delete('/:id', authenticate, authorize('admin'), subjectController.deleteSubject);

module.exports = router;
