import express from 'express';
import { createCar, listAllCars, deleteCar, updateCar, getCarById } from '../controllers/carController';

const carRouter = express.Router();

carRouter.route('/')
  .post(createCar)
  .get(listAllCars);

carRouter.route('/:id')
  .delete(deleteCar)
  .patch(updateCar)
  .get(getCarById);

export default carRouter;
