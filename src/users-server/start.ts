import express from 'express';
import { default as ApiUsersRoute } from './routes/users/users-api';
import ApiGroupsRoute from './routes/groups/groups-api';

const app = express();

app.listen(3000);
app.use(express.json());

app.set('case sensitive routing', true);
app.set('strict routing', true);

const apiUsersRoute = new ApiUsersRoute(app, '/api/users');
const apiGroupsRoute = new ApiGroupsRoute(app, '/api/groups');
apiUsersRoute.getRouter();
apiGroupsRoute.getRouter();
