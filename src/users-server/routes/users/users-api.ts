import { UserService } from '../../services/users';
import { Base } from '../base';
import { createValidator, ValidatedRequest } from 'express-joi-validation';
import { Application } from 'express';
import { userCreateSchema, UserCreateValidatedSchema, userSearchSchema, UsersSearchValidatedSchema } from './users-schema-requests';


const validator = createValidator();

const userService = UserService.getInstance();
const ROOT_URL = '/';
const USER_URL = `${ROOT_URL}:userId`;

export class ApiUsersRoute extends Base {
    constructor(app: Application, basePath: string) {
        super(app, basePath);
    }

    registerResources(): void {
        this.getRouter()
            .get(ROOT_URL, validator.query(userSearchSchema), async (req: ValidatedRequest<UsersSearchValidatedSchema>, res) => {
                const { limit, login } = req.query;
                const usersSubList = await userService.findByLogin(login, limit);
                res.send(usersSubList);
            })
            .post(ROOT_URL, validator.body(userCreateSchema), async (req: ValidatedRequest<UserCreateValidatedSchema>, res) => {
                const user = userService.convert(req.body);
                const userCreated = await userService.create(user)
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
                const user = await userService.findByID(req.params['userId']);
                if (user) {
                    res.send(user);
                } else {
                    res.status(404).json('User was not found');
                }
            })
            .delete(USER_URL, async (req, res) => {
                const userId = req.params['userId'];
                const deleteOperation = await userService.markForDelete(userId);
                if (deleteOperation === 1) {
                    res.send(`User with id ${userId} was deleted.`);
                } else {
                    res.status(409).json(`User(s) with id ${userId} were not found or already deleted: ${deleteOperation}`);
                }
            });
    }
}
