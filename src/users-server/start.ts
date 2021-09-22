import express from 'express';
import {ApiUsersRoute} from "./routes/api";

const app = express();

app.listen(3000);
app.use(express.json());

app.set('case sensitive routing', true);
app.set('strict routing', true);

new ApiUsersRoute(app,'/api/users');