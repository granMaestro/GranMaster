import React, {Component}  from 'react';
import PropTypes         from 'prop-types';
import {Link}            from 'react-router-dom'; 
import Validation    from 'react-validation';
import validator     from 'validator';
import axios from 'axios';
import FontAwesome   from 'react-fontawesome';
import {Grid, Row, Col, Modal, Button} from "react-bootstrap";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import update from 'react-addons-update';


export default class Pregunta extends Component {
  constructor(props){
    super(props);
    this.state ={
      exitoso: false,
      fallo : false,
      pruebaId:null,
      dataPregunta:[],
      dataCategoria:[]
    }  
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeCategoria = this.changeCategoria.bind(this)
  }

  componentWillReceiveProps(nextProps) {
      this.setState({dataPregunta:nextProps.dataPregunta, pruebaId:nextProps.pruebaId, dataCategoria: nextProps.dataCategoria})
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RENDERIZO LAS PREGUNTAS, EN MEDIO DE UNA TABLA
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderPregunta(){
    return this.state.dataPregunta.map((index, key)=>{
      return(
        <Row key={key}>
          <Col md={4}>
              <p>{index.titulo}</p>
          </Col>
          <Col md={4}>
              <p>{index.name}</p>
          </Col>
          <Col md={4}>
              <p>{index.estado}</p>
          </Col>
        </Row>  
      )
    })
  }

 
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RENDERIZO TODO LA PAGINA / LLAMO LOS ELEMENTOS DESDE LAS OTRAS FUNCIONES
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  render(){
    const {dataCategoria} = this.state
    return(
      <Grid className="formulario">
        <Row>
          <form  onSubmit={this.handleSubmit.bind(this)} encType="multipart/form-data" id="formulario">
            <label htmlFor="titulo">Titulo </label>
            <Select
                placeholder="Categoria"
                name="categoriaPadre"
                options={dataCategoria}
                value={this.state.valueCategoria}
                onChange={(e)=>this.changeCategoria(e)} 
              />
            <input type="text" id="titulo" placeholder="Titulo"></input>
            <button type="submit" className="btn-site">Guardar </button>
          </form>
          <div className={this.state.exitoso ? '' : 'esconder' } > SE CREO LA CATEGORIA EXITOSAMENTE </div>
          <div className={this.state.fallo ? '' : 'esconder' } > NO SE PUDO CREAR LA CATEGORIA</div>
           
        </Row> 
        <Row>
          <Col md={4} >
              <h3>Titulo</h3>
          </Col>
          <Col md={4} >
              <h3>Categoria</h3>
          </Col>
          <Col md={4} >
              <h3>Estado</h3>
          </Col>
        </Row>  
        {this.renderPregunta()}
        
      </Grid>
    )
  }

  changeCategoria(valueCategoria) {
    this.setState({ valueCategoria });
  }
 
 handleSubmit(e){
  e.preventDefault();
  let titulo   = $("#titulo").val();
  let estado   = 'Activo';
  let pruebaId = this.state.pruebaId
  let CategoriaId = this.state.valueCategoria.value
  let CategoriaValue = this.state.valueCategoria.label

  // inserta la informacion 
  axios.post('/x/v1/pre/pregunta/', {titulo, estado, pruebaId, CategoriaId} )
  .then((response)=>{
   if (response.data.status=='SUCCESS') {
    let newData = update(this.state.dataPregunta, {$unshift:[{titulo:titulo, estado:estado,  name: CategoriaValue }]})
    this.setState({ dataPregunta: newData, showModal:false})
   }else{
    this.setState({ fallo: true})
   }
  })
  .catch((response)=>{
      console.log(response)
  })

 }

 
} 


