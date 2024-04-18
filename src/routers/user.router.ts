import { Router as router } from 'express';
import createDebug from 'debug';
import { type UserController } from '../controllers/user.controller';

const debug = createDebug('W6E:users:router');

export class UsersRouter {
  router = router();
  constructor(private readonly controller: UserController) {
    debug('Instantiated users router');

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));   // .post(/:id,) --> .post(/login) --> .post(/register) :orden correcto
    // Register : 
    this.router.patch('/:id', controller.update.bind(controller));
    
    this.router.delete('/:id', controller.delete.bind(controller));
    // Eviar /delete/:id --> porque rompe el modelo de trabajo de un APIres. Sería así: .delete(/:id,) delete verbo de acción reservado
  }
}
