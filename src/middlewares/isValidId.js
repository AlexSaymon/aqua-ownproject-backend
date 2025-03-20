import { isValidObjectId } from 'mongoose';
import createError from 'http-errors';

export const validateId = (req, res, next) => {
  const { clientId } = req.params;

  if (!isValidObjectId(clientId)) {
    return next(createError(404, `${clientId} is not valid id`));
  }
  next();
};
