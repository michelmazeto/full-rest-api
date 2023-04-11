import { Response, Request } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function generateToken(params = {}) {
  const jwtSecret = process.env.JWT_SECRET ?? 'default_secret';
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN ?? '12h';
  return jwt.sign(params, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });
}

const authController = {
  authenticate: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
      return res.status(400).send({ error: 'Incorrect user or password.' });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).send({ error: 'Incorrect user or password.' });

    const token = generateToken({ id: user._id });

    res.send({ user, token });
  }
};

export default authController;