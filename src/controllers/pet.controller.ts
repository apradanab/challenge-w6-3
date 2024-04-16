import { type NextFunction, type Request, type Response } from 'express';
import { type Pet, type PetCreateDto } from '../entities/pet';
import { type PetRepository } from '../repositories/pet.repo';
import createDebug from 'debug';
import { petUpdateDtoSchema, petCreateDtoSchema } from "../entities/pet.schema";
import { HttpError } from '../middleware/errors.middleware';

const debug = createDebug('W6E:pets:controller');

export class PetController {
  constructor(private readonly repo: PetRepository) {
    debug('Instantiated pet controller');
  }

   async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.readAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    try {
      const result = this.repo.readById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const data = req.body as Pet;
    const { error, value }: { error: Error | undefined; value: PetCreateDto } =
    petCreateDtoSchema.validate(data, {abortEarly: false,});

    if(error) {
      next(new HttpError(406, 'Not Acceptable', error.message));
      return;
    }

    try{
      const result = await this.repo.create(value);
      res.status(201);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    const data = req.body as Pet;
     const { error } = petUpdateDtoSchema.validate(data, {
      abortEarly: false,
    });

    if (error) {
      next(new HttpError(406, 'Not Acceptable', error.message));
      return;
    }

    try {
      const result = await this.repo.update(id, data);
      res.status(202);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    try {
      const result = await this.repo.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
