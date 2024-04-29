const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const routerApi = require('./src/infrastructure/routes/index')



dotenv.config();
const app = express();

// Usamos el middleware de Express para procesar datos en formato JSON
app.use(express.json());

// Usamos el middleware de CORS para permitir solicitudes desde todos los dominios
app.use(cors());
routerApi(app);
// Manejador de rutas no encontradas
app.use((req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

// Manejador de errores
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`La aplicación está escuchando en el puerto ${port}`);
});