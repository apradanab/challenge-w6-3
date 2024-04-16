import Joi from 'joi';
import { type PetCreateDto } from './pet';

export const petCreateDtoSchema = Joi.object<PetCreateDto>({
  id: Joi.string().required(),
  name: Joi.string().required(),
  species: Joi.string().required(),
  owner: Joi.string().default(''),
  isAdopted: Joi.boolean().default(false),
});

export const petUpdateDtoSchema = Joi.object<PetCreateDto>({
  id: Joi.string(),
  name: Joi.string(),
  species: Joi.string(),
  owner: Joi.string(),
  isAdopted: Joi.boolean(),
});
