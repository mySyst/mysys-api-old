import * as http from 'http';
// LGPD e JSON Web Token
// import { DecodedUser } from './services/auth';

// module augmentation
declare module 'express-serve-static-core' {
  export interface Request extends http.IncomingMessage, Express.Request {
    // decoded?: DecodedUser;
    context?: {
      userId?: string;
    }
  }
}