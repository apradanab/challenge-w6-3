import createDebug from 'debug';
import { type Pet } from '../entities/pet';
const debug = createDebug('W6E:repository:user');
import fs from 'fs';

export class PetRepository {
  pets: Pet[] = [];
  constructor() {
    this.loadFromFile();
  }

  private loadFromFile() {
    try {
      const data = fs.readFileSync('db.json', { encoding: 'utf-8' });

      const jsonData = JSON.parse(data) as Pet[];
      this.pets = jsonData;
    } catch (error) {
      debug('Error reading data from file:', error);
      this.pets = [];
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  saveToFile() {
    try {
      fs.writeFileSync('db.json', JSON.stringify(this.pets, null, 2), {
        encoding: 'utf-8',
      });
    } catch (error) {
      debug('Error saving data to file:', error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  readAll() {
    return this.pets;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  readById(id: string) {
    return this.pets.find((item) => item.id === id);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  create(data: Pet) {
    const newUser: Pet = {
      id: (this.pets.length + 1).toString(),
      name: data.name,
      owner: data.owner,
      species: data.species,
      isAdopted: data.isAdopted,
    };
    this.pets = [...this.pets, newUser];
    this.saveToFile();
    return newUser;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  update(inputId: string, data: Pet) {
    const currentPet = this.pets.find((item) => item.id === inputId);
    if (!currentPet) {
      throw new Error(`User ${inputId} not found`);
    }

    const newPet = { ...currentPet, ...data };
    this.pets = this.pets.map((item) => (item.id === inputId ? newPet : item));
    this.saveToFile();
    return newPet;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  delete(inputId: string) {
    const gonerPet = this.pets.find((item) => item.id === inputId);
    if (!gonerPet) {
      throw new Error(`User ${inputId} not found`);
    }

    this.pets = this.pets.filter((user) => user.id !== inputId);
    this.saveToFile();
    return gonerPet;
  }
}
