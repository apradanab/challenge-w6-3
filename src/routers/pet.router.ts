import { Router as router } from 'express';
import createDebug from 'debug';
import { type PetController } from '../controllers/pet.controller.js';

const debug = createDebug('W6E:pets:router');

export class PetsRouter {
  router = router();
  constructor(readonly controller: PetController) {
    debug('Instantiated pets router');
    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
