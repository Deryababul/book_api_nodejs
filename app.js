const express = require("express");
const mysSqlPool = require("./src/config/db");
const bookRouter = require("./src/routes/routes");
const apiKey = require("./src/middleware/apiKey")
const app = express()

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


