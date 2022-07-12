const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('audios', { name: 1, date: 1 });
  response.json(users);
});

usersRouter.get('/:id', async (request, response, next) => {
  const user = await User.findById(request.params.id);
  if (user) {
    response.json(user);
  } else {
    response.status(404).end();
  }
});

usersRouter.post('/', async (request, response, next) => {
  const {
    name, username, password, premium,
  } = request.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    username,
    passwordHash,
    premium: premium || false,
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

usersRouter.delete('/:id', async (request, response, next) => {
  await User.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

usersRouter.put('/:id', async (request, response, next) => {
  const { name, premium } = request.body;

  const user = {
    name,
    premium: premium || false,
  };

  const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new: true });
  response.json(updatedUser);
});

module.exports = usersRouter;
