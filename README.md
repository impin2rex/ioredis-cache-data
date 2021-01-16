# ioredis-cache-data

This is a REST API to test Redis cache. Here you can insert data to Redis and fetch data form Redis.
Here is one route to post data to redis cache, one for get data from redis and another one for fetch data using id.

Here I use a list to insert data. First I use 'lpush' to insert data,
and when list list size is 10 then the previous data will be deleted using 'ltrim' method.
Data fetch using 'lrange' & map() on /getdata route.
Data fetch using 'lrange' & filter() on /getdata/:id route.

Below I provide a postman collection.
The postman collection link is https://www.getpostman.com/collections/cd0cf47f6ecc8cd65c9d.
