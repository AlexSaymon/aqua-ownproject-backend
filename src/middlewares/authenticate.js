import createHttpError from 'http-errors';
import { sessionCollection } from '../db/models/sessions.js';
import { userCollection } from '../db/models/users.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  try {
    if (!authHeader) {
      throw createHttpError(401, 'No authorization header provided');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer') {
      throw createHttpError(401, 'Authorization header must be Bearer type');
    }

    if (!token) {
      throw createHttpError(401, 'No access token provided');
    }

    const session = await sessionCollection.findOne({ accessToken: token });

    if (!session) {
      throw createHttpError(401, 'No authorized session found');
    }

    if (session.accessTokenValidUntil < new Date()) {
      throw createHttpError(401, 'Access token expired');
    }

    const user = await userCollection.findById(session.userId);

    if (!user) {
      await sessionCollection.findByIdAndDelete(session._id);
      throw createHttpError(401, 'No user found for that session');
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
