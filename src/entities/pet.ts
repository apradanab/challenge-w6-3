export type Pet = {
  id: string;
  name: string;
  species: string;
  owner: string;
  isAdopted: boolean;
};

export type PetCreateDto = {
  id: string;
  name: string;
  species: string;
  owner: string;
  isAdopted: boolean;
}
