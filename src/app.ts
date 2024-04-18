import express, {type Express} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { ErrorsMiddleware } from './middleware/errors.middleware.js';
import { type PrismaClient } from '@prisma/client';
import { AnimalController } from "./controllers/animal.controller.js";
import { AnimalsSqlRepo } from './repositories/animal.sql.repo.js';
import { AnimalsRouter } from "./routers/animal.router.js";
// Import { PetsRouter } from './routers/pet.router.js';
// import { PetsSqlRepo } from './repositories/pets.sql.repo.js';
// import { PetController } from './controllers/pet.controller.js';
import { UserSqlRepository } from './repositories/user.sql.repo.js';
import { UserController } from './controllers/user.controller.js';
import { UsersRouter } from './routers/user.router.js';

const debug = createDebug('W6E:app');

export const createApp = () => {
  const app = express();
  return app;
};

export const startApp = (app: Express, prisma: PrismaClient) => {
  debug('Starting app');

const animalRepo = new AnimalsSqlRepo(prisma);
const animalController = new AnimalController(animalRepo);
const animalRouter = new AnimalsRouter(animalController);
const errorMiddleware = new ErrorsMiddleware()
// Const petRepo = new PetsSqlRepo();
// const petController = new PetController(petRepo);
// const petRouter = new PetsRouter(petController);
const userRepo = new UserSqlRepository(prisma);
const userController = new UserController(userRepo);
const userRouter = new UsersRouter(userController);


  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.static('public'));
  // App.use('/pets', petRouter.router);
  app.use('/animals', animalRouter.router);
  app.use('/users', userRouter.router); 
  app.use(errorMiddleware.handle.bind(errorMiddleware));
}
