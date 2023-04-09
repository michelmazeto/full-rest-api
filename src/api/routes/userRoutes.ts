import express from 'express';
import { createUser } from '../controllers/userController';

const userRouter = express.Router();

userRouter.route('/')
  .post(createUser)


export default userRouter;
