import express from 'express';
import authMiddleware from '../services/authMiddleware';
import { 
  createCar,
  listAllCars,
  deleteCar,
  updateCar,
  getCarById
} from '../controllers/carController';


const carRouter = express.Router();

carRouter.route('/')
  .post(authMiddleware, createCar)
  .get(listAllCars);

carRouter.route('/:id')
  .delete(authMiddleware, deleteCar)
  .patch(authMiddleware, updateCar)
  .get(authMiddleware, getCarById);

export default carRouter;
