const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    usuarioDueño: {
        type:String,
        required: true
    },
    emailDueño: {
        type:String,
        required:true
    },
    añoProducto: {
        type:String,
        required: true
    },
    disponible: {
        type: Boolean,
        default: true
    },
    nombreObjeto: {
        type: String,
        default: true
    },
    descripcionObjeto: {
        type: String,
        required: false
    },
    precioInicial: {
        type: Number,
        required: true
    },
    tiempoFinal: {
        type: String,
        required: true
    },
    tiempoInicial: {
        type: String,
        required: true
    },
    mejorOferta:{
        type: Number ,
        required: false
    },
    imagen: {
        type: String,
        required: false        
    }
});

module.exports = mongoose.model('Producto', productoSchema);

