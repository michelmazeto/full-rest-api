import { Request, Response } from 'express';
import Car, { ICar } from '../models/Car';

export async function createCar(req: Request, res: Response) {
  try {
    const carData = req.body;
    const car = new Car(carData);
    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar o carro.");
  }
}
