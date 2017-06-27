import React, {Component}  from 'react';
import PropTypes         from 'prop-types';
import {Link}            from 'react-router-dom'; 
 
import axios from 'axios';
import FontAwesome   from 'react-fontawesome';
import {Grid, Row, Col, Modal, Button} from "react-bootstrap";



export default class PruebaSite extends Component {
  constructor(props){
    super(props);
    this.state ={
      dataPrueba:[]
    }  
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dataPrueba:nextProps.dataPrueba})
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RENDERIZO LAS PRUEBAS, EN MEDIO DE UNA TABLA
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderPruebas(){
    return this.state.dataPrueba.map((index, key)=>{
      let background = 'public/uploads/prueba/'+index._id+'.'+index.imagen;
      return(
        <Col md={4} key={key}>
          <Link to={"site_pregunta/?pruebaId="+index._id}>
            <span style={{background:"url('"+background+"')"}}></span>
            <h2>{index.name}</h2>
            <p>{index.descripcion}</p>
          </Link>  
        </Col>
      )
    })
  }

 

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RENDERIZO TODO LA PAGINA / LLAMO LOS ELEMENTOS DESDE LAS OTRAS FUNCIONES
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  render(){
    return(
      <Grid className="formulario">
        <Row className="listado-pruebas"> 
        {this.renderPruebas()}
        </Row> 
      </Grid>
    )
  }

} 


