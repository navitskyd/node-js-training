const express = require('express');
const app = express();

app.listen(3000);
app.use(express.json());

app.set('case sensitive routing',true);
app.set('strict routing',true);

