const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const port = 3000;

// Configuración avanzada de CORS
const corsOptions = {
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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
