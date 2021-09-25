const express = require('express');
const Producto = require('../models/producto_model');
const ruta = express.Router();

ruta.get('/',(req, res) => {
    let resultado = listarProductosDisponibles();
    resultado.then(productos => {
        res.json(productos);
    })    
    .catch((error)=>{
        result = res.status(500).json({
            error: true,
            message: `Error: ${error}`,
            code: 0
        });
    });
});

ruta.get('/fil/:filtro',(req, res) => {
    let resultado = filtro(req.params.filtro, req.body);
    resultado.then(objeto => {
        res.json({
            valor: objeto
        })
    })    
    .catch((error)=>{
        result = res.status(500).json({
            error: true,
            message: `Error: ${error}`,
            code: 0
        });
    });
});


ruta.post('/', (req, res) => {
    let body = req.body;
    let resultado = venderProducto(body);

    resultado.then(objeto => {
        res.json({
            valor: objeto
        })
    })    
    .catch((error)=>{
        result = res.status(500).json({
            error: true,
            message: `Error: ${error}`,
            code: 0
        });
    });
});

ruta.put('/:id', (req, res) => {
    let resultado = actualizarOferta(req.params.id, req.body);
    resultado.then(valor => {
        res.json({
            valor: valor
        })
    })    
    .catch((error)=>{
        result = res.status(500).json({
            error: true,
            message: `Error: ${error}`,
            code: 0
        });
    });
});

ruta.delete('/:id', (req, res) =>{
    let resultado = quitarDisponibilidad(req.params.id);
    resultado.then (valor =>{
        res.json({
            usuario: valor
        })
    })    
    .catch((error)=>{
        result = res.status(500).json({
            error: true,
            message: `Error: ${error}`,
            code: 0
        });
    });
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
        tiempoInicial:  new Date().toISOString(),
        tiempoFinal: new Date(body.tiempoFinal).toISOString(),
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

async function filtro(filtro, body){
    let productos = await Producto.find(body);   
    return productos;
}

module.exports = ruta;
