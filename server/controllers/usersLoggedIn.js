const userLoggedInRouter = require('express').Router();
const User = require('../models/user');
const { getLoggedInUser } = require('../utils/authHelper');

userLoggedInRouter.get('/', async (request, response) => {
  const { name, id, premium } = await getLoggedInUser(request, response);

  const user = {
    name,
    id,
    premium,
  };

  response.json(user);
});

userLoggedInRouter.put('/:id', async (request, response) => {
  const { name } = request.body;

  const user = {
    name,
  };

  const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true });
  response.json(updatedUser);
});

module.exports = userLoggedInRouter;
