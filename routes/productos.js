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

ruta.put('/:id', (req, res) => {
    let resultado = actualizarOferta(req.params.id, req.body);
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

ruta.delete('/:id', (req, res) =>{
    let resultado = quitarDisponibilidad(req.params.id);
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

async function quitarDisponibilidad(id){
    let producto = await Producto.findOneAndUpdate(
        {"_id" : id}, 
        { $set: { disponible :  false } }
        );
    
    return producto;
}

async function venderProducto(body){
    let producto = new Producto({
        usuarioDueño: body.usuarioDueño,
        emailDueño: body.emailDueño,
        añoProducto: body.añoProducto,
        precioInicial: body.precioInicial,
        mejorOferta :  body.mejorOferta,
        tiempoInicial: body.tiempoInicial,
        tiempoFinal: body.tiempoFinal,
        nombreObjeto: body.nombreObjeto,
        descripcionObjeto: body.descripcionObjeto,
        imagen: body.imagen
    })

    return await producto.save();
}

async function actualizarOferta(id, body){
    let producto = await Producto.findOneAndUpdate(
        {"_id" : id}, 
        { $set: { mejorOferta :  body.mejorOferta } }
        );
    return producto;
}



module.exports = ruta;
