require('dotenv').config();
const logger = require('logger')
const express = require('express')
const bodyParser = require("body-parser");
//const cors = require("cors");
// const util = require('util');
// const db = require("./models");
// const DBseeder = require('./database/seeder')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// db.sequelize.sync({force: false}).then(() => {
//     console.log('DATABASE SYNC');
//     DBseeder.seedRoles()
// });

app.listen(3000, () => { 
    //logger.info( 'Server listening' )
    console.log(' SERVER LESTENING ')
} )
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// ROUTE '/'
app.get('/', (req,res) => {
    res.json({ res: "the server is ready for the developpement." });
})

require('./router/auth.routes')(app);
require('./router/user.routes')(app);
