'use strict';

/////////////////////////////////////////////////////////////////////////
/***** importo mongoose para el modelado de la base de datos  **********/
/***** importo bcrypt  para la encriptacion de la contraseña  **********/
/////////////////////////////////////////////////////////////////////////
let mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


/////////////////////////////////////////////////////////////////////////
/********** genero la base la coleccion llamada users   ****************/
/////////////////////////////////////////////////////////////////////////
let UserSchema = mongoose.Schema({
	local:{
		name:        String,
		email:       String,
		password:    String,
		status:      String,
		token:       String,
		nacimiento : String,
		sexo :       String,
		sobre_mi:    String,
		pais:        String,
		ciudad:      String,
		direccion:   String,
		telefono:    String,
		createdAt:   { type: Date, default: Date.now },
		updatedAt:   { type: Date, default: Date.now }
	}
});

 
/////////////////////////////////////////////////////////////////////////
/********** genero el flash para encriptar la contraseña  **************/
/////////////////////////////////////////////////////////////////////////
UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


module.exports =  mongoose.model('User', UserSchema) 