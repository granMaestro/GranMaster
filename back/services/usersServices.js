'use strict';

let User = require('./../models/usersModel.js');

class userServices {
	get(callback){
		User.find({}, callback)
	}
	getEmail(user, callback){
		User.findOne({'local.email':user.email}, callback)
	}

	create(user, callback){ 
		var newUsuario = new User() 
		newUsuario.local.email =    user.email,
		newUsuario.local.token =    newUsuario.generateHash(user.email),
		newUsuario.local.status =   "Deactive"
		newUsuario.save(callback);	 

	}
	delete(){

	}
	verificaToken(token, callback){
		User.findOne({'local.email':token.email, 'local.token': token.token}, callback)
	}

	activaUsuario(user, callback){
		console.log(user)
		User.update({'local.email': user}, {'local.status':'Active'},  callback)
	}

}

module.exports = new userServices()