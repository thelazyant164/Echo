const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const client = new OAuth2Client(process.env.CLIENT_ID);
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60 * 60 }, // 1hr expiry
  );

  response
    .status(200)
    .send({ token });
});

loginRouter.post('/google', async (request, response, next) => {
  const { token } = request.body;
  client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  }, err => {
    response.status(403).send({ error: 'Google authentication failed - invalid ID token' });
  }, ticket => {
    const { name, email, picture } = ticket.getPayload();
    const userForToken = {
      name,
      email,
    };
    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      { expiresIn: 60 * 60 }, // 1hr expiry
    );
    response
      .status(200)
      .send({ name, email, picture, token });
  });
});

module.exports = loginRouter;
