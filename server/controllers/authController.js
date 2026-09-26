const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res, next) => {
  try {
    const { email, rollNo, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    if (!email && !rollNo) {
      return res.status(400).json({ message: 'Email or Roll No is required' });
    }

    // Find the user by email or rollNo
    const query = email ? { email } : { rollNo };
    const user = await User.findOne(query);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Sign JWT
    const payload = {
      userId: user._id,
      role: user.role,
      departmentId: user.departmentId,
      classId: user.classId,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', {
      expiresIn: '1d', // Token expires in 1 day
    });

    // Short profile object (excluding password)
    const profile = {
      _id: user._id,
      name: user.name,
      email: user.email,
      rollNo: user.rollNo,
      role: user.role,
      departmentId: user.departmentId,
      classId: user.classId,
    };

    res.status(200).json({
      message: 'Login successful',
      token,
      user: profile,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    // req.user is set by the authenticate middleware
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};
