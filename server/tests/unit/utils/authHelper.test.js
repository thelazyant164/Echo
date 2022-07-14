import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';

const { getTokenFrom, getLoggedInUser } = require('../../../utils/authHelper');
const User = require('../../../models/user');
const { mockUserDatabase } = require('../../test_helper');

describe('getTokenFrom function', () => {
  test('Returns null if no token found', () => {
    const mockRequest = { authorization: '' };
    expect(getTokenFrom(mockRequest)).toBeNull();
  });
  test('Returns correct token', () => {
    const mockRequest = { authorization: 'Bearer abcdxyz' };
    expect(getTokenFrom(mockRequest)).toBe('abcdxyz');
  });
});

describe('getLoggedInUser function', async () => {
  const mongod = await MongoMemoryServer.create();
  let userId;
  beforeAll(async () => {
    const uri = mongod.getUri();
    await mongoose.connect(uri);
  });
  beforeEach(async () => {
    await User.deleteMany({});
    for (const user of mockUserDatabase) {
      const userEntry = new User(user);
      const savedUser = await userEntry.save();
      userId = savedUser.json()._id;
    }
  });
  test('Returns correct logged-in user', async () => {
    const token = jwt.sign(
      {
        username: 'xyz@gmail.com',
        id: userId,
      },
      process.env.SECRET,
    );
    const mockRequest = { authorization: `Bearer ${token}` };
    const user = await getLoggedInUser(mockRequest);
    expect(user).toEqual(mockUserDatabase[1]);
  });
  test('Returns null if not found', async () => {
    const mockRequest = { authorization: 'Bearer bogusToken' };
    const user = await getLoggedInUser(mockRequest);
    expect(user).toBeNull();
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });
});
