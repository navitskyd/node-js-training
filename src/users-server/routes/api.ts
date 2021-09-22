import {UserService} from "../services/users";
import {BaseRoute} from "./BaseRoute";
import {UrlUtils} from "../services/url-utils";
import * as Joi from 'joi'
import {createValidator} from 'express-joi-validation'

const userCreateQuerySchema = Joi.object({
    login: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    age: Joi.number().integer().min(4).max(130).required()
});

const validator = createValidator();

const userService = UserService.getInstance();

export class ApiUsersRoute extends BaseRoute {

    constructor(app, basePath: string) {
        super(app, basePath);
    }

    registerResources() {
        this.router
            .get('/', function (req, res, next) {
                const {limit, login} = req.query;
                if (limit || login) {
                    let usersSubList = userService.getAutoSuggestUsers(UrlUtils.getSingleQueryParam(login), parseInt(UrlUtils.getSingleQueryParam(limit)));
                    res.send(usersSubList);
                    return;
                }
                res.send(userService.getAll());
            })
            .post('/', validator.body(userCreateQuerySchema), function (req
                                                                        /*: ValidatedRequest<UserCreateRequestSchema>*/
                , res, next) {
                let user = userService.convertObject(req.body);
                let userCreated = userService.createUser(user);
                if (userCreated) {
                    res.send("User " + user.id + " created.");
                } else {
                    res.status(409).json("User was not created!");
                }
            })
            .get('/:userId', function (req, res, next) {
                res.send(userService.findUserByID(req.params['userId']));
            })
            .delete('/:userId', function (req, res, next) {
                res.send(userService.deleteUser(req.params['userId']));
            });
    }
}
