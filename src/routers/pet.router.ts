/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router as router } from 'express';
import { PetController } from '../controllers/pet.controller.js';
import { PetRepository } from '../repositories/pet.repo.js';

export const petRouter = router();
const petRepo = new PetRepository();
const petController = new PetController(petRepo);

petRouter.get('/', petController.getAll.bind(petController));
petRouter.get('/:id', petController.getById.bind(petController));
petRouter.post('/', petController.create.bind(petController));
petRouter.patch('/:id', petController.update.bind(petController));
petRouter.delete('/:id', petController.delete.bind(petController));
