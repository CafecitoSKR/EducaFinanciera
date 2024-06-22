const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexión con la base de datos
mongoose.connect('mongodb://mongodb:27017/EducaFinanciera')
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e));

// Importar rutas
const authRoutes = require('./routes/auth');
const validaToken = require('./routes/validate-token'); // Asegúrate de que este middleware esté exportado correctamente
const admin = require('./routes/admin');
const postRoutes = require('./routes/posts'); // Importar las rutas de posts

// Route middlewares
app.use('/api/user', authRoutes);
app.use('/admin', validaToken, admin);
app.use('/posts', validaToken, postRoutes); // Asegúrate de que esta línea esté presente

app.get('/', (req, res) => {
    res.send('Hola Alejandro');
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
