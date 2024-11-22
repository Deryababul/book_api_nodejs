const express = require("express");
const mysSqlPool = require("./src/config/db");
const bookRouter = require("./src/routes/routes");
const apiKey = require("./src/middleware/apiKey")
const app = express()
//deneme123343324234
=======
//deneme123343343
>>>>>>> 499cb375e733f768a3c45c64772680f445ad7448
require("dotenv").config()
//routes
app.use(express.json());
app.use("/api/books",apiKey,bookRouter)

//database
const port = process.env.PORT || 5001
mysSqlPool.query('SELECT 1').then(() => {
    console.log("mysql db connected");
app.listen(port,() =>{
    console.log(`server ${port} portundan başlatildi ..`);
});
})


