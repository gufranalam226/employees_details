require('dotenv').config();
const express = require('express')
require('./db/connection.js')
const router = require('./routes/router.js')
const cors = require('cors')
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads/", express.static("./uploads"));
app.use('/files/', express.static("./public/files"))

app.use('/', router);


app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`);
})