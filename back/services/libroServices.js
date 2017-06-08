'use strict';
///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let Libro = require('./../models/libroModel.js');
 

/////////////////////////////////////////////////////////////////////////////
////////******     creo la clase que hace los servicios        ****//////////
/////////////////////////////////////////////////////////////////////////////
class libroServices{
	constructor(){

	}
	get(callback){
		//console.log()
		Libro.find({}).populate('usuario').populate('categoria').exec(callback)	
	}
	create(libro, idUser, callback){
		var newLibro = new Libro({
			titulo: libro.titulo,
			autor: libro.autor,
			genero: libro.genero,
			categoria: libro.categoria,
			usuario: idUser,
			palabras: libro.palabras,
			descripcion: libro.descripcion,
			estado: libro.estado,
			clase: libro.clase,
			precio: libro.precio
		});
		newLibro.save(callback)
	}


}

module.exports = new libroServices();