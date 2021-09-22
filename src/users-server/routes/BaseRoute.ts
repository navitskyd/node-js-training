import express, {Router} from "express";
import {Route} from "./Route";

export abstract class BaseRoute implements Route{

    private readonly _router: Router;


    get router(): Router {
        return this._router;
    }

    protected constructor(app, basePath: string) {
        this._router = express.Router();
        app.use(basePath, this._router);
        this.registerResources();
    }

    abstract registerResources();



}