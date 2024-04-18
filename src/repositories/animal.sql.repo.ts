
import { HttpError } from '../middleware/errors.middleware.js';
import { type AnimalsRepo } from './animals.type.repo.js';
import { type PrismaClient } from "@prisma/client";
import createDebug from 'debug';
import { type AnimalCreateDto } from "../entities/animals.js";

const debug = createDebug('W6E:animals:repository:sql');

const select = {
  id: true,
  name: true,
  species: true,
  habitat: true,
  isWild: true,
};
export class AnimalsSqlRepo implements AnimalsRepo  {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated articles sql repository');
  }

  async readAll() {  
    return this.prisma.animal.findMany({  // Include :{ author: true(incluye todos los campos, sino ir 1x1) }, dis...
       distinct: ['createdAt', 'updatedAt'],
     });
  }

 async readById(id: string) {  
    const animal = await this.prisma.animal.findUnique({   // Solo include
      where: { id },
      select, 
    });

    if (!animal) {
      throw new HttpError(404, 'Not Found', `Animal ${id} not found`);
    }

    return animal;
  }

  async create(data: AnimalCreateDto) {
    return this.prisma.animal.create({
      data: {
        ...data,
      },
      select,
    });
  }

  async update(id: string, data: Partial<AnimalCreateDto>) {
    const animal = await this.prisma.animal.findUnique({
      where: { id },
      select,
    });
    if (!animal) {
      throw new HttpError(404, 'Not Found', `Animal ${id} not found`);
    }

    return this.prisma.animal.update({
      where: { id },
      data,
      select,
    });
  }

  async delete(id: string) {
    const animal = await this.prisma.animal.findUnique({
      where: { id },
      select,
    });
    if (!animal) {
      throw new HttpError(404, 'Not Found', `Animal ${id} not found`);
    }

    return this.prisma.animal.delete({
      where: { id },
      select,
    });
  }

}


