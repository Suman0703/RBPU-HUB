const Class = require('../models/Class');

exports.createClass = async (req, res) => {
  try {
    const cls = new Class(req.body);
    await cls.save();
    res.status(201).json(cls);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getClasses = async (req, res) => {
  try {
    const filter = { ...req.scopedFilter };
    if (filter.classId) {
      filter._id = filter.classId;
      delete filter.classId;
    }

    const classes = await Class.find(filter);
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const filter = { _id: req.params.id, ...req.scopedFilter };
    if (filter.classId) {
      if (filter.classId.toString() !== req.params.id) {
        return res.status(404).json({ message: 'Class not found' });
      }
      delete filter.classId;
    }

    const cls = await Class.findOne(filter);
    if (!cls) return res.status(404).json({ message: 'Class not found' });
    res.json(cls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const filter = { _id: req.params.id, ...req.scopedFilter };
    if (filter.classId) {
      if (filter.classId.toString() !== req.params.id) {
        return res.status(404).json({ message: 'Class not found' });
      }
      delete filter.classId;
    }

    const cls = await Class.findOneAndUpdate(filter, req.body, { new: true, runValidators: true });
    if (!cls) return res.status(404).json({ message: 'Class not found' });
    res.json(cls);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const cls = await Class.findByIdAndDelete(req.params.id);
    if (!cls) return res.status(404).json({ message: 'Class not found' });
    res.json({ message: 'Class deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
