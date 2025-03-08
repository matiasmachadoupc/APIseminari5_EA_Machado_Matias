import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './modules/users/user_routes.js';
import forumRoutes from './modules/forum/forum_routes.js';
import subjectRoutes from './modules/subject/subject_routes.js'; // Importa las rutas de subjects
import { corsHandler } from './middleware/corsHandler.js';
import { loggingHandler } from './middleware/loggingHandler.js';
import { routeNotFound } from './middleware/routeNotFound.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config();

const app = express();

const LOCAL_PORT = process.env.PORT || 9000;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Usuarios',
            version: '1.0.0',
            description: 'Documentación de la API de Usuarios'
        },
        tags: [
            {
              name: 'Users',
              description: 'Rutas relacionadas con la gestión de usuarios',
            },
            {
              name: 'Forum',
              description: 'Rutas relacionadas con el forum',
            },
            {
              name: 'Main',
              description: 'Rutas principales de la API',
            },
            {
              name: 'Subjects',
              description: 'Rutas relacionadas con la gestión de asignaturas',
            }
          ],
        servers: [
            {
                url: `http://localhost:${LOCAL_PORT}`
            }
        ]
    },
    apis: ['./modules/users/*.js', './modules/forum/*.js', './modules/subject/*.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(loggingHandler);
app.use(corsHandler);

app.use('/api', userRoutes);
app.use('/api', forumRoutes);
app.use('/api', subjectRoutes); // Añade las rutas de subjects

app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

mongoose
    .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mi_base_de_datos')
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.error('DB Connection Error:', error));

app.listen(LOCAL_PORT, () => {
    console.log('Server listening on port: ' + LOCAL_PORT);
    console.log(`Swagger disponible a http://localhost:${LOCAL_PORT}/api-docs`);
});