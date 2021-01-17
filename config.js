module.exports = {
  key: 'user_data', // Redis key
  get getRedis() {
    const redisPort = 6379; // Redis port
    const redisHost = '127.0.0.1'; // Redis host
    const redisDb = 0; // Redis DB
    // const redisPassword = 'shhhhhh'; // Redis pasword
    return { redisPort, redisHost, redisDb };
  },
};
