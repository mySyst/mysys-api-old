require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

import { SetupServer } from './server';
// import config from 'config';

(async (): Promise<void> => {
  const server = new SetupServer(process.env.APP_PORT);
  await server.init();
  server.start();
})();
