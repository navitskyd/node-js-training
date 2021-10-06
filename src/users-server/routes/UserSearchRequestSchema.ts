import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';


export interface UserSearchRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        login: string,
        limit: number,
    };
}
