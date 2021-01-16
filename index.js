const express = require('express');
const redis = require('./config');

const key = 'user_data'; // Redis key set

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
// const key = 'veggies';
app.get('/getdata', async (req, res, next) => {
  try {
    const veggies = await redis.lrange(key, 0, -1);
    const arr = veggies.map((x) => JSON.parse(x));
    if (arr.length > 0) {
      console.log(arr);
      res.status(200).json({
        success: true,
        data: arr,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No data inserted yet!',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: 'There is some error!',
    });
  }
  // redis.disconnect();
  next();
});

app.get('/getdata/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const veggies = await redis.lrange(key, 0, -1);
    const arr = veggies.map((x) => JSON.parse(x));
    const result = arr.filter((arr) => arr.id == id);
    if (result.length > 0) {
      console.log(result);
      res.status(200).json({
        success: true,
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Data not found!',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: 'There is some error!',
    });
  }
});

app.post('/postdata', async (req, res, next) => {
  try {
    const { id = new Date().valueOf(), name, age } = req.body;
    console.log(id);
    const data = [JSON.stringify({ id, name, age })];
    const result = await redis.lpush(key, ...data);
    console.log(result);
    if (result >= 10) {
      await redis.ltrim(key, 0, 9);
    }
    res.status(200).json({
      success: true,
      message: 'Data inserted successfully!',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: 'There is some error!',
    });
  }
  // redis.disconnect();
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
