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
const limitSchema = Joi.object({
    limit: Joi.number().min(0),
    login: Joi.string()
});

const validator = createValidator();
const userService = UserService.getInstance();

const ROOT_URL: string = "/";
const USER_URL: string = ROOT_URL + ":userId";

export class ApiUsersRoute extends BaseRoute {


    constructor(app, basePath: string) {
        super(app, basePath);
    }

    registerResources() {
        this.router
            .get(ROOT_URL, validator.query(limitSchema), async (req, res, next) => {
                const {limit, login} = req.query;
                let usersSubList = await userService.getUsersByLogin(UrlUtils.getSingleQueryParam(login), parseInt(UrlUtils.getSingleQueryParam(limit)));
                res.send(usersSubList);
                return;
            })
            .post(ROOT_URL, validator.body(userCreateQuerySchema), async (req
                , res, next) => {
                let user = userService.convertObject(req.body);
                let userCreated = await userService.createUser(user)
                    .catch((err) => {
                        res.status(409).json("User was not created: " + err);
                    });

                if (userCreated && userCreated['rowCount'] == 1) {
                    res.send("User " + user.id + " created.");
                } else {
                    res.status(409).json("Unexpected response: " + JSON.stringify(userCreated));
                }
            })
            .get(USER_URL, async (req, res, next) => {
                res.send(await userService.findUserByID(req.params['userId']));
            })
            .delete(USER_URL, async (req, res, next) => {
                const userId = req.params['userId'];
                const deleteOperation = await userService.markForDeleteUser(userId);
                if (1 === deleteOperation) {
                    res.send("User with id " + userId + " was deleted.");
                } else {
                    res.status(409).json("User(s) with id " + userId + " were deleted: " + deleteOperation);
                }
            });
    }
}
