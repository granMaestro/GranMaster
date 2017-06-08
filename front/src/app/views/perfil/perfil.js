// @flow weak

import React, {PureComponent} from 'react';
import {Link} from 'react-router';


import Validation    from 'react-validation';
import validator     from 'validator';

import FontAwesome   from 'react-fontawesome';
import {Grid, Row, Col, FormGroup} from "react-bootstrap";
import axios    from "axios";  
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


import AnimatedView   from '../../components/animatedView/AnimatedView';
import validation from '../../components/validate.jsx';
 

export default class Perfil extends PureComponent {
  constructor(props) {
    super(props);
    this.state ={
        showMessajeSuccess:true,
        showMessajeFail:true,
        data:[],
        dateNacimiento: moment()
    }
    this.registro = this.registro.bind(this);
     this.handleChange = this.handleChange.bind(this);
  }

	componentWillReceiveProps(nextProps) {
		this.setState({data:nextProps.data})
	}

	handleChange(date) {
		this.setState({
			dateNacimiento: date
		});
	}
  
  render() {
    return(
      <AnimatedView> 
        <Grid className='registro-perfil'>
             
            <h1>ADMINISTRA TU INFORMACION PUBLICA <span></span>	</h1>
            <Row>
            	<Col md={2}>
            		foto
            	</Col>
            	<Col md={8}>
            	 <Validation.components.Form onSubmit={this.registro.bind(this)} className="form-horizontal">
            	{/* Nombre De Perfil */}
            		<FormGroup controlId="formInlineName">
						<label htmlFor="nombre" className="col-sm-3 control-label">Nombres</label>
						<div className="col-sm-9">
							<Validation.components.Input value='' type="text" placeholder="Nombres" name='nombre' className="form-control" validations={['required']} id="nombre"  />
							<FontAwesome name='pencil'/> 
						</div>	
					</FormGroup>
				{/* Contraseña */}
            		<FormGroup controlId="formInlineName">
						<label htmlFor="contrasena" className="col-sm-3 control-label">Contraseña</label>
						<div className="col-sm-9">
							<Validation.components.Input value='' type="password" placeholder="Contraseña"  className="form-control" name='password' validations={['required', 'password']} id="contrasena"  />
							<FontAwesome name='pencil'/> 
						</div>	
					</FormGroup>
					<FormGroup controlId="formInlineName">
						<label htmlFor="contrasena" className="col-sm-3 control-label">Confirmar Contraseña</label>
						<div className="col-sm-9">
							<Validation.components.Input value='' type="password" placeholder="Contraseña"  className="form-control" name='passwordConfirm' validations={['required', 'password']} id="contrasena" />
							<FontAwesome name='pencil'/> 
						</div>	
					</FormGroup>
				{/* Fecha de nacimiento */}
            		<FormGroup controlId="formInlineName">
						<label htmlFor="nacimiento" className="col-sm-3 control-label">Fecha de nacimiento</label>
						<div className="col-sm-9">
							 <DatePicker
								peekNextMonth
								showMonthDropdown
								showYearDropdown
								dropdownMode="select"
							 	className="form-control"
							 	dateFormat="YYYY/MM/DD"
								selected={this.state.dateNacimiento}
								onChange={this.handleChange}
							/>
							<FontAwesome name='pencil'/> 
						</div>	
					</FormGroup>
				{/* Sexo */}
            		<FormGroup controlId="formInlineName">
						<label htmlFor="sexo" className="col-sm-3 control-label">Sexo</label>
						<div className="col-sm-9">
						<Validation.components.Select value='' name='sexo' id="sexo" className="form-control"  validations={['required']}>
						    <option disabled>Sexo</option>
						    <option value='hombre'>Hombre</option>
						    <option value='mujer'>Mujer</option>
						</Validation.components.Select>
					 
							<FontAwesome name='pencil'/> 
						</div>	
					</FormGroup>
				{/* PAIS */}
					<FormGroup controlId="formInlineName">
						<label htmlFor="pais" className="col-sm-3 control-label">Pais</label>
						<div className="col-sm-9">
							<Validation.components.Input value='' type="text"  placeholder="Pais" name='pais' className="form-control" validations={['required']} id="pais" />
							<FontAwesome name='pencil'/> 	
						</div>
					</FormGroup>
				{/* CIUDAD */}
					<FormGroup controlId="formInlineName">
						<label htmlFor="cudad" className="col-sm-3 control-label">Ciudad</label>
						<div className="col-sm-9">
							<Validation.components.Input value='' type="text" placeholder="Ciudad" name='ciudad' className="form-control" validations={['required']} id="ciudad" />
							<FontAwesome name='pencil'/> 
						</div>
					</FormGroup>
				{/* DIRECCION */}
					<FormGroup controlId="formInlineName">
						<label htmlFor="direccion" className="col-sm-3 control-label">Dirección</label>
						<div className="col-sm-9">
							<Validation.components.Input value='' type="text" placeholder="Dirección" name='direccion' className="form-control" validations={['required']} id='direccion' />
							<FontAwesome name='pencil'/> 
						</div>
					</FormGroup>
				{/* TELEFONO */}
					<FormGroup controlId="formInlineName">
						<label htmlFor="telefono" className="col-sm-3 control-label">Telefono</label>
						<div className="col-sm-9">
							<Validation.components.Input value='' type="text" placeholder="Telefono" name='telefono' className="form-control" validations={['required']} id="telefono" />
							<FontAwesome name='pencil'/> 
						</div>	
					</FormGroup>
				{/* SOBRE MI */}
					<FormGroup controlId="formInlineName">
						<label htmlFor="sobreMi" className="col-sm-3 control-label">Sobre Mi</label>
						<div className="col-sm-9">
							<Validation.components.Textarea value='' placeholder="Sobre Mi" name='sobreMi' className="form-control" validations={['required']} id="sobreMi" />
							<FontAwesome name='pencil'/> 
						</div>
					</FormGroup>
				      
	               
		            <FormGroup controlId="formInlineName">
						<label htmlFor="sobreMi" className="col-sm-3 control-label"></label>
						<div className="col-sm-9">
							<button type="submit" className="btn-site">Registrarme </button> 
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

  registro(event) {
    event.preventDefault();  

    let email = this.state.data.email;
    let name = $("#nombre").val();
    let password = $("#contrasena").val();
    let nacimiento = this.state.dateNacimiento;
    let sexo = $("#sexo").val();
    let pais = $("#pais").val();
    let ciudad = $("#ciudad").val();
    let direccion = $("#direccion").val();
    let telefono = $("#telefono").val();
    let sobre_mi = $("#sobreMi").val();

    let data = {email, name, password, nacimiento, sexo, pais, ciudad, direccion, telefono, sobre_mi}
    axios.post("x/v1/user/sign_up_profile", data)
    .then((response) =>{
    	console.log(response.data)
    	if (response.data.status=='SUCCESS') {
    		this.setState({showMessajeFail: true, showMessajeSuccess: false}); 
    		setTimeout(function(){ window.location.href="/" }, 1800)	
    	}else{
    		this.setState({showMessajeSuccess: true, showMessajeFail: false})
    	}
    })
    .catch((err)=>{
      console.log(err)
    })
  }
}

 