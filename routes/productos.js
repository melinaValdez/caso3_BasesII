const express = require('express');
const Producto = require('../models/producto_model');
const ruta = express.Router();

ruta.get('/',(req, res) => {
    let resultado = listarProductosDisponibles();
    resultado.then(productos => {
        res.json(productos);
    }).catch(err => {
        res.status(400).json(err);
    })
})

ruta.post('/', (req, res) => {
    let body = req.body;
    let resultado = venderProducto(body);

    resultado.then(objeto => {
        res.json({
            valor: objeto
        })
    }).catch (err => {
        res.status(400).json({
            error: err
        })
    })
});

ruta.put('/:nombreProducto', (req, res) => {
    let resultado = actualizarOferta(req.params.nombreObjeto, req.body);
    resultado.then(valor => {
        res.json({
            valor: valor
        })
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    })
});

ruta.delete('/:nombreObjeto', (req, res) =>{
    let resultado = quitarDisponibilidad(req.params.nombreObjeto);
    resultado.then (valor =>{
        res.json({
            usuario: valor
        })
    }). catch(err => {
        res.status(400).json({
            error: err
        })
    })
});

async function listarProductosDisponibles(){
    let productos = await Producto.find({"disponible": true});
    return productos;
}

async function quitarDisponibilidad(nombreObjeto){
    let producto = await Producto.findOneAndUpdate(nombreObjeto, {
        $set: {
            disponible: false
        }
    }, {new: true});
    
    return producto;
}

async function venderProducto(body){
    let producto = new Producto({
        usuarioDueño: body.usuarioDueño,
        emailDueño: body.emailDueño,
        añoProducto: body.añoProducto,
        precioInicial: body.precioInicial,
        tiempoInicial: body.tiempoInicial,
        tiempoFinal: body.tiempoFinal,
        nombreObjeto: body.nombreObjeto,
        descripcionObjeto: body.descripcionObjeto,
        imagen: body.imagen
    })

    return await producto.save();
}

async function actualizarOferta(nombreObjeto, body){
    let producto = await Producto.findOneAndUpdate(nombreObjeto, {
        $set: { 
            mejorOferta: body.mejorOferta
        }
    }, {new: true});
    return producto;
}



module.exports = ruta;
