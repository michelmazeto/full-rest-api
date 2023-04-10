import express from 'express';
import { createReserve, listAllReserves } from '../controllers/reserveController';

const reserveRouter = express.Router();

reserveRouter.route('/')
  .post(createReserve)
  .get(listAllReserves);

export default reserveRouter;
