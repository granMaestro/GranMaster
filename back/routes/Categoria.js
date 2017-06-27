'use strict';


let express = require('express');
let router = express.Router();

let categoriaServices = require('./../services/categoriaServices.js');

 
////////////////************  creo el crud para categorias		*********/////////////////


// listar
router.get('/', function(req,res){
	categoriaServices.get(function(err, categorias){
			if (!err) {
				res.json({ status: 'SUCCESS', categoria: categorias }); 
			}else{
				res.json({ status: 'FAIL', message: err }); 
			}
	})
})


// insertar 
router.post('/', function(req, res){
	categoriaServices.create(req.body, function(err, categoria){
		if (!err) {
			res.json({ status: 'SUCCESS', message: 'Categoria Creada', categoria });
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})	
})

// modificar
router.put('/', function(req,res){
	
	categoriaServices.modify(req.body, req.query.id, function(err, categorias){
		if (!err) {
			res.json({ status: 'SUCCESS', message: 'Categoria Modificada', categoria: categorias });
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})


// eliminar
router.delete('/', function(req,res){
	categoriaServices.delete(req.query.id, function(err, categorias){
		if (!err) {
			res.json({ status: 'SUCCESS', message: 'Categoria Eliminada', categoria: categorias });
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})

module.exports = router;