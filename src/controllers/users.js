import { getClientById, upsertClient } from '../services/users.js';

export const getClientByIdController = async (req, res) => {
  const { clientId } = req.params;
  const userId = req.user._id;

  const getClient = await getClientById(clientId, userId);

  res.json({
    status: 200,
    message: `Client with id ${clientId} succesfully found`,
    data: getClient,
  });
};

export const upsertClientController = async (req, res) => {
  const { clientId } = req.params;
  const { body } = req;
  const userId = req.user._id;

  const photo = req.file;

  const { client } = await upsertClient(clientId, photo, body, userId, {
    upsert: true,
  });

  res.json({
    status: 200,
    message: 'Sucesfully patched a contact',
    data: client,
  });
};
