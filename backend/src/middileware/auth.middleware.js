import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: 'unauthorizied token does not provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: 'unauthorized invalid token' });
    }
    const user = await userModel.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log('the protectRoute error', err.message);
    res.status(401).json({ message: 'internal server error' });
  }
};

