'use strict';
///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let express = require('express');
let router = express.Router();
let preguntaServices = require('./../services/preguntaServices.js');


///// LISTAR
router.get('/', function(req,res){
	preguntaServices.get(function(err, pregunta){
		if (err) {
			res.json({ status: 'FAIL', message: 'No se pudo crear la pregunta' });
		}else{
			res.json({ status: 'SUCCESS',  pregunta });
		}
	})
})

///// LISTAR POR PRUEBA
router.get('/:pruebaId', function(req,res){

	preguntaServices.getByPrueba(req.params.pruebaId, function(err, pregunta){
		if (err) {
			res.json({ status: 'FAIL', message: 'No se pudo crear la pregunta' });
		}else{
			res.json({ status: 'SUCCESS', pruebaId:req.params.pruebaId, pregunta });
		}
	})
})


///// INSERTAR
router.post('/', function(req,res){
	if(!req.user){
		res.json({ status: 'FAIL', message: 'Usuario no se ha logeado' });
	}else{
		preguntaServices.create(req.body, req.user._id, function(err, pregunta){
			if (err) {
				res.json({ status: 'FAIL', message: 'No se pudo crear la pregunta' });
			}else{
				res.json({ status: 'SUCCESS',  pregunta });
			}
		})	
	}
})

///// ELIMINAR
router.delete('/', function(req,res){
	preguntaServices.delete(req.query.id, function(err, pregunta){
		if (!err) {
			res.json({ status: 'SUCCESS', message: 'Prueba Eliminada', pregunta });
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})

module.exports=router;