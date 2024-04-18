// import { type PetRepository } from './pets.fs.repo.js';
// import { readFile } from 'fs/promises';
// import { HttpError } from '../middleware/errors.middleware';
// import { type PetCreateDto } from '../entities/pets.js';

// jest.mock('fs/promises');

// describe('Given a instance of the class PetRepository', () => {
//   const repo = new PetRepository();

//   test('Then it should be instance of the class', () => {
//     expect(repo).toBeInstanceOf(PetRepository);
//   });
//   describe('When we use the method readAll', () => {
//     test('Then it should call readFile', async () => {
//       (readFile as jest.Mock).mockResolvedValue('[]');
//       const result = await repo.readAll();
//       expect(readFile).toHaveBeenCalled();
//       expect(result).toEqual([]);
//     });
//   });

//   describe('When we use the method readById with a valid ID', () => {
//     test('Then it should call readFile', async () => {
//       (readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
//       const result = await repo.readById('1');
//       expect(readFile).toHaveBeenCalled();
//       expect(result).toEqual({ id: '1' });
//     });
//   });

//   describe('When we use the method readById with an invalid ID', () => {
//     test('Then it should throw an error', async () => {
//       (readFile as jest.Mock).mockResolvedValue('[{"id": "1"}]');
//       await expect(repo.readById('2')).rejects.toThrow(
//         new HttpError(404, 'Not Found', 'Pet 2 not found')
//       );
//     });
//   });

//   describe('When we use the method create', () => {
//     test('Then it should call readFile', async () => {
//       (readFile as jest.Mock).mockResolvedValue('[]');
//       const data = {} as unknown as PetCreateDto;
//       const result = await repo.create(data);
//       expect(result).toEqual({ id: expect.any(String) });
//       expect(readFile).toHaveBeenCalled();
//     });
//   });

//   describe('When we use the method update with a valid id', () => {
//     test('Then it should call readFile and writeFile', async () => {
//       (readFile as jest.Mock).mockResolvedValue(
//         JSON.stringify([
//           {
//             id: '1',
//             name: 'Buddy',
//             owner: 'Bob',
//             species: 'Dog',
//             isAdopted: false,
//           },
//         ])
//       );
//       const data = { isAdopted: true } as unknown as PetCreateDto;
//       const id = '1';
//       const result = await repo.update(id, data);
//       expect(result).toEqual({
//         id: '1',
//         name: 'Buddy',
//         owner: 'Bob',
//         species: 'Dog',
//         isAdopted: true,
//       });
//       expect(readFile).toHaveBeenCalled();
//     });
//   });
//   describe('When we use the method update with an invalid id', () => {
//     test('Then it should throw an error', async () => {
//       (readFile as jest.Mock).mockResolvedValue(
//         JSON.stringify([
//           {
//             id: '1',
//             name: 'Buddy',
//             owner: 'Bob',
//             species: 'Dog',
//             isAdopted: false,
//           },
//         ])
//       );
//       const data = { isAdopted: true } as unknown as PetCreateDto;
//       const id = '6';
//       await expect(repo.update(id, data)).rejects.toThrow(
//         new HttpError(404, 'Not Found', 'Pet 6 not found')
//       );
//     });
//   });
//   describe('When we use the method delete with a valid id', () => {
//     test('Then it should call readFile and writeFile', async () => {
//       (readFile as jest.Mock).mockResolvedValue(
//         JSON.stringify([
//           {
//             id: '1',
//             name: 'Buddy',
//             owner: 'Bob',
//             species: 'Dog',
//             isAdopted: false,
//           },
//         ])
//       );
//       const id = '1';
//       const result = await repo.delete(id);
//       expect(result).toEqual({
//         id: '1',
//         name: 'Buddy',
//         owner: 'Bob',
//         species: 'Dog',
//         isAdopted: false,
//       });
//       expect(readFile).toHaveBeenCalled();
//     });
//   });
//   describe('When we use the method delete with an invalid id', () => {
//     test('Then it should throw an error', async () => {
//       (readFile as jest.Mock).mockResolvedValue(
//         JSON.stringify([
//           {
//             id: '1',
//             name: 'Buddy',
//             owner: 'Bob',
//             species: 'Dog',
//             isAdopted: false,
//           },
//         ])
//       );
//       const id = '6';
//       await expect(repo.delete(id)).rejects.toThrow(
//         new HttpError(404, 'Not Found', 'Pet 6 not found')
//       );
//     });
//   });
// });
