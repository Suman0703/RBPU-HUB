const User = require('../models/User');

exports.assignTeacher = async (req, res) => {
  try {
    const { teacherId, subjectId, classId } = req.body;
    
    // Find the teacher
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Check HOD department scope
    if (req.user.role === 'hod' && teacher.departmentId.toString() !== req.user.departmentId) {
      return res.status(403).json({ message: 'Cannot assign teacher outside your department' });
    }

    // Update teacher assignments
    if (subjectId) teacher.subjectId = subjectId;
    if (classId) teacher.classId = classId;

    await teacher.save();
    res.json({ message: 'Teacher assigned successfully', teacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.assignStudent = async (req, res) => {
  try {
    const { studentId, classId } = req.body;
    
    // Find the student
    const student = await User.findById(studentId);
    if (!student || student.role !== 'student') {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check HOD department scope
    if (req.user.role === 'hod' && student.departmentId.toString() !== req.user.departmentId) {
      return res.status(403).json({ message: 'Cannot assign student outside your department' });
    }

    // Update student assignment
    if (classId) student.classId = classId;

    await student.save();
    res.json({ message: 'Student assigned successfully', student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
