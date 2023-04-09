import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import APIError from '../../utils/APIError';

export async function createUser(req: Request, res: Response) {
  try {
    const userData: IUser = req.body;
    const user = new User(userData);
    await user.viaCep();
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    APIError.handleErrorResponse(res, err);
  }
}
