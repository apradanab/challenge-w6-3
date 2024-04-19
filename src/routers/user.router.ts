/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type NextFunction, type Request, type Response, Router as router } from 'express';
import createDebug from 'debug';
import { type UserController } from '../controllers/user.controller';
import { HttpError } from '../middleware/errors.middleware.js';
import { type Auth } from '../services/auth.services.js';

const debug = createDebug('W6E:users:router');

export class UsersRouter {
  router = router();
  constructor(private readonly controller: UserController, readonly authInterceptor: Auth) {
    debug('Instantiated users router');

    this.router.post('/login', controller.login.bind(controller));   // .post(/:id,) --> .post(/login) --> .post(/register) :orden correcto
    this.router.post('/register', controller.create.bind(controller))

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post(
      '/',
      authInterceptor.authentication.bind(authInterceptor),
      controller.create.bind(controller)
    );
    this.router.patch(
      '/:id', authInterceptor.authentication.bind(authInterceptor), controller.update.bind(controller)

     
    );
    
    this.router.delete('/:id', controller.delete.bind(controller));
    // Evitar /delete/:id --> porque rompe el modelo de trabajo de un APIres. Sería así: .delete(/:id,) delete verbo de acción reservado
  }


}
