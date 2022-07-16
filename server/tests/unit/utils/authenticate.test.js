import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import mockDatabase from '../../test_helper';

const User = require('../../../models/user');
const Audio = require('../../../models/audio');
const authenticate = require('../../../utils/authenticate');
const { authorizeRequest } = require('../../../utils/authHelper');
const app = require('../../../app');

describe('authenticate middleware', async () => {
  const api = supertest(app);
  let userId;
  beforeEach(async () => {
    await User.deleteMany({});
    await Audio.deleteMany({});
    for (const user of mockDatabase) {
      const userEntry = new User(user);
      const savedUser = await userEntry.save();
      userId = savedUser.json()._id;
    }
  });
  test('Doesn\'t respond with error code when given authentic token', async () => {
    const token = jwt.sign(
      {
        username: 'xyz@gmail.com',
        id: userId,
      },
      process.env.SECRET,
    );
    const mockRequest = { authorization: `Bearer ${token}` };
    const user = await authenticate(mockRequest);
    expect(user).toEqual(mockDatabase[1]);
  });
  test('Without correct token, responds with 401: token missing or invalid', async () => {
    const mockRequest = { authorization: 'Bearer bogusToken' };
    const user = await authenticate(mockRequest);
    expect(user).toBeNull();
  });
  test('Without matching user in database, responds with 401: invalid user', async () => {
    const mockRequest = { authorization: 'Bearer bogusToken' };
    const user = await getLoggedInUser(mockRequest);
    expect(user).toBeNull();
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
});

describe('authorizeRequest function', () => {

});
