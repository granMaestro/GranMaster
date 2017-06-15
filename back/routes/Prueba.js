'use strict';


let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');


let pruebaServices = require('./../services/pruebaServices.js');

//const fileUpload = require('express-fileupload');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
////////////////************  creo el crud para prueba		*********/////////////////

// listar
router.get('/', function(req,res){
	pruebaServices.get(function(err, pruebas){
			if (!err) {
				res.json({ status: 'SUCCESS', prueba: pruebas }); 
			}else{
				res.json({ status: 'FAIL', message: err }); 
			}
	})
})

// insertar 
router.post('/:name/:descripcion', upload.single('files'), function(req, res){
 	if (req.files=='undefined') {
 		let extension = req.files.files.name.split('.').pop();
		pruebaServices.create(req.params, extension, function(err, prueba){
			if (!err) {
				res.json({ status: 'SUCCESS', message: 'Categoria Creada', prueba });

				fs.rename(req.files.files.path, path.join(__dirname, "../../front/docs/public/uploads/"+prueba._id+"."+extension));
				console.log(extension)

			}else{
				res.json({ status: 'FAIL', message: err }); 
				console.log("extension")
			}
		})	
 	}
 	else{
 		res.json({ status: 'FAIL', message: 'Imagen Obligatorio' });
 	}
	
})

// modificar
router.put('/', function(req,res){
	pruebaServices.modify(req.body, req.query.id, function(err, prueba){
		if (!err) {
			res.json({ status: 'SUCCESS', message: 'Categoria Modificada', prueba });
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})


// eliminar
router.delete('/', function(req,res){
	pruebaServices.delete(req.query.id, function(err, prueba){
		if (!err) {
			res.json({ status: 'SUCCESS', message: 'Categoria Eliminada', prueba });
		}else{
			res.json({ status: 'FAIL', message: err }); 
		}
	})
})

module.exports = router;