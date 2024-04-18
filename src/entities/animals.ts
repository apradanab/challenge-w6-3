export type Animal = {
  id: string;
  name: string;
  species: string;
  habitat: string;
  isWild: boolean;
};

export type AnimalCreateDto = {  // Data transfer
  name: string;
  species: string;
  habitat: string;
  isWild: boolean;
  sponsorId: string;
}
export type AnimalUpdateDto = Partial<AnimalCreateDto>
