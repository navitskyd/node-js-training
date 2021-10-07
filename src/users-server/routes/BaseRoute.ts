import * as express from 'express';
import { Application, Router } from 'express';
import { Route } from './Route';

export abstract class BaseRoute implements Route {
    private readonly _router: Router;

    getRouter(): Router {
        return this._router;
    }

    protected constructor(app: Application, basePath: string) {
        this._router = express.Router();
        app.use(basePath, this._router);
        this.registerResources();
    }

    abstract registerResources(): void;
}
