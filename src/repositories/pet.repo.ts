/* eslint-disable @typescript-eslint/member-ordering */
import createDebug from 'debug';
import { type Pet } from '../entities/pet';
const debug = createDebug('W6E:repository:user');
import fs from 'fs';
import { readFile, writeFile} from "fs/promises";

export class PetRepository {
  pets: Pet[] = [];
  constructor() {
    debug('');
  }

  private async load(): Promise<Pet[]> {
      const data = await readFile('db.json', 'utf-8');
      return JSON.parse(data) as Pet[];
  }

  
  private async save() {
    await writeFile('db.json', JSON.stringify(this.pets, null, 2));
  }

  async readAll() {
    const pets = await this.load();
    return pets;
  }
 
  async readById(id: string) {
    const pets = await this.load();
    const pet = pets.find((item) => item.id === id);
  }
 
   async create(data: Pet) {
    const newUser: Pet = {
      id: crypto.randomUUID(),
      name: data.name,
      owner: data.owner,
      species: data.species,
      isAdopted: data.isAdopted,
    };
    let pets = await this.load();
    pets = [...pets, newUser];
    await this.save();
    return newUser;
  }

  async update(id: string, data: Pet) {
    let pets = await this.load()
    const currentPet = pets.find((item) => item.id === id);
    if (!currentPet) {
      throw new Error(`User ${id} not found`);
    }

    const newPet: Pet= { ...currentPet, ...data };
    pets = pets.map((item) => item.id === id ? newPet : item);
    await this.save();
    return newPet;
  }

  async delete(id: string) {
    let pets = await this.load();
    const erasedPet = pets.find((item) => item.id === id);
    if (!erasedPet) {
      throw new Error(`User ${id} not found`);
    }

    pets = pets.filter((item) => item.id !== id);
    await this.save();
    return erasedPet;
  }
}
