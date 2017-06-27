import React, {Component}  from 'react';
import PropTypes         from 'prop-types';
import {Link}            from 'react-router-dom'; 
import Validation    from 'react-validation';
import validator     from 'validator';
import axios from 'axios';
import FontAwesome   from 'react-fontawesome';
import {Grid, Row, Col, Modal, Button} from "react-bootstrap";

 


export default class PreguntaSite extends Component {
  constructor(props){
    super(props);
    this.state ={
      nPreguntas:null,
      pregunta: 0,
      exitoso: false,
      fallo : false,
      pruebaId:null,
      dataPregunta:[]
    }  
    this.handleSubmit = this.handleSubmit.bind(this)
    this.anteriorPregunta = this.anteriorPregunta.bind(this)
    this.siguientePregunta = this.siguientePregunta.bind(this)
  }

  componentWillReceiveProps(nextProps) {
      this.setState({dataPregunta:nextProps.dataPregunta, pruebaId:nextProps.pruebaId, nPreguntas:nextProps.dataPregunta.length-1})
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RENDERIZO LAS PREGUNTAS, EN MEDIO DE UNA TABLA
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderPregunta(){
    const {dataPregunta, pregunta} = this.state;
    return dataPregunta.map((index, key)=>{
      return(
        <Row key={key}  style={{display: key==pregunta ? 'block' : 'none' }}>
          <form className={'as'+key}>
            <Col md={12}>
                <h2>{index.titulo}</h2>
            </Col>
            <Col md={3}>
                <label>1</label><input type="radio"/> 
            </Col>
            <Col md={3}>
                <label>2</label><input type="radio"/> 
            </Col>
            <Col md={3}>
                <label>3</label><input type="radio"/> 
            </Col>
            <Col md={3}>
                <label>4</label><input type="radio"/> 
            </Col>
          </form>  
        </Row>  
      )
    })
  }

  anteriorPregunta(){
   this.setState({pregunta:this.state.pregunta-1}) 
  }
  siguientePregunta(){
   this.setState({pregunta:this.state.pregunta+1}) 
  }
 
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RENDERIZO TODO LA PAGINA / LLAMO LOS ELEMENTOS DESDE LAS OTRAS FUNCIONES
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  render(){
    const {pregunta, nPreguntas} = this.state
    return(
      <Grid className="formulario">
        {this.renderPregunta()}
        <button onClick={this.anteriorPregunta.bind(this)} style={{display: pregunta==0 ? 'none' : 'block' }}>Anterior</button>
        <button onClick={this.siguientePregunta.bind(this)} style={{display: pregunta==nPreguntas ? 'none' : 'block' }}>Siguiente</button>
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


