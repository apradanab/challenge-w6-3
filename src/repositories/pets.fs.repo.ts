/* eslint-disable @typescript-eslint/padding-line-between-statements */
/* eslint-disable @typescript-eslint/member-ordering */
import createDebug from 'debug';
import { readFile, writeFile } from 'fs/promises';
import { HttpError } from '../middleware/errors.middleware.js';
import { type Pet, type PetCreateDto } from '../entities/pet.js';

const debug = createDebug('W6E:pets:repository');

export class PetRepository {
  constructor() {
    debug('Instantiated pet repo');
  }

  private async load(): Promise<Pet[]> {
    const data = await readFile('db.json', 'utf-8');
    return JSON.parse(data) as Pet[];
  }

  private async save(articles: Pet[]) {
    await writeFile('db.json', JSON.stringify(articles, null, 2));
  }

  async readAll() {
    const pets = await this.load();
    return pets;
  }

  async readById(id: string) {
    const pets = await this.load();
    const pet = pets.find((item) => item.id === id);
    if (!pet) {
      throw new HttpError(404, 'Not Found', `Pet ${id} not found`);
    }
    return pet;
  }

  async create(data: PetCreateDto) {
    const newPet: Pet = {
      id: crypto.randomUUID(),
      ...data,
    };
    let pets = await this.load();
    pets = [...pets, newPet];

    return newPet;
  }

  async update(inputId: string, data: Partial<PetCreateDto>) {
    let pets = await this.load();
    const currentPet = pets.find((item) => item.id === inputId);
    if (!currentPet) {
      throw new HttpError(404, 'Not Found', `Pet ${inputId} not found`);
    }

    const newPet: Pet = { ...currentPet, ...data };
    pets = pets.map((item) => (item.id === inputId ? newPet : item));
    await this.save(pets);
    return newPet;
  }

  async delete(inputId: string) {
    let pets = await this.load();
    const erasedPet = pets.find((item) => item.id === inputId);
    if (!erasedPet) {
      throw new HttpError(404, 'Not Found', `Pet ${inputId} not found`);
    }
    pets = pets.filter((item) => item.id !== inputId);
    await this.save(pets);
    return erasedPet;
  }
}
