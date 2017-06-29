import React, {Component}  from 'react';
import PropTypes         from 'prop-types';
import {Link}            from 'react-router-dom'; 
import Validation    from 'react-validation';
import validator     from 'validator';
import axios from 'axios';
import FontAwesome   from 'react-fontawesome';
import {Grid, Row, Col, Modal, Button} from "react-bootstrap";
import ReactTable from 'react-table'
import update from 'react-addons-update';
import 'react-table/react-table.css'


export default class Usuario extends Component {
  constructor(props){
    super(props);
    this.state ={
      exitoso: false,
      fallo : false,
      showModal: false,
      file: '',imagePreviewUrl: '',
      dataUsuario:[],
      tipoUsuario:null,
      showModal:false
    }  
    this.handleSubmit = this.handleSubmit.bind(this)                   ////// sube el formulario
    this.handleImageChange = this.handleImageChange.bind(this)         ////// carga el preview de la imagen
    this.ActualizaTipoUsuario = this.ActualizaTipoUsuario.bind(this)  /////// abre el modal y actualiza el estado del tipo de usuario
    this.close = this.close.bind(this)                                /////// cierra el modal
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.dataUsuario)
    this.setState({dataUsuario:nextProps.dataUsuario})
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RENDERIZO LAS PRUEBAS, EN MEDIO DE UNA TABLA
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderUsuarios(){
      const {dataUsuario} = this.state
      const columns = [{
        Header: 'Nombre',
        accessor: 'nombre' 
      }, {
        Header: 'Email',
        accessor: 'email'
        
      }, {
        Header: 'Usuario',
        accessor: 'usuario'
        
      }, {
        Header: 'Role',
        accessor: 'tipo'
        
      }]
    return(
      <ReactTable
        data={dataUsuario}
        columns={columns}
        filterable={true}
      />
    ) 
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RENDEREIZO EL PREVIEW DE LA IMAGEN CUANDO SE CARGA
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderImagenPreview(){
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
      if (imagePreviewUrl) {
    $imagePreview = (<img src={imagePreviewUrl} />);
      } else {
    $imagePreview = (<div className="previewText"> </div>);
    }
    return(
      <div className="imgPreview">
        {$imagePreview}
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // RENDEREIZO EL PREVIEW DE LA IMAGEN CUANDO SE CARGA
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderModal(){
    const {tipoUsuario, showModal} = this.state;
    return(
       <Modal show={showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Nuevo Usuario tipo : {tipoUsuario=='Root217' ? 'Root' : tipoUsuario=='Admin324' ? 'Administrador' : tipoUsuario=='Sus937' ? 'Suscriptor' : tipoUsuario=='pac745' ? 'Paciente' : 'Padre' }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {tipoUsuario=='Root217'
            ?<form onSubmit={this.handleSubmit.bind(this)}>
              <label htmlFor="nombre">nombre </label>
              <input type="text" id="nombre" placeholder="nombre"></input>
              <label htmlFor="apellido">apellido </label>
              <input type="text" id="apellido" placeholder="apellido"></input>
              <label htmlFor="usuario">usuario </label>
              <input type="text" id="usuario" placeholder="usuario"></input> 
              <label htmlFor="email">email </label>
              <input type="text" id="email" placeholder="email"></input>
              <button type="submit" className="btn btn-site">Guardar </button>
            </form>
            :null
            }
            <div className={this.state.fallo ? '' : 'esconder' } > Este Usuario ya existe</div>
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
            <h1>USUARIOS</h1> 
          </Col>
          <Col md={3}>
            <select className="form-control" onChange={this.ActualizaTipoUsuario.bind(this)}>
              <option>Nuevo Usuario</option>
              <option value="Root217">Root</option>
              <option value="Admin324">Administrador</option>
              <option value="Sus937">Suscriptor</option>
              <option value="pac745">Paciente</option>
              <option value="Pad546">Padre</option>
            </select>
          </Col>
 

        </Row> 
        <Row > 
        {this.renderUsuarios()}
        </Row> 
        {this.renderModal()}
      </Grid>
    )
  }

  ActualizaTipoUsuario(e){
    this.setState({showModal:true, tipoUsuario:e.target.value}) 
  }
  close(){
    this.setState({showModal:false}) 
  }

  handleImageChange(e) {
    this.setState({photo:e.target.files[0] });
    let reader = new FileReader();
    let file =e.target.files[0] ;
    reader.onloadend = () => {
      this.setState({file: file, imagePreviewUrl: reader.result });
    }
    reader.readAsDataURL(file)
  }
 handleSubmit(e){
  e.preventDefault();
  var files = new FormData($('#formulario')[0]);
  let nombre      = $("#nombre").val();
  let apellido    = $("#apellido").val();
  let usuario     = $("#usuario").val();
  let email       = $("#email").val();
  let tipo        = 'Root217' ;
  let password        = $("#usuario").val();


  // inserta la informacion 
  axios.post('/x/v1/user/sign_up', {nombre, apellido, usuario, email, tipo, password} )
  .then((response)=>{
   if (response.data.status=='SUCCESS') {
    let newData = update(this.state.dataUsuario, {$unshift:[{nombre:nombre, email:email,  usuario: usuario}]})
    this.setState({ fallo: true, dataUsuario: newData, showModal:false})
   }else{
    this.setState({ fallo: true})
   }
  })
  .catch((response)=>{
      console.log(response)
  })

 }

 
} 


