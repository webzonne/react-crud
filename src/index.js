const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const dotenv = require('./config');
const {mongoose} = require('./database');
const Tarea = require('./models/Tarea');

//SETTING
//app.set('PORT', process.env.PORT || 3000)

//MIDDLEWARS
app.use(express.json());
app.use(morgan('dev'));

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
app.use('/tareas', require('./routes/tareas.routes.js'));

//SERVER
app.listen(dotenv.PORT, () =>{
    console.log('servidor conectado al puerto 3000')
})