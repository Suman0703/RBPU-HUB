const Department = require('../models/Department');

exports.createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const filter = { ...req.scopedFilter };
    if (filter.departmentId) {
      filter._id = filter.departmentId;
      delete filter.departmentId;
    }
    delete filter.classId;

    const departments = await Department.find(filter);
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const filter = { _id: req.params.id, ...req.scopedFilter };
    if (filter.departmentId) {
      if (filter.departmentId.toString() !== req.params.id) {
        return res.status(404).json({ message: 'Department not found' });
      }
      delete filter.departmentId;
    }
    delete filter.classId;

    const department = await Department.findOne(filter);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const filter = { _id: req.params.id, ...req.scopedFilter };
    if (filter.departmentId) {
      if (filter.departmentId.toString() !== req.params.id) {
        return res.status(404).json({ message: 'Department not found' });
      }
      delete filter.departmentId;
    }
    delete filter.classId;

    const department = await Department.findOneAndUpdate(filter, req.body, { new: true, runValidators: true });
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.json(department);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.json({ message: 'Department deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
