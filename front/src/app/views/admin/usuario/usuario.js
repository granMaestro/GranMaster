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
    this.handleSubmit = this.handleSubmit.bind(this)                  ////// sube el formulario                 
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
 {/*formulario root*/}
            {tipoUsuario=='Root217'
            ?<form onSubmit={this.handleSubmit.bind(this)}>
              <label htmlFor="nombre">nombre </label>
              <input type="text" className="form-control" id="nombre" placeholder="nombre"></input>
              <label htmlFor="apellido">apellido </label>
              <input type="text" className="form-control" id="apellido" placeholder="apellido"></input>
              <label htmlFor="usuario">usuario </label>
              <input type="text" className="form-control" id="usuario" placeholder="usuario"></input> 
              <label htmlFor="email">email </label>
              <input type="text" className="form-control" id="email" placeholder="email"></input>
              <button type="submit" className="btn btn-site">Guardar </button>
            </form>
/*formulario administrador*/
            :tipoUsuario=='Admin324'
            ?<form onSubmit={this.handleSubmit.bind(this)}>  
                <label htmlFor="nombre" className="">nombre:</label>
                <input type="text" className="form-control" id="nombre" placeholder="nombre"></input>             
                <label htmlFor="apellido" className="">apellido:</label>
                <input type="text" className="form-control" id="apellido" placeholder="apellido"></input>
                <label htmlFor="documento" className="">documento:</label>
                <input type="text" className="form-control" id="documento" placeholder="documento"></input>
                <label htmlFor="option">Tipo De Documento</label> 
                <select className="form-control" id="option">
                  <option value="0">Tipo De Documento</option>
                  <option value="Cedula De Ciudadania">Cedula De Ciudadania</option>
                  <option value="Cedula Extranjera">Cedula Extranjera</option>
                  <option value="Tarjeta De Identidad">Tarjeta De Identidad</option>
                  <option value="Nit">Nit</option>
                </select>
                <h5><b>Fecha De Nacimiento</b></h5>
                  <DatePicker className="calendario"
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                  />
                <div className="form-group">
                  <label htmlFor="option">Sexo</label> 
                  <select className="form-control" id="option">
                    <option value="0">Sexo</option>
                    <option value="Hombre">Hombre</option>
                    <option value="Mujer">Mujer</option>
                  </select>
                </div>
                <label htmlFor="pais" className="">pais:</label>
                <input type="text" className="form-control" id="pais" placeholder="pais"></input>
                <label htmlFor="ciudad" className="">ciudad:</label>
                <input type="text" className="form-control" id="ciudad" placeholder="ciudad"></input>
              <button className="btn btn-primary">Registrate</button>
            </form>
/*fomulario suscritor"profesor"*/
            :tipoUsuario=='Sus937'
            ?<form onSubmit={this.handleSubmit.bind(this)}>
                <label htmlFor="nombre" className="">nombre:</label>
                <input type="text" className="form-control" id="nombres" placeholder="nombres"></input>            
                <label htmlFor="apellido" className="">apellido:</label>
                <input type="text" className="form-control" id="apellidos" placeholder="apellidos"></input>
                <label htmlFor="documento" className="">documento:</label>
                <input type="text" className="form-control" id="documento" placeholder="documento"></input>
               

              <div className="form-group">
                <label htmlFor="option">Tipo De Documento</label> 
                <select className="form-control" id="option">
                  <option value="0">Tipo De Documento</option>
                  <option value="Cedula De Ciudadania">Cedula De Ciudadania</option>
                  <option value="Cedula Extranjera">Cedula Extranjera</option>
                  <option value="Tarjeta De Identidad">Tarjeta De Identidad</option>
                  <option value="Nit">Nit</option>
                </select>
              </div>

              <h5><b>Fecha De Nacimiento</b></h5>
              <DatePicker className="calendario"
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
              />

              <div className="form-group">
                <label htmlFor="option">Sexo</label> 
                <select className="form-control" id="option">
                  <option value="0">Sexo</option>
                  <option value="Hombre">Hombre</option>
                  <option value="Mujer">Mujer</option>
                </select>
              </div>

                <label htmlFor="pais" className="">pais:</label>
                <input type="text" className="form-control" id="pais" placeholder="pais"></input>
                <label htmlFor="ciudad" className="">ciudad:</label>
                <input type="text" className="form-control" id="ciudad" placeholder="ciudad"></input>
                <label htmlFor="institucion-educativa" className="">institucion educativa:</label>
                <input type="text" className="form-control" id="institucion educativa" placeholder="institucion educativa"></input>
                <label htmlFor="area" className="">especialidad/area:</label>
                <input type="text" className="form-control" id="especialidad/area" placeholder="especialidad/area"></input>
                <label htmlFor="contacto" className="">direccion de dontacto:</label>
                <input type="text" className="form-control" id="direccion de dontacto" placeholder="direccion de dontacto"></input>
                <label htmlFor="telefono" className="">telefono:</label>
                <input type="text" className="form-control" id="telefono" placeholder="telefono"></input>
                <label htmlFor="email" className="">email</label>    
                <input type="text" className="form-control" id="email" placeholder="email"></input>           
                <label htmlFor="provados" className="">usuarios aprovados:</label>
                <input type="text" className="form-control" id="usuarios aprovados" placeholder="usuarios aprovados"></input>
                <label htmlFor="valor" className="">valor por usuario:</label>
                <input type="text" className="form-control" id="valor por usuario" placeholder="valor por usuario"></input>
                <label htmlFor="convenio" className="">valor unico-convenio:</label>
                <input type="text" className="form-control" id="valor unico-convenio" placeholder="valor unico-convenio"></input>
              <button className="btn btn-primary">Registrate</button>
           
             </form>
/*fumulario estudiante*/
            :tipoUsuario=='pac745'
            ?<form onSubmit={this.handleSubmit.bind(this)}>
                <label htmlFor="nombre" className="">Nombres:</label>
                <input type="text" className="form-control" id="Nombres" placeholder="Nombres"/>
                <label htmlFor="nombre" className="">Apellidos:</label>
                <input type="text" className="form-control" id="Apellidos" placeholder="Apellidos"/>
                <label htmlFor="nombre" className="">Numero De Documento:</label>
                <input type="text" className="form-control" id="Documento" placeholder="Numero De Documento"/>
          
                    <div className="form-group">
                      <label htmlFor="option">Tipo De Documento</label> 
                      <select className="form-control" id="option">
                        <option value="0">Tipo De Documento</option>
                        <option value="Cedula De Ciudadania">Cedula De Ciudadania</option>
                        <option value="Cedula Extranjera">Cedula Extranjera</option>
                        <option value="Tarjeta De Identidad">Tarjeta De Identidad</option>
                        <option value="Nit">Nit</option>
                      </select>
                    </div>

                    <h5><b>Fecha De Nacimiento</b></h5>
                    <DatePicker className="calendario"
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    />
                    <div className="form-group">
                      <label htmlFor="option">Sexo</label> 
                      <select className="form-control" id="Sexo">
                        <option value="0">Sexo</option>
                        <option value="Hombre">Hombre</option>
                        <option value="Mujer">Mujer</option>
                      </select>
                    </div>
          
                    <label htmlFor="nombre" className="">Pais:</label>
                    <input type="text" className="form-control" id="Pais" placeholder="Pais"/>
                    <label htmlFor="nombre" className="">Ciudad:</label>
                    <input type="text" className="form-control" id="Ciudad" placeholder="Ciudad"/>
                    <label htmlFor="nombre" className="">Institucion Educativa</label>
                    <input type="text" className="form-control" id="Institucion Educativa" placeholder="Institucion Educativa"/>
                  
                    <div className="form-group">
                      <label htmlFor="option">Grado:</label> 
                      
                      <select className="form-control" id="option">
                        <option value="0">Grado</option>
                        <option value="">Cero</option>
                        <option value="">Primero</option>
                        <option value="">Segundo</option>
                        <option value="">Tercero</option>
                        <option value="">Cuarto</option>
                        <option value="">Quinto</option>
                        <option value="">Sexto</option>
                        <option value="">Septimo</option>
                        <option value="">Octavo</option>
                        <option value="">Noveno</option>
                        <option value="">Decimo</option>
                        <option value="">Once</option>
                        
                      </select>
                    </div>

         
                    <label htmlFor="nombre" className="">Email:</label>
                    <input type="text" className="form-control" id="Email" placeholder="Email"/>
                  

                    <h3><b>Acompañante</b></h3>
                  
                    <label htmlFor="nombre" className="">Nombre Del Acompañante:</label>
                    <input type="text" className="form-control" id="NAcompañante" placeholder="Nombre Del Acompañante"/>
                    <label htmlFor="nombre" className="">Apellidos Del Acompañante:</label>
                    <input type="text" className="form-control" id="AAcompañante" placeholder="Apellidos Del Acompañante"/>
                    <label htmlFor="nombre" className="">Parentesco:</label>
                    <input type="text" className="form-control" id="Parentesco" placeholder="Parentesco"/>
                    <label htmlFor="nombre" className="">Telefono Del Acompañante:</label>
                    <input type="text" className="form-control" id="TAcompañante" placeholder="Telefono Del Acompañante"/>
                    <label htmlFor="nombre" className="">Email Del Acompañante:</label>
                    <input type="text" className="form-control" id="EAcompañante" placeholder="Email Del Acompañante"/>
                  
                  <button className="btn btn-primary">Registrate</button>
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
      <Grid className="pagina-usuario">
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


