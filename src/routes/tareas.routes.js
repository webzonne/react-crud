const express = require("express");
const Tarea = require("../models/Tarea");
const routes = express.Router();


//MOSTRAR TAREAS
routes.get('/', async (req,res) =>{
    const tarea = await Tarea.find();
    console.log(tarea);
    res.json(tarea);
})
//AGREGAR TAREA
routes.post('/', async (req,res)=>{
    const {title,description} = req.body;
    const tarea = new Tarea({title,description});
    await tarea.save();
    console.log(req.body)
    res.send('funciona post')
})

//ELIMINAR TAREA
routes.delete('/:id', async (req,res)=>{
    await Tarea.findByIdAndDelete(req.params.id)
    res.send('eliminada')
})

//EDITAR TAREA
routes.get('/:id', async (req,res)=>{
    const tarea = await Tarea.findById(req.params.id)
    res.json(tarea)
})

//ACTUALIZAR TAREA
routes.put('/:id', async (req,res)=>{
    const {title,description} = req.body
    const newTarea = {title,description}
    await Tarea.findByIdAndUpdate(req.params.id, newTarea)
    res.send('tarea actualizada')
})

module.exports = routes;

