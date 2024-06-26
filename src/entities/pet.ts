export type Pet = {
  id: string;
  name: string;
  species: string;
  owner: string;
  isAdopted: boolean;
};

export type PetCreateDto = { // Data transfer
  name: string;
  species: string;
  owner: string;
  isAdopted: boolean;
}
