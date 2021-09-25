const productos = require('./routes/productos');
const express = require('express');
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

//Conectarnos a la BD
mongoose.connect('mongodb://localhost:27017/demo', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar con MongoDB..', err));


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/productos', productos);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Api RESTFul Ok, y ejecutándose...');
})