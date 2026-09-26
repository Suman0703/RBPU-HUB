const jwt = require('jsonwebtoken');

// Middleware to authenticate user via JWT
exports.authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to authorize specific roles
exports.authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};

// Middleware to enforce data isolation by department/class
exports.scopeToDepartment = (req, res, next) => {
  /*
   * CORE DATA-ISOLATION RULE:
   * This middleware automatically adds departmentId (and classId where relevant)
   * from the authenticated user into a `req.scopedFilter` object.
   * Every future module's controllers MUST spread `req.scopedFilter` when querying
   * the database (e.g., `Model.find({ ...req.scopedFilter, otherQuery })`) 
   * so no controller can accidentally return another department's data.
   * Admin users bypass these filters.
   */
  req.scopedFilter = {};

  if (req.user && req.user.role !== 'admin') {
    if (req.user.departmentId) {
      req.scopedFilter.departmentId = req.user.departmentId;
    }
    if (req.user.classId && ['teacher', 'student'].includes(req.user.role)) {
      req.scopedFilter.classId = req.user.classId;
    }
  }

  next();
};
