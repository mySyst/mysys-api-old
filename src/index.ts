import * as dotenv from 'dotenv';

import { SetupServer } from './server';
// import config from 'config';

(async (): Promise<void> => {
  dotenv.config();
  const server = new SetupServer(process.env.APP_PORT);
  await server.init();
  server.start();
})();
