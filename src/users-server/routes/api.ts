import { UserService } from '../services/users';
import { BaseRoute } from './BaseRoute';
import * as Joi from 'joi';
import { createValidator } from 'express-joi-validation';
import { Application } from 'express';

const userCreateQuerySchema = Joi.object({
    login: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    age: Joi.number().integer().min(4).max(130).required()
});
const limitSchema = Joi.object({
    limit: Joi.number().min(0),
    login: Joi.string()
});

const validator = createValidator();
const userService = UserService.getInstance();

const ROOT_URL = '/';
const USER_URL = `${ROOT_URL}:userId`;

export class ApiUsersRoute extends BaseRoute {
    constructor(app: Application, basePath: string) {
        super(app, basePath);
    }

    registerResources(): void {
        console.log('Register Router resources!');
        this.getRouter()
            .get(ROOT_URL, validator.query(limitSchema), async (req, res) => {
                let { limit, login } = req.query;
                login = login || '';
                limit = limit || '0';
                const usersSubList = await userService.getUsersByLogin(login.toString(), parseInt(limit.toString(), 2));
                res.send(usersSubList);
            })
            .post(ROOT_URL, validator.body(userCreateQuerySchema)
                , async (req, res) => {
                    const user = userService.convertObject(req.body);
                    const userCreated = await userService.createUser(user)
                        .catch((err) => {
                            res.status(409).json(`User was not created: ${err}`);
                        });

                    if (userCreated) {
                        if (userCreated.rowCount === 1) {
                            res.send(`User ${user.id} created.`);
                        } else {
                            res.status(409).json(`Unexpected result: ${JSON.stringify(userCreated)}`);
                        }
                    }
                })
            .get(USER_URL, async (req, res) => {
                const user = await userService.findUserByID(req.params['userId']);
                if (user) {
                    res.send(user);
                } else {
                    res.status(404).json('User was not found');
                }
            })
            .delete(USER_URL, async (req, res) => {
                const userId = req.params['userId'];
                const deleteOperation = await userService.markForDeleteUser(userId);
                if (deleteOperation === 1) {
                    res.send(`User with id ${userId} was deleted.`);
                } else {
                    res.status(409).json(`User(s) with id ${userId} were deleted: ${deleteOperation}`);
                }
            });
    }
}
