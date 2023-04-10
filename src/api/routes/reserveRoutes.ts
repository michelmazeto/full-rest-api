import express from 'express';
import { createReserve, listAllReserves, getReserveById } from '../controllers/reserveController';

const reserveRouter = express.Router();

reserveRouter.route('/')
  .post(createReserve)
  .get(listAllReserves);

reserveRouter.route('/:id')
  .get(getReserveById);

export default reserveRouter;