import { Router } from 'express';
import {
	GetProfileHandler,
	RefreshTokenHandler,
	SigninHandler,
	SignoutHandler,
	SignupHandler,
	UpdateProfileHandler,
} from '../controllers/identity.controller';
import { authTokenMiddleware } from '../tools/middlewares/authToken.middleware';
import { validateBody } from '../tools/middlewares/validateBody.middleware';
import { userWithSettingsSchema } from '../validators/profile.validator';
import { SigninSchema } from '../validators/signin.validator';
import { SignupSchema } from '../validators/signup.validator';

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
