'use strict';
///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let express = require('express');
let router = express.Router();
let libroServices = require('./../services/libroServices.js');
 

router.get('/', function(req,res){
	libroServices.get(function(err, libros){
		if (err) {
			res.json({ status: 'FAIL', message: err }); 
		}else{
			res.json({ status: 'SUCCESS', libros }); 
		}
	})
})

router.post('/', function(req,res){
	if (!req.user) {
		res.json({ status: 'FAIL', message: 'No hay un usuario logueado' }); 
	}else{
		libroServices.create( req.body, req.user._id, function(err, libros){
			if (err) {
				res.json({ status: 'FAIL', message: err }); 
			}else{
				res.json({ status: 'SUCCESS', libros }); 
			}
		})
	}
})

module.exports=router;