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

const validator = createValidator();

const userService = UserService.getInstance();

export class ApiUsersRoute extends BaseRoute {
    constructor(app: Application, basePath: string) {
        super(app, basePath);
    }

    registerResources() {
        this.getRouter()
            .get('/', (req, res) => {
                let { limit, login } = req.query;
                login = login || '';
                limit = limit || '0';
                const usersSubList = userService.getAutoSuggestUsers(login.toString(), parseInt(limit.toString(), 2));
                res.send(usersSubList);
                return;
            })
            .post('/', validator.body(userCreateQuerySchema)
                , (req, res) => {
                    const user = userService.convertObject(req.body);
                    const userCreated = userService.createUser(user);
                    if (userCreated) {
                        res.send(`User ${user.id} created.`);
                    } else {
                        res.status(409).json('User was not created!');
                    }
                })
            .get('/:userId', (req, res) => {
                const user = userService.findUserByID(req.params['userId']);
                if (user) {
                    res.send(user);
                } else {
                    res.status(404).json('User was not found');
                }
            })
            .delete('/:userId', (req, res) => {
                res.send(userService.deleteUser(req.params['userId']));
            });
    }
}
