import express from 'express';
import authMiddleware from '../services/authMiddleware';
import {
  createReserve,
  listAllReserves,
  getReserveById,
  updateReserve,
  deleteReserve
} from '../controllers/reserveController';

const reserveRouter = express.Router(); 

reserveRouter.route('/')
  .post(authMiddleware, createReserve)
  .get(authMiddleware, listAllReserves);

reserveRouter.route('/:id')
  .get(authMiddleware, getReserveById)
  .patch(authMiddleware, updateReserve)
  .delete(authMiddleware, deleteReserve);

export default reserveRouter;