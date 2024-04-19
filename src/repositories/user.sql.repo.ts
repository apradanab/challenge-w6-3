/* eslint-disable @typescript-eslint/padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
import { type PrismaClient } from '@prisma/client';
import { type User, type UserCreateDto, type UserUpdateDto } from '../entities/user';

const debug = createDebug('W6E:users:repository:sql');

const select = {
  id: true,
  name: true,
  email: true,
  password: true,
  birthDate: true,
  role: true,
  animals: { select: { name: true, species: true } },
};

export class UserSqlRepository {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated user repository');
  }
  
  async readAll() {
    return this.prisma.user.findMany({ select });
  }

  async readById(inputId: string) {
    const pet = await this.prisma.user.findUnique({
      where: { id: inputId },
      select,
    });
    if (!pet) {
      throw new HttpError(404, 'Not Found', `User ${inputId} not found`);
    }
    return pet;
  }

  // 1er paso login. filtro
  // async find (key: string, value: unknown) {
  //   return this.prisma.user.findMany({
  //     where: {
  //       [key]: value,
  //     },
  //     select,
  //   })
  // }
  async searchForLogin(key: 'email' | 'name', value:unknown) {

    if(!['email', 'name'].includes(key)) {
      throw new HttpError(404, 'Not Found', 'Invalid query parameters');
    }

    const userData = await this.prisma.user.findFirst({
      where: {
        [key]: value,
      },
      select: {
        id:true,
        name:true,
        email:true,
        role:true,
        password:true,
      }
    });
    return userData;  // Falta modificar repo.type
  }

  async create(data: UserCreateDto) {
    const newUser = this.prisma.user.create({
      data: {
        role: 'user',
        ...data
      },
      select,
    });
    return newUser;
  }
  
  async update(inputId: string, data: UserUpdateDto) {
    let user: User;
    try {
      user = await this.prisma.user.update({
        where: { id: inputId },
        data,
        select,
      });
    } catch (error) {
      throw new HttpError(404, 'Not Found', `User ${inputId}not found`);
    }
    return user;
  }

  async delete(inputId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: inputId },
      select,
    });
    if (!user) {
      throw new HttpError(404, 'Not Found', `User ${inputId} not found`);
    }
    
    return this.prisma.user.delete({ where: { id: inputId }, select });
  }
}
