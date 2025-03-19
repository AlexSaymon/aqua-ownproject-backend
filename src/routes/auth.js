import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserValidationSchema } from '../validation/userRegistrationValidationSchema.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  requestResetPasswordController,
  resetPasswordController,
} from '../controllers/auth.js';
import { loginUserValidationSchema } from '../validation/userLoginValidationSchema.js';
import { authenticate } from '../middlewares/authenticate.js';
import { requestResetPasswordValidationSchema } from '../validation/requestResetPasswordValidationSchema.js';
import { resetPasswordValidationSchema } from '../validation/resetPasswordValidationSchema.js';

export const authRouter = Router();

authRouter.post(
  '/reset-link-password',
  validateBody(requestResetPasswordValidationSchema),
  ctrlWrapper(requestResetPasswordController),
);
authRouter.post(
  '/reset-password',
  validateBody(resetPasswordValidationSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.post(
  '/register',
  validateBody(registerUserValidationSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserValidationSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post(
  '/refresh',
  authenticate,
  ctrlWrapper(refreshUserSessionController),
);

authRouter.post('/logout', authenticate, ctrlWrapper(logoutUserController));
