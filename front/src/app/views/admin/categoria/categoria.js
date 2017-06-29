import React, {Component}  from 'react';
import PropTypes         from 'prop-types';
import {Link}            from 'react-router-dom'; 
import Validation    from 'react-validation';
import validator     from 'validator';
import axios from 'axios';
import FontAwesome   from 'react-fontawesome';
import {Grid, Row, Col, Modal, Button} from "react-bootstrap";
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import update from 'react-addons-update';



export default class Categoria extends Component {
  constructor(props){
    super(props);
    this.state ={
      exitoso: false,
      fallo : false,
      showModal: false,
      dataCategoria:[],
      dataCategoriaPadre:[],
      tipoUsuario:null,
      showModal:false,
      valuePadre:[{value:''}]
    }  
    this.handleSubmit = this.handleSubmit.bind(this)      ////// sube el formulario
    this.abreModal = this.abreModal.bind(this)            /////// abre el modal  
    this.close = this.close.bind(this)                    /////// cierra el modal
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dataCategoria:nextProps.dataCategoria, dataCategoriaPadre:nextProps.dataCategoriaPadre})
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RENDERIZO LAS PRUEBAS, EN MEDIO DE UNA TABLA
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderUsuarios(){
      const {dataCategoria} = this.state
      const columns = [{
        Header: 'Nombre',
        accessor: 'nombre' 
      }, {
        Header: 'Descripcion',
        accessor: 'descripcion'
        
      }, {
        Header: 'Categoria Padre',
        accessor: 'categoriaPadreId' 
      }]
    return(
      <ReactTable
        data={dataCategoria}
        columns={columns}
        filterable={true}
      />
    ) 
  }

  changeCategoriaPadre(valuePadre) {
    this.setState({ valuePadre });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RENDEREIZO EL PREVIEW DE LA IMAGEN CUANDO SE CARGA
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderModal(){
    const {tipoUsuario, showModal, dataCategoriaPadre} = this.state;
    return(
       <Modal show={showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Nueva Categoria</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <label htmlFor="nombre">Nombre </label>
              <input type="text" id="nombre" placeholder="nombre"></input>
              <label htmlFor="descripcion">Descripción </label>
              <input type="text" id="descripcion" placeholder="Descripción"></input>
              <label htmlFor="padre">Categoria Padre </label>
              <Select
                placeholder="Categoria Padre"
                name="categoriaPadre"
                options={dataCategoriaPadre}
                value={this.state.valuePadre}
                onChange={(e)=>this.changeCategoriaPadre(e)} 
              />
              
              <button type="submit" className="btn btn-site">Guardar </button>
            </form>
            
            <div className={this.state.fallo ? '' : 'esconder' } > No se pudo crear la categoria</div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Cerrar</Button>
          </Modal.Footer>
        </Modal>     
    )
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RENDERIZO TODO LA PAGINA / LLAMO LOS ELEMENTOS DESDE LAS OTRAS FUNCIONES
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  render(){
    return(
      <Grid>
        <Row>
          <Col md={9}>
            <h1>Categorias</h1> 
          </Col>
          <Col md={3}>
            <span onClick={this.abreModal.bind(this)}>+</span>
          </Col>
        </Row> 
        <Row > 
        {this.renderUsuarios()}
        </Row> 
        {this.renderModal()}
      </Grid>
    )
  }

  abreModal(e){
    this.setState({showModal:true}) 
  }
  close(){
    this.setState({showModal:false}) 
  }

 
 handleSubmit(e){
  e.preventDefault();
  var files = new FormData($('#formulario')[0]);
  let name      = $("#nombre").val();
  let descripcion    = $("#descripcion").val();
  let PadreId     = this.state.valuePadre.value;
  let categoriaPadreId     = this.state.valuePadre.label;

  // inserta la informacion 
  axios.post('/x/v1/cat/categoria', {name, descripcion, PadreId} )
  .then((response)=>{
   if (response.data.status=='SUCCESS') {
    let newData = update(this.state.dataCategoria, {$unshift:[{nombre:name, descripcion:descripcion,  categoriaPadreId: categoriaPadreId}]})
    this.setState({ dataCategoria: newData, showModal:false})
   }else{
    this.setState({ fallo: true})
   }
  })
  .catch((response)=>{
      console.log(response)
  })

 }

 
} 


