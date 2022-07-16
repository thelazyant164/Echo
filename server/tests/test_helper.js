const mockUserDatabase = [
  {
    name: 'User 1',
    username: 'abc@gmail.com',
    passwordHash: 'abcdefghij',
    premium: false,
  },
  {
    name: 'User 2',
    username: 'xyz@gmail.com',
    passwordHash: '0123456789',
    premium: true,
  },
];

const mockWholeDatabase = {
  mockUserDatabase: [
    {
      name: 'User 1',
      username: 'abc@gmail.com',
      passwordHash: 'abcdefghij',
      premium: false,
    },
    {
      name: 'User 2',
      username: 'xyz@gmail.com',
      passwordHash: '0123456789',
      premium: true,
    },
  ],
  mockAudioDatabase: [
    {
      name: 'Audio 1',
      content: 'alohaha',
      date: new Date(),
    },
  ],
};

module.exports = {
  mockUserDatabase,
};
