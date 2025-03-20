import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getClientByIdController,
  upsertClientController,
} from '../controllers/users.js';
import { validateId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserValidationSchema } from '../validation/updateUserValidationSchema.js';

export const usersRouter = Router();

usersRouter.use(authenticate);

usersRouter.get('/:clientId', validateId, ctrlWrapper(getClientByIdController));

usersRouter.patch(
  '/:clientId',
  validateId,
  upload.single('photo'),
  validateBody(updateUserValidationSchema),
  ctrlWrapper(upsertClientController),
);
