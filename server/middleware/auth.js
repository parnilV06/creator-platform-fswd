import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next({
        statusCode: 401,
        message: 'Not authorized'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return next({
        statusCode: 401,
        message: 'Not authorized'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return next({
      statusCode: 401,
      message: 'Not authorized'
    });
  }
};

export default protect;