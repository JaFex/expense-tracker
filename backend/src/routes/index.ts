import { Router } from 'express';
import { identityRouter } from './identity.router';

export const mainRouter = Router();

mainRouter.use('/identity', identityRouter);

mainRouter.get('/', (req, res) => {
	res.send('Hello World!');
});
