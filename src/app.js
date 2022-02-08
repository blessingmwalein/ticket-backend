const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();
const bodyParser = require("body-parser");
// require("./services/utils/passport");
// //
// const middlewares = require('./middleware/middlewares');
// const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//import routes 
const routes = require('./routes/');

//routes middlewares
app.use('/api/v1', routes);


module.exports = app;
