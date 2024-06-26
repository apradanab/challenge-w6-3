import { type NextFunction, type Request, type Response } from 'express';
import createDebug from 'debug';
import { HttpError } from './errors.middleware.js';
import { Auth } from '../services/auth.services.js';
const debug = createDebug('W6E:auth:interceptor');

class AuthInterceptor {
  constructor() {
  debug('Instantiated auth interceptor');
  }

 authentication(req: Request, res: Response, next: NextFunction) {

    const error = new HttpError(498, 'Token expired/invalid', 'Token invalid')

    const data = req.get('Authorization');

    if(!data?.startsWith('Bearer')) {
      next(error);
      return
    }

    const token = data.slice(7);

    try {
      const payload = Auth.verifyJwt(token)
      req.body.payload = payload;
      next();
    } catch (err) {
      error.message = (err as Error).message;
      next(error);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    req.get('Authorization') ? res.json({message:'You are logged'}) : res.json({message:'You are not logged'})
  }



}
