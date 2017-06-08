import React, {Component}  from 'react';
import PropTypes         from 'prop-types';
import {Link, NavLink}            from 'react-router-dom'; 
//import {IndexLink} from 'react-router';

import FontAwesome       from 'react-fontawesome';

import Humburger     from './humburger/Humburger';
 


export default class Main extends Component {
	constructor(props) {
		super(props)
		this.state = {
			itemsNav:[
					{icon:'', link:'/cuenta', texto:'Tu Cuenta'},
					{icon:'', link:'/seguidores', texto:'Seguidores' },
					{icon:'', link:'/libros_publicados', texto:'Libros Publicados'},
					{icon:'', link:'/libros_buscas', texto:'Libros que Buscas'},
					{icon:'', link:'/libros_buscan', texto:'Libros que Buscan' },
					{icon:'', link:'/comentarios', texto:'Comentarios' },
					{icon:'', link:'/calificaciones', texto:'Calificaciones' },
					{icon:'', link:'/novedades', texto:'Novedades' },
					{icon:'', link:'/categoria', texto:'Categorias' }
				],
			animate:false
		}		

		this.updateMain = this.updateMain.bind(this)
	}
	renderItem() {
		return this.state.itemsNav.map(function(item, key){
			return(
				<li className="my-li-nav" key={key}>
          		<NavLink exact to={item.link} className="link-a" activeClassName="active">{item.texto}</NavLink>
      	</li>	
			)
		})
	}
	render() {
		return (
			<div className={!this.state.animate ? "main-right main-right-hidden" : "main-right"}>	
				<FontAwesome name='bars' className="bars-icon" onClick={this.updateMain.bind(this)} /> 
		    <div > 
			    <ul>
			      {
			      	this.renderItem()
			      }
			    </ul>
		    </div>
		  </div>  
		);		
	}

	updateMain(){
		if (!this.state.animate) {
			this.setState({animate:true})	
		}else{
			this.setState({animate:false})
		}
		
	}
  
};