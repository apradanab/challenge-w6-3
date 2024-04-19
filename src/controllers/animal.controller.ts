import { type NextFunction, type Request, type Response } from 'express';
import createDebug from 'debug';
import { type AnimalCreateDto, type Animal } from '../entities/animals.js';
import {
 animalCreateDtoSchema,
 animalUpdateDtoSchema,
} from '../entities/animal.schema.js';
import { HttpError } from '../middleware/errors.middleware.js';
import { type AnimalsRepo } from '../repositories/type.repo.js';

const debug = createDebug('W6E:animals:controller');

export class AnimalController {
  constructor(private readonly repo: AnimalsRepo) {
    debug('Instantiated animals controller');
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
    const { id } = req.params;
    try {
      const result = await this.repo.readById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const data = req.body as Animal;

    const {
      error,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value,
    }: { error: Error | undefined; value: AnimalCreateDto } =
      animalCreateDtoSchema.validate(data, {
        abortEarly: false,
      });

    if (error) {
      next(new HttpError(406, 'Not Acceptable', error.message));
      return;
    }

    try {
      const result = await this.repo.create(value);
      res.status(201);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = req.body as Animal;

    const { error } = animalUpdateDtoSchema.validate(data, {
      abortEarly: false,
    });

    if (error) {
      next(new HttpError(406, 'Not Acceptable', error.message));
      return;
    }

    try {
      const result = await this.repo.update(id, data);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const result = await this.repo.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
