const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const port = 3000;

const allowedOrigins = ['http://localhost']; // Añade más orígenes si es necesario

const corsOptions = {
  origin: 'http://localhost',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization','auth-token'],
  credentials: true
};

app.use(cors(corsOptions));

// Protección contra ataques de fuerza bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cabeceras de seguridad
app.use(helmet());

// Conexión con la base de datos
mongoose.connect('mongodb://mongodb:27017/EducaFinanciera')
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e));

// Importar rutas
const authRoutes = require('./routes/auth');
const validaToken = require('./routes/validate-token');
const admin = require('./routes/admin');
const postRoutes = require('./routes/posts');

// Route middlewares
app.use('/api/user', authRoutes);
app.use('/admin', validaToken, admin);
app.use('/posts', validaToken, postRoutes);

app.get('/', (req, res) => {
    res.send('Hola Alejandro');
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});