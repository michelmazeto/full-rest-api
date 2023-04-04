import express, { Router, Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const route = Router();

route.get('/api/v1/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'API is working!'
  });
});

app.use(route);

export default app;