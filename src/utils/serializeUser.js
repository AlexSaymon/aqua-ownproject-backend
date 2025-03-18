export const serializateUser = (user) => ({
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  _id: user._id,
});
