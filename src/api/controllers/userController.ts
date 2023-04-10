import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import APIError from '../../utils/APIError';
import { generateToken } from '../controllers/authController';
import { isValidObjectId } from 'mongoose';

export async function createUser(req: Request, res: Response) {
  try {
    const userData: IUser = req.body;
    const user = new User(userData);
    await user.viaCep();
    const savedUser = await user.save();
    const token = generateToken({ id: savedUser._id });
    res.status(201).json({ user: savedUser, token });
  } catch (err) {
    console.error(err);
    APIError.handleErrorResponse(res, err);
  }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  const userData = req.body;

  try {
    if (!isValidObjectId(userId)) {
      throw new APIError('id', 'Invalid user ID');
    }

    const updatedUser: IUser | null = await User.findByIdAndUpdate(
      userId,
      { $set: userData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({ data: updatedUser });
  } catch (err) {
    APIError.handleErrorResponse(res, err);
  }
};