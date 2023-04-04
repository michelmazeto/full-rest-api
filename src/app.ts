import express, { Router, Request, Response } from 'express';
import cors from 'cors';
import connect from './database/connect'

const app = express();

app.use(cors());
app.use(express.json());

connect();

const route = Router();

route.get('/api/v1/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'API is working!'
  });
});

app.use(route);

export default app;