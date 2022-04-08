import express, { Application, Router } from 'express';
import { Route } from './route';

export abstract class Base implements Route {
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
