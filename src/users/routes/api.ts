import * as express from 'express';
import { Router } from 'express';
import { Db } from '../services/db';
import { User } from '../entities/User';

const usersDbService = Db.instance;

export class ApiUsers {

    basePath: string;
    private router: Router;

    constructor(app, basePath: string) {
        this.router = express.Router();
        this.basePath = basePath;

        app.use(basePath, this.router);

        this.router.get('/', function (req, res, next) {
            let limit = req.param('limit');
            res.send(usersDbService.users);
        });

        this.router.get('/:userId', function (req, res, next) {
            let users = usersDbService.getUserById(req.param('userId'));
            res.send(users);
        });

        this.router.post('/', function (req, res, next) {
            let body = req.body;

            let user = new User();
            user.age = body.age;
            user.login = body.login;
            user.password = body.password;

            if (usersDbService.add(user)) {
                res.send('User ' + user.id + ' created.');
            } else {
                //next();
            }
        });

        this.router.delete('/:userId', function (req, res, next) {
            let inputId = req.param('userId');
            usersDbService.getUserById(inputId).delete();
            //filter(user=>user.id===req.param('userId'));
            res.sendStatus(202);
        });
    }
}
