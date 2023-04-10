import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface MyRequest extends Request {
  user?: any;
}

const authMiddleware = (req: MyRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authorization token not found' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid authorization token' });
      }

      req.user = decoded;
      next();
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to verify authorization token' });
  }
};

export default authMiddleware;