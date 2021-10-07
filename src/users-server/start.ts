import express from 'express';
import { ApiUsersRoute } from './routes/users/users-api';

const app = express();

app.listen(3000);
app.use(express.json());

app.set('case sensitive routing', true);
app.set('strict routing', true);

const apiUsersRoute = new ApiUsersRoute(app, '/api/users');
apiUsersRoute.getRouter();
