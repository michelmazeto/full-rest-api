import express from 'express';
import { createReserve } from '../controllers/reserveController';

const reserveRouter = express.Router();

reserveRouter.route('/')
  .post(createReserve)

export default reserveRouter;
