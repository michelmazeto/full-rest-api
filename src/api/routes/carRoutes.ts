import express from 'express';
import { createCar } from '../controllers/carController';

const carRouter = express.Router();

carRouter.post('/', createCar);

export default carRouter;
