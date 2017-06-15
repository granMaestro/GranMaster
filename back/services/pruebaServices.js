'use strict';

///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let Prueba = require('./../models/pruebaModel.js');

///////////////////////////////////////////////////////////////////////////
////////******     creo la clase que hace los servicios        ****//////////
///////////////////////////////////////////////////////////////////////////
class pruebaServices{
	constructor(){

	}
	get(callback){
		Prueba.find({},callback)
	}
	create(prueba, extension, callback){
		var newPrueba = new Prueba({
			name: prueba.name,
			slug: prueba.slug,
			descripcion: prueba.descripcion,
			imagen: extension
		});
		newPrueba.save(callback)

	}
	modify(prueba, id, callback){
 
		Prueba.findByIdAndUpdate(id, {$set: {
                            'name'        : prueba.name,
                            'slug'        : prueba.slug,
                            'descripcion' : prueba.descripcion,
                            'updatedAt'   : new Date()
                        }}, callback)
		 
	}
	delete(id, callback){
	    Prueba.findById(id, function(err, prueba) {
	      prueba.remove(function(err, prueba) {
	        if(callback) callback(err, Prueba);
	      });
	    });
	}
}

module.exports = new pruebaServices();