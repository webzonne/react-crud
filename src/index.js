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
app.use(express.static(path.join(__dirname, 'public')))

//ROUTES
//MOSTRAR TAREAS
app.get('/tareas', async (req,res) =>{
    const tarea = await Tarea.find();
    console.log(tarea);
    res.json(tarea);
})
//AGREGAR TAREA
app.post('/tareas', async (req,res)=>{
    const {title,description} = req.body;
    const tarea = new Tarea({title,description});
    await tarea.save();
    console.log(req.body)
    res.send('funciona post')
})

//ELIMINAR TAREA
app.delete('/tareas/:id', async (req,res)=>{
    await Tarea.findByIdAndDelete(req.params.id)
    res.send('eliminada')
})

//EDITAR TAREA
app.get('/tareas/:id', async (req,res)=>{
    const tarea = await Tarea.findById(req.params.id)
    res.json(tarea)
})

//ACTUALIZAR TAREA
app.put('/tareas/:id', async (req,res)=>{
    const {title,description} = req.body
    const newTarea = {title,description}
    await Tarea.findByIdAndUpdate(req.params.id, newTarea)
    res.send('tarea actualizada')
})

//SERVER
app.listen(dotenv.PORT, () =>{
    console.log('servidor conectado al puerto 3000')
})