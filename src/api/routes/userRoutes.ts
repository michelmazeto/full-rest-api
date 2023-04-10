import express from 'express';
import authController from '../controllers/authController';
import authMiddleware from '../services/authMiddleware';
import { createUser,
  updateUser,
  deleteUser,
  getUserById,
  listAllUsers
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.route('/')
  .get(authMiddleware, listAllUsers)
  .post(createUser);

userRouter.route('/:id')
  .patch(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser)
  .get(authMiddleware, getUserById);

userRouter.route('/authenticate')
  .post(authController.authenticate);

export default userRouter;
