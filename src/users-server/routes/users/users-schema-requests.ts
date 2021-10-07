import * as Joi from 'joi';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import * as Joi2 from '@hapi/joi';
import 'joi-extract-type';

export const userCreateSchema = Joi.object({
    login: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    age: Joi.number().integer().min(4).max(130).required()
});

export interface UserCreateValidatedSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: Joi2.extractType<typeof userCreateSchema>;
}


export const userSearchSchema = Joi.object({
    login: Joi.string().alphanum().min(3).max(30).required(),
    limit: Joi.number().integer().min(1)
});

export interface UsersSearchValidatedSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: Joi2.extractType<typeof userSearchSchema>;
}
