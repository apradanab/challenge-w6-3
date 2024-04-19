import Joi from 'joi';
import { type AnimalCreateDto } from './animals.js';

export const animalCreateDtoSchema = Joi.object<AnimalCreateDto>({
  name: Joi.string().required(),
  species: Joi.string().required(),
  habitat: Joi.string().default(''),
  sponsorId: Joi.string().optional(),
  isWild: Joi.boolean().default(false),
});

export const animalUpdateDtoSchema = Joi.object<AnimalCreateDto>({
  name: Joi.string(),
  species: Joi.string(),
  habitat: Joi.string(),
  isWild: Joi.boolean(),
});
