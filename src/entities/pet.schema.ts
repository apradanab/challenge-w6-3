import Joi from 'joi';
import { type PetCreateDto } from './pet.js';

export const petCreateDtoSchema = Joi.object<PetCreateDto>({
  name: Joi.string().required(),
  species: Joi.string().required(),
  owner: Joi.string().default(''),
  isAdopted: Joi.boolean().default(false),
});

export const petUpdateDtoSchema = Joi.object<PetCreateDto>({
  name: Joi.string(),
  species: Joi.string(),
  owner: Joi.string(),
  isAdopted: Joi.boolean(),
});
