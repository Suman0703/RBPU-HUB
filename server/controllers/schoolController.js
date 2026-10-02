const School = require('../models/School');

exports.createSchool = async (req, res) => {
  try {
    const school = new School(req.body);
    await school.save();
    res.status(201).json(school);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getSchools = async (req, res) => {
  try {
    const filter = { ...req.scopedFilter };
    delete filter.schoolId;
    delete filter.departmentId;
    delete filter.classId;

    const schools = await School.find(filter);
    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSchoolById = async (req, res) => {
  try {
    const filter = { _id: req.params.id, ...req.scopedFilter };
    delete filter.schoolId;
    delete filter.departmentId;
    delete filter.classId;

    const school = await School.findOne(filter);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSchool = async (req, res) => {
  try {
    const filter = { _id: req.params.id, ...req.scopedFilter };
    delete filter.schoolId;
    delete filter.departmentId;
    delete filter.classId;

    const school = await School.findOneAndUpdate(filter, req.body, { new: true, runValidators: true });
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.json(school);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.json({ message: 'School deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
