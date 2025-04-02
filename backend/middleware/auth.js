const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).send('Token is required');

  // Extract the token from the "Bearer <token>" format
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

  console.log('Token:', token);

  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).send('Invalid token');
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Access denied. Admins only.');
  }
  next();
};

module.exports = { verifyToken, isAdmin };
