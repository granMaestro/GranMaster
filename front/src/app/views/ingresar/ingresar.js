// @flow weak

import React, {PureComponent} from 'react';
import Validation from 'react-validation';
import validator from 'validator';
import {Link} from 'react-router-dom';
import axios from "axios";

import AnimatedView   from '../../components/animatedView/AnimatedView';
import validation from '../../components/validate.jsx';
 

import logo  from './logo_azul.png';

export default class Ingresar extends PureComponent {
  constructor(props) {
    super(props);
    this.state ={
        showMessajeSuccess:true,
        showMessajeFail:true,
    }
    this.registro = this.registro.bind(this);
  }
  
  render() {

    return(
      <AnimatedView> 
        <div className='registro-container'>
           
            <img src={logo} /> 
            <h1>Comparte el amor por los libros</h1>
            <br /><br /><br />

            <p>Ingresa Con</p>
            <p>O</p>
            <p>Inicia Sesión con tu dirección de email</p>
            <Validation.components.Form onSubmit={this.registro.bind(this)}>    
              <div className="form-group">
                <Validation.components.Input type="text" value='' validations={['required', 'email']} placeholder="Ingresa tu correo electronico" name='email' className="form-control" onChange={this.email.bind(this)} />
                <Validation.components.Input type="password" value='' validations={['required']} placeholder="contraseña" name='password' className="form-control" onChange={this.pass.bind(this)} />
              </div>
 
              <div className={this.state.showMessajeFail ? 'message-hidden' : 'message' }>
                este Email ya existe, 
                <Link to="ingresar"> Inicia Sesion </Link>
                   O
                <Link to="recuperar"> Recupera tu contraseña </Link>
              </div> 
              <button type="submit" className="btn-site">Registrarme </button>
            </Validation.components.Form>
        </div> 
      </AnimatedView>
    );
  }


  email(e){
    this.setState({email: e.target.value});
  }
  pass(e){
    this.setState({password: e.target.value});
  }
  registro(event) {
    event.preventDefault();  
    let email = this.state.email
    let password = this.state.password
    let data = {email,password}

    axios.post("x/v1/user/login", data)
    .then((response) =>{
      console.log(response.data)
      response.data.status=='SUCCESS' 
        ? window.location.href = '/' 
        : this.setState({showMessajeFail: false}) 
    })
    .catch((err)=>{
      console.log(err)
    })
  }
}

 
