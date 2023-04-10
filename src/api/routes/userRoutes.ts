import express from 'express';
import { createUser, updateUser, deleteUser, getUserById, listAllUsers } from '../controllers/userController';
import authController from '../controllers/authController';

const userRouter = express.Router();

userRouter.route('/')
  .get(listAllUsers)
  .post(createUser);

userRouter.route('/:id')
  .patch(updateUser)
  .delete(deleteUser)
  .get(getUserById);

userRouter.route('/authenticate')
  .post(authController.authenticate);

export default userRouter;
