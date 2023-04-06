import express from 'express';
import { createCar, listAllCars } from '../controllers/carController';


const carRouter = express.Router();

carRouter.post('/', createCar);
carRouter.get('/', listAllCars);

export default carRouter;
