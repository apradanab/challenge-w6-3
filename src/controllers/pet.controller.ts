import { type Request, type Response } from 'express';
import { type Pet } from '../entities/pet';
import { type PetRepository } from '../repositories/pet.repo';

export class PetController {
  constructor(private readonly repo: PetRepository) {}

  getAll(req: Request, res: Response) {
    const result = this.repo.readAll();
    res.json(result);
  }

  getById(req: Request, res: Response) {
    const id = req.params.id;
    const result = this.repo.readById(id);
    res.json(result);
  }

  create(req: Request, res: Response) {
    const data = req.body as Pet;
    const result = this.repo.create(data);
    res.status(201);
    res.json(result);
  }

  update(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body as Pet;
    const result = this.repo.update(id, data);
    res.status(202);
    res.json(result);
  }

  delete(req: Request, res: Response) {
    const id = req.params.id;
    const result = this.repo.delete(id);
    res.json(result);
  }
}
