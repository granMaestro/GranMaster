
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
		super(props)
		this.state={
			datos:[]
		}

		////////////////////////////////////////////////////
		//* me conecto al servicio *//	
		////////////////////////////////////////////////////
		axios.get('http://localhost:8080/x/v1/cat/categorias')
		.then((respuesta)=>{
			console.log(respuesta.data)
			this.setState({datos:respuesta.data})
		})
		///////////////////////////////////////////////////
	this.actualizar = this.actualizar.bind(this)
	}
	render(){
		console.log(this.state.datos)
		return(
			<h1 onClick={this.actualizar.bind(this)}>
				{this.state.datos.status} 
			</h1>	

		)
	}
	actualizar(){
		this.setState({prueba: 2345678})
	}
 
} 




/*1 - crear el componente
2 - crear la ruta
 2.1 - voy a index.js e importo el componente y luego lo export 	
3 - importar el componente en la ruta
la ruta esta en routes/MainRoutes.js*/