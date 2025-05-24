import { Router } from 'express';
import {
	GetProfileHandler,
	RefreshTokenHandler,
	SigninHandler,
	SignoutHandler,
	SignupHandler,
	UpdateProfileHandler,
} from '../controllers/identity.controller';
import { userWithSettingsSchema } from '../schemas/profile.schema';
import { SigninSchema } from '../schemas/signin.schema';
import { SignupSchema } from '../schemas/signup.schemas';
import { authTokenMiddleware } from '../tools/middlewares/authToken.middleware';
import { validateBody } from '../tools/validators';

export const identityRouter = Router();

identityRouter.post('/signup', validateBody(SignupSchema), SignupHandler);

identityRouter.post('/signin', validateBody(SigninSchema), SigninHandler);

identityRouter.post('/refresh-token', RefreshTokenHandler);

identityRouter.post('/signout', SignoutHandler);

identityRouter.get('/profile', authTokenMiddleware, GetProfileHandler);

identityRouter.patch(
	'/profile',
	[validateBody(userWithSettingsSchema), authTokenMiddleware],
	UpdateProfileHandler,
);
