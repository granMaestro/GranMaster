'use strict';

/////////////////////////////////////////////////////////////////////////
/***** importo mongoose para el modelado de la base de datos  **********/
/***** importo bcrypt  para la encriptacion de la contraseña  **********/
/////////////////////////////////////////////////////////////////////////
let mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let moment   = require('moment');
let Schema   = mongoose.Schema;

/////////////////////////////////////////////////////////////////////////
/********** genero la base la coleccion llamada users   ****************/
/////////////////////////////////////////////////////////////////////////
let User = new Schema({
	/////****** todo tipo de usuarios ****/////
	nombre:        String,
	apellido:      String,
	status:        String,
	token:         String,
	nacimiento :   String,
	pais:          String,
	ciudad:        String,
	tipo:          ['Root217', 'Admin324', '', 'Sus937', 'pac745', 'Pad546'],
	createdAt: 	   { type: String, default: moment().format('YYYY-MM-DD h:mm:ss') },	 

	/////****** suscriptores ****/////
	institucion :  String,
	especialidad:  String,	
	direccion:     String,
	telefono:      String,
	email: 		   String,
	valor_usuario: String,	
	valor_unico	:  String,


	/////****** pacientes ****/////
	institucion_educativa: String,
	grado : 	   String,

	/////****** padres ****/////
	parentesco:    String,
	id_hijo:       {type: Schema.Types.ObjectId, ref:"User"},

	/////****** login ****/////
	local:{
		usuario:   String,
		password:  String,
	}
});

 
/////////////////////////////////////////////////////////////////////////
/********** genero el flash para encriptar la contraseña  **************/
/////////////////////////////////////////////////////////////////////////
User.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


module.exports =  mongoose.model('User', User) 