const dotenv = require('dotenv');

dotenv.config()

const PORT= process.env.PORT || 3000;
const MONGODEB_URI = process.env.MONGODEB_URI || 'mongodb://localhost/test'
exports.PORT = PORT;
exports.MONGODEB_URI = MONGODEB_URI;

