import db from '../models/index.js'
// const { RolePermission } = db;

export const checkPermission = (feature, operation) => {
  return async (req, res, next) => {
    const permissions = req.user.permissions;

    if (!permissions) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (req.user.level === 1) return next(); //Allow everything

    if (!permissions[feature]?.includes(operation)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};
