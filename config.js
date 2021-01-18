const Redis = require('ioredis');

module.exports = {
  key: 'user_data', // Redis key
  get getRedis() {
    const redis = new Redis({
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      db: 0, // Redis DB
      // password: 'sshhhhh', // Redis Password
    });
    return { redis };
  },
};
