import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { mainRouter } from './routes';
import { errorHandlerMiddleware } from './tools/middlewares/errorHandler.middleware';

export const app = express();

app.use(express.json());

app.use(helmet());
app.use(cors());

app.use('/', mainRouter);

app.use(errorHandlerMiddleware);
