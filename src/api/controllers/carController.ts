import { Request, Response } from 'express';
import Car, { ICar } from '../models/Car';
import APIError from '../../utils/APIError';

export async function createCar(req: Request, res: Response) {
  try {
    const carData = req.body;
    const car = new Car(carData);
    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch (err) {
    console.error(err);
    APIError.handleErrorResponse(res, err);
  }
}
