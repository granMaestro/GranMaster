import React, {Component}  from 'react';
import PropTypes         from 'prop-types';
import {Link}            from 'react-router'; 
import Validation    from 'react-validation';
import validator     from 'validator';
import axios from 'axios';
import FontAwesome   from 'react-fontawesome';
import {Grid, Row, Col, Modal, Button} from "react-bootstrap";

import AnimatedView   from '../../components/animatedView/AnimatedView';
import validation from '../../components/validate.jsx';

 

export default class Categoria extends Component {
	constructor(props) {
		super(props);
		this.state= {
			showModal:false,
			file: '',imagePreviewUrl: '',
			data: [],
			dataFiltro: []
		}
		this.showModal = this.showModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.name = this.name.bind(this)
		this.descripcion = this.descripcion.bind(this)
		this.handleImageChange = this.handleImageChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)

	
	}
	componentWillReceiveProps(nextProps) {
		this.setState({data:nextProps.data})
	}
	renderItem() {
		const {data} = this.state;
		return data.map((index, key)=>{
			return(
	 			<Col md={4} key={key}>
	 				<div>
	 					<div style={{background:"url('http://img14.deviantart.net/1589/i/2015/141/7/2/propuesta_de_portada_para_el_libro_de_pinocho_by_rojomaster55-d8u8cfp.jpg')"}}>
	 					</div>		
						<h2> {index.name} </h2>
						<p> {index.descripcion} </p>
					</div>	
				</Col>
	 		)
		})
 		
	}

	render() {
	 	
		return (
			<Grid className="categoria-page"> 
			    <Row> 
			    	<Col md={4}>
			    		<h1>CATEGORIAS </h1>
			    	</Col>
			    	<Col md={1} xsOffset={7}>
			    		<FontAwesome name="plus" className="add" onClick={this.showModal.bind(this)} />
			    	</Col>
			    </Row>		
			    <Row>
					{
						this.renderItem()
					}
				</Row>
					{
				     	this.renderModal()
				    }
			</Grid>	  
		);		
	}

	renderModal(){
		let {imagePreviewUrl} = this.state;
		let $imagePreview = null;
			if (imagePreviewUrl) {
		$imagePreview = (<img src={imagePreviewUrl} />);
			} else {
		$imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
		}
		return(
			<Modal show={this.state.showModal} onHide={this.closeModal.bind(this)} className="categoria-modal">
				<Validation.components.Form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal">
				<Modal.Header closeButton>
					<Modal.Title>Nueva Categoria</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					
            			{/* Nombre De Perfil */}
						<Validation.components.Input value='' type="text" placeholder="Nombre" name='categoria' className="form-control" validations={['required']} id="nombre" onChange={this.name.bind(this)}  />
						 	
						{/* Nombre De Perfil */} 
						<Validation.components.Textarea value='' type="text" placeholder="Descripcion" name='descripcion' className="form-control" validations={['required']} id="nombre" onChange={this.descripcion.bind(this)}  />

						<input className="fileInput" type="file" onChange={(e)=>this.handleImageChange(e)} id="photo" name="photo"/>
						 	
					
					 <div className="imgPreview">
						{$imagePreview}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<button type="submit" className="btn-site">Registrarme </button>
					<Button onClick={this.closeModal.bind(this)}>Close</Button>
				</Modal.Footer>
				</Validation.components.Form>
			</Modal>
        )
	}
	handleImageChange(e) {
	    e.preventDefault();
	    this.setState({photo: e.target.value});
	    let reader = new FileReader();
	    let file = e.target.files[0];

	    reader.onloadend = () => {
	      this.setState({
	        file: file,
	        imagePreviewUrl: reader.result
	      });
	    }

	    reader.readAsDataURL(file)
	  }
	name(e){
    	this.setState({name: e.target.value});
  	}
	descripcion(e){
		this.setState({descripcion: e.target.value});
	}
	showModal(){
		this.setState({showModal:true})
	}
	closeModal() {
		this.setState({ showModal: false });
	}
	handleSubmit(e) {
		e.preventDefault()
		let name = this.state.name;
		let slug = this.state.name;
		let descripcion = this.state.descripcion;
		let photo = this.state.photo;
		let data = {name, descripcion, photo}
	    console.log(data)
	    axios.post("x/v1/cat/categorias", data)
	    .then((response) =>{
	    	console.log(response.data)
	      /*response.data.status=='SUCCESS' 
	        ? this.setState({showMessajeFail: true, showMessajeSuccess: false}) 
	        : this.setState({showMessajeSuccess: true, showMessajeFail: false})*/
	    })
	    .catch((err)=>{
	      console.log(err)
	    })
	    this.setState({data: this.state.data.concat({name:name, descripcion:descripcion}), showModal: false  })
	}
};