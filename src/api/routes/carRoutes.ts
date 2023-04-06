import express from 'express';
import { createCar, listAllCars, deleteCar } from '../controllers/carController';


const carRouter = express.Router();

carRouter.post('/', createCar);
carRouter.get('/', listAllCars);
carRouter.delete('/:id', deleteCar);

export default carRouter;
