import express from 'express';
import { createCar, listAllCars, deleteCar, updateCar } from '../controllers/carController';


const carRouter = express.Router();

carRouter.post('/', createCar);
carRouter.get('/', listAllCars);
carRouter.delete('/:id', deleteCar);
carRouter.patch('/:id', updateCar);

export default carRouter;
