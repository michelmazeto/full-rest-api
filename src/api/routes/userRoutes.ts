import express from 'express';
import { createUser, updateUser, deleteUser } from '../controllers/userController';
import authController from '../controllers/authController';

const userRouter = express.Router();

userRouter.route('/')
  .post(createUser);

userRouter.route('/:id')
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route('/authenticate')
  .post(authController.authenticate);

export default userRouter;
