const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const accountRouter = require('./routes/account');
const connectDb = require('./db');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/account", accountRouter);

app.listen(port, () => {
    connectDb();
    console.log(`Server live on http://localhost:${port}`);
})