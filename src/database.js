
const mongoose = require('mongoose');
const dotenv = require('./config');

//const URI = 'mongodb://localhost/mern-db';
//dotenv.MONGODEB_URI
mongoose.connect(dotenv.MONGODEB_URI)
.then(db => console.log('base de datos conectada'))
.catch(err => console.log(err));

module.exports = mongoose;

// const baseDatos = async ()=>{
//     try{
//         await mongoose.connect(URI)
//         console.log('base de datos conectada')
//     }catch(err){
//         console.log(err)
//     } 
// } 
// module.exports = baseDatos;