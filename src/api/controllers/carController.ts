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

export const listAllCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryParams: any = req.query;
    const limit: number = parseInt(queryParams.limit) || 100;
    const offset: number = parseInt(queryParams.offset) || 1;

    const cars: ICar[] = await Car.find(queryParams)
      .skip(offset - 1)
      .limit(limit);

    const totalCars: number = await Car.countDocuments(queryParams);

    if (cars.length === 0) {
      res.status(404).json({ message: 'No cars found.' });
    } else {
      res.status(200).json({
        data: {
          total: totalCars,
          limit: limit,
          offset: offset,
          cars: cars,
        },
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error listing cars.' });
  }
};