import express from 'express'

import employeesRouter from "./routes/employees.router.js";
import indexRoutes from "./routes/index.router.js";

const app = express();

app.use(express.json());

app.use('/api', employeesRouter);
app.use(indexRoutes);

//Not found, sino encontro rutas de arriba manejarlo de esta forma personalizada
app.use((req, res, next) =>{
    res.status(404).json({
        message: 'Endpoint not found'
    });
})

export default app