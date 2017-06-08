// @flow weak

import React, {PureComponent} from 'react';
import {Link} from 'react-router';


import Validation    from 'react-validation';
import validator     from 'validator';

import FontAwesome   from 'react-fontawesome';
import {Grid, Row, Col, FormGroup} from "react-bootstrap";
import axios    from "axios";  


import AnimatedView   from '../../components/animatedView/AnimatedView';
import validation from '../../components/validate.jsx';
 

export default class Libro extends PureComponent {
  constructor(props) {
    super(props);
    this.state ={
        showMessajeSuccess:true,
        showMessajeFail:true,
        publicacion1:true,
        publicacion2:true,
        publicacion3:true
    }
    this.registro = this.registro.bind(this);
    
  } 
  render() {
    const {publicacion1, publicacion2, publicacion3} = this.state;
    return(
      <AnimatedView> 
        <Grid className='nuevo-libro'>
             
            <h1>PUBLICAR LIBRO<span></span> </h1>
            <Row>
   
              <Col md={9} xsOffset={1}>
               <Validation.components.Form onSubmit={this.registro.bind(this)} className="form-horizontal">
              {/* TITULO LIBRO */}
                <FormGroup controlId="formInlineName">
                  <label htmlFor="nombre" className="col-sm-3 control-label">Titulo libro</label>
                  <div className="col-sm-9">
                    <Validation.components.Input type="text" placeholder="Titulo Libro" name='nombre' className="form-control" validations={['required']} id="titulo" value='' />
                  </div>  
                </FormGroup>
              {/* AUTOR */}
                <FormGroup controlId="formInlineName">
                  <label htmlFor="contrasena" className="col-sm-3 control-label">Autor</label>
                  <div className="col-sm-9">
                    <Validation.components.Input value='' type="text" placeholder="Contraseña" name='contrasena' className="form-control" validations={['required']} id="contrasena" />
                  </div>  
                </FormGroup>
              {/* Fecha de nacimiento */}
                <FormGroup controlId="formInlineName">
                  <label htmlFor="nacimiento" className="col-sm-3 control-label">Genero</label>
                  <div className="col-sm-9">
                    <Validation.components.Input type="text" placeholder="Fecha Nacimiento" name='nacimiento' className="form-control" validations={['required']} id="nacimiento" value='' />
                  </div>  
                </FormGroup>
            {/* Sexo */}
                <FormGroup controlId="formInlineName">
                  <label htmlFor="categoria" className="col-sm-3 control-label">Categoria</label>
                  <div className="col-sm-9">
                    <Validation.components.Input value='' type="text" placeholder="Categoria" name='categoria' className="form-control" validations={['required']} id="categoria" value='' />
                  </div>  
                </FormGroup>
        {/* PAIS */}
          <FormGroup controlId="formInlineName">
            <label htmlFor="palabras" className="col-sm-3 control-label">Palabras Claves</label>
            <div className="col-sm-9">
              <Validation.components.Input value='' type="text"  placeholder="Pais" name='palabras' className="form-control" validations={['required']} id="pais" /> 
            </div>
          </FormGroup>
        {/* SOBRE MI */}
          <FormGroup controlId="formInlineName">
            <label htmlFor="sobreMi" className="col-sm-3 control-label">Descripción</label>
            <div className="col-sm-9">
              <Validation.components.Textarea value='' placeholder="Sobre Mi" name='sobreMi' className="form-control" validations={['required']} id="sobreMi" />
            </div>
          </FormGroup>
         {/* ESTADO DEL LIBRO */}
          <FormGroup controlId="formInlineName">
            <label htmlFor="estado" className="col-sm-3 control-label">Estado del libro</label>
            <div className="col-sm-9">
              <div className="radio">
                <label>
                  <input type="radio" value="Como Nuevo" name="estado" />
                  Como Nuevo
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="Poco Uso" name="estado"/>
                  Poco Uso
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="Usado" name="estado"/>
                  Usado
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="Muy Usado Pero Legible" name="estado"/>
                  Muy Usado Pero Legible
                </label>
              </div>
            </div>    
          </FormGroup>
          {/* SOBRE MI */}
          <FormGroup controlId="formInlineName">
            <label className="col-sm-3 control-label">Clase de publicación</label>
            <div className="col-sm-9" className="clase-publicacion">
              <span className={publicacion1 ? 'publicacion1' : 'publicacion1-focus'} onClick={(e)=>this.cambiaPublicacion(false,true,true)}></span>
              <span className={publicacion2 ? 'publicacion2' : 'publicacion2-focus'} onClick={(e)=>this.cambiaPublicacion(true,false,true)}></span>
              <span className={publicacion3 ? 'publicacion3' : 'publicacion3-focus'} onClick={(e)=>this.cambiaPublicacion(true,true,false)}></span>
            </div>
          </FormGroup>  
          {/* Precio */}
          <FormGroup controlId="formInlineName">
            <label htmlFor="precio" className="col-sm-3 control-label">Precio</label>
            <div className="col-sm-9">
              <Validation.components.Input value='' placeholder="Precio" name='precio' className="form-control" validations={['required']} id="precio" />
            </div>
          </FormGroup> 
                 
          <FormGroup controlId="formInlineName">
            <label htmlFor="sobreMi" className="col-sm-3 control-label"></label>
            <div className="col-sm-9">
              <button type="submit" className="btn-site">Crear </button> 
            </div>
          </FormGroup>


          <FormGroup controlId="formInlineName">
            <label htmlFor="sobreMi" className="col-sm-3 control-label"></label>
            <div className="col-sm-9">
              <div className={this.state.showMessajeSuccess ? 'message-hidden': 'message' }>
            Tu Usuario ha sido actualizado 
          </div>
          <div className={this.state.showMessajeFail ? 'message-hidden' : 'message' }>
            Error al guardar los datos
          </div> 
            </div>
          </FormGroup> 
                </Validation.components.Form>
              </Col>     
        </Row>        
        </Grid> 
      </AnimatedView>
    );
  }


  cambiaPublicacion(val1, val2, val3) {
    this.setState({publicacion1:val1, publicacion2:val2, publicacion3:val3  })
  }
  registro(event) {
    event.preventDefault();  

 
    let name = $("#nombre").val();
    let password = $("#contrasena").val();
    let nacimiento = $("#nacimiento").val();
    let sexo = $("#sexo").val();
    let pais = $("#pais").val();
    let ciudad = $("#ciudad").val();
    let direccion = $("#direccion").val();
    let telefono = $("#telefono").val();
    let sobre_mi = $("#sobreMi").val();

    let data = {email, name, password, nacimiento, sexo, pais, ciudad, direccion, telefono, sobre_mi}
    console.log(data)
    axios.post("x/v1/user/sign_up_profile", data)
    .then((response) =>{
      console.log(response.data)
      response.data.status=='SUCCESS' 
        ? this.setState({showMessajeFail: true, showMessajeSuccess: false}) 
        : this.setState({showMessajeSuccess: true, showMessajeFail: false})
    })
    .catch((err)=>{
      console.log(err)
    })
  }
}

 