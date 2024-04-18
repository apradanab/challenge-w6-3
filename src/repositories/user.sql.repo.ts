/* eslint-disable @typescript-eslint/padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
import { type PrismaClient } from '@prisma/client';
import { type User, type UserCreateDto, type UserUpdateDto } from '../entities/user';

const debug = createDebug('W7:users:repository');

const select = {
  id: true,
  name: true,
  email: true,
  password: true,
  birthDate: true,
  role: true,
  pets: { select: { name: true, species: true } },
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

  async create(data: UserCreateDto) {
    const newUser = this.prisma.user.create({
      data: {
        role: 'user',
        ...data,
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
