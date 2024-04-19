import { Router as router } from 'express';
import createDebug from 'debug';
import { type AnimalController } from '../controllers/animal.controller.js';
import { type Auth } from '../services/auth.services.js';


const debug = createDebug('W6E:animals:router');

export class AnimalsRouter {
  router = router();
  constructor(private readonly controller: AnimalController, readonly authInterceptor: Auth) {
    debug('Instantiated animals router');
    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
