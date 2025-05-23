import { Router } from 'express';
import {
	ProfileHandler,
	SigninHandler,
	SignupHandler,
} from '../controllers/identity.controller';
import { SigninSchema } from '../schemas/signin.schema';
import { SignupSchema } from '../schemas/signup.schemas';
import { authTokenMiddleware } from '../tools/middlewares/authToken.middleware';
import { validateBody } from '../tools/validators';

export const identityRouter = Router();

identityRouter.post('/signup', validateBody(SignupSchema), SignupHandler);

identityRouter.post('/signin', validateBody(SigninSchema), SigninHandler);

identityRouter.get('/profile', authTokenMiddleware, ProfileHandler);
