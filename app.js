// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const taskRoutes = require('./routes/tasks');
const goalRoutes = require('./routes/goals');

const app = express();
const port = process.env.PORT || 3000;

// Conectar a MongoDB
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('No se pudo conectar a MongoDB', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/tasks', taskRoutes);
app.use('/goals', goalRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
