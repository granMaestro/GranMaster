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
					{icon:'', link:'/usuario',  texto:'Usuarios'},
					{icon:'', link:'/categoria', texto:'Categorias' },
					{icon:'', link:'/prueba',   texto:'Pruebas'},
					{icon:'', link:'/resultado', texto:'Resultados' },
					{icon:'', link:'/__',   texto:'-----SITIO------'},
					{icon:'', link:'/site_usuario',   texto:'Usuarios'},
					{icon:'', link:'/site_categoria', texto:'Categorias' },
					{icon:'', link:'/site_prueba',    texto:'Pruebas'},
					{icon:'', link:'/site_resultado', texto:'Resultados' }
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
			<div className={!this.state.animate ? "main-right main-right-hidden" : "main-right"} id="main-left">	
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