import React, {Component}  from 'react';
import PropTypes         from 'prop-types';
import {Link}            from 'react-router-dom'; 
import Validation    from 'react-validation';
import validator     from 'validator';
import axios from 'axios';
import FontAwesome   from 'react-fontawesome';
import {Grid, Row, Col, Modal, Button} from "react-bootstrap";

 


export default class Pregunta extends Component {
  constructor(props){
    super(props);
    this.state ={
      exitoso: false,
      fallo : false,
      pruebaId:null,
      dataPregunta:[]
    }  
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
      this.setState({dataPregunta:nextProps.dataPregunta, pruebaId:nextProps.pruebaId})
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RENDERIZO LAS PREGUNTAS, EN MEDIO DE UNA TABLA
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderPregunta(){
    return this.state.dataPregunta.map((index, key)=>{
      return(
        <Row key={key}>
          <Col md={8}>
              <h2>{index.titulo}</h2>
          </Col>
          <Col md={4}>
              <h2>{index.estado}</h2>
          </Col>
        </Row>  
      )
    })
  }

 
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RENDERIZO TODO LA PAGINA / LLAMO LOS ELEMENTOS DESDE LAS OTRAS FUNCIONES
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  render(){
    return(
      <Grid className="formulario">
        <Row>
          <form  onSubmit={this.handleSubmit.bind(this)} encType="multipart/form-data" id="formulario">
            <label htmlFor="titulo">Titulo </label>
            <input type="text" id="titulo" placeholder="Titulo"></input>
            <button type="submit" className="btn-site">Guardar </button>
          </form>
          <div className={this.state.exitoso ? '' : 'esconder' } > SE CREO LA CATEGORIA EXITOSAMENTE </div>
          <div className={this.state.fallo ? '' : 'esconder' } > NO SE PUDO CREAR LA CATEGORIA</div>
           
        </Row> 
        <Row>
          <Col md={8} >
              <h3>Titulo</h3>
          </Col>
          <Col md={4} >
              <h3>Estado</h3>
          </Col>
        </Row>  
        {this.renderPregunta()}
        
      </Grid>
    )
  }

 
 handleSubmit(e){
  e.preventDefault();
  let titulo   = $("#titulo").val();
  let estado   = 'Activo';
  let pruebaId = this.state.pruebaId

  // inserta la informacion 
  axios.post('/x/v1/pre/pregunta/', {titulo, estado, pruebaId} )
  .then((response)=>{
   if (response.data.status=='SUCCESS') {
    this.setState({ exitoso: true })
   }else{
    this.setState({ fallo: true})
   }
  })
  .catch((response)=>{
      console.log(response)
  })

 }

 
} 


