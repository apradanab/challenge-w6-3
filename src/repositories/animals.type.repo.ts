import { type AnimalCreateDto, type Animal } from '../entities/animals.js';

export type AnimalsRepo = {
  readAll(): Promise<Animal[]>;
  readById(id: string): Promise<Animal>;
  create(data: AnimalCreateDto): Promise<Animal>;
  update(id: string, data: Partial<Animal>): Promise<Animal>;
  delete(id: string): Promise<Animal>;
};
