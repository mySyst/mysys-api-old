require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

console.log('meu env', process.env.NODE_ENV);
console.log('meu env', process.env.PORT);
console.log('meu env', process.env.MONGO_URL);
