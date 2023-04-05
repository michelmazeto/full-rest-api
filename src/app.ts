import express, { Router, Request, Response } from 'express';
import cors from 'cors';
import connect from './database/connect'
import carRoutes from './api/routes/carRoutes';

const app = express();

app.use(cors());
app.use(express.json());

connect();

app.use('/api/v1/car', carRoutes)

app.get('/api/v1/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'API is working!'
  });
});

export default app;