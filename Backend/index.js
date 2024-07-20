const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require("./routes/user");
const connectDb = require('./db');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT;

app.use("/api/v1", router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDb();
});
