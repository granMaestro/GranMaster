
/////////////////////////
/*
librerias de reactjs
*/
/////////////////////////
import React, {Component} from 'react';
import axios from 'axios';



////////////////////////
/*
creo el componente
*/
/////////////////////////


export default class Test extends Component{
	constructor(props){
		super(props);
		this.submit = this.submit.bind(this)
	}
	render(){
		 
		return(
			<div>
			 <form onSubmit={this.submit.bind(this)} >
			 	<input type="text" placeholder="email" id="email"  />
			 	<input type="text" placeholder="password" id="password" />
			 	<input type="submit" value="enviar" />
			 </form>
			</div>	

		)
	}
	submit(e){
		e.preventDefault();
		let email = jQuery("#email").val()
		let password = jQuery("#password").val()

		axios.post('http://localhost:8080/x/v1/user/login', {email, password} )
		.then((respuesta)=>{
			console.log(respuesta.data)
		})	
		.catch((error)=>{
			console.log(error)
		})
	}
 
} 




/*1 - crear el componente
2 - crear la ruta
 2.1 - voy a index.js e importo el componente y luego lo export 	
3 - importar el componente en la ruta
la ruta esta en routes/MainRoutes.js*/