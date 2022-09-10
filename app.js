const express = require('express');
const task_routes = require('./routes/route-tasks');
const connect_db = require('./db/connect-db');
require('dotenv').config();  //load secret variables into process.env
const notFound = require('./middleware/not-found')

const app = express();

//Middleware
app.use(express.static('./public'));
app.use(express.json());

//routes
app.use('/api/v1/tasks', task_routes);

//
app.use(notFound);
//database and server
const port = 3000;
const start = async ()=>{
    try {
        await connect_db(process.env.MONGO_URI);
        console.log("DATABASE CONNECTED. GREAT!!! ...");
        //http server
        app.listen(port, console.log(`Server is listening at port ${port} ...`));
    } catch (error) {
        console.log("ERROR: cannot connect to DATABASE \n", error);
    }
}
start();