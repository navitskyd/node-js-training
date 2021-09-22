import {ContainerTypes, ValidatedRequestSchema} from "express-joi-validation";


export interface UserCreateRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        login: string,
        password: string,
        age: number,
    }
}