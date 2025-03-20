import createHttpError from 'http-errors';
import { usersDataCollection } from '../db/models/usersData.js';
import { saveFile } from '../utils/saveFileStrategy.js';
import { userCollection } from '../db/models/users.js';

export const getClientById = async (clientId, userId) => {
  const client = await usersDataCollection.findOne({
    _id: clientId,
    userId,
  });

  if (!client) {
    throw createHttpError(404, 'Client not found');
  }

  return client;
};

export const upsertClient = async (
  clientId,
  photo,
  payload,
  userId,
  options = {},
) => {
  const user = await userCollection.findOne({
    _id: userId,
  });

  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  let photoUrl;

  if (photo) {
    photoUrl = await saveFile(photo);
  }

  const filterId = { _id: clientId, userId };

  const upsertOptions = { ...options, new: true, includeResultMetadata: true };

  const response = await usersDataCollection.findOneAndUpdate(
    filterId,
    { ...payload, ...(photoUrl ? { photoUrl } : {}) },
    upsertOptions,
  );

  const client = response.value;
  const isNew = !response.lastErrorObject.updatedExisting;

  return {
    client,
    isNew,
    userId: user._id,
  };
};
