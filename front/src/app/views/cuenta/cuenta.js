import React, {Component}  from 'react';
import PropTypes         from 'prop-types';
import {Link}            from 'react-router-dom'; 

import Validation    from 'react-validation';
import validator     from 'validator';

import FontAwesome   from 'react-fontawesome';
import {Grid, Row, Col, FormGroup} from "react-bootstrap";


import AnimatedView   from '../../components/animatedView/AnimatedView';
import validation from '../../components/validate.jsx';



export default class Cuenta extends Component {
	constructor(props) {
		super(props)
	}
	renderItem() {
 
	}
	render() {
		return (
			<Grid className="cuenta-page"> 
				<Row> 
					<Col md={4}>
						<Link to='nuevo_libro'>
							<FontAwesome name="book"/>
							<p> PUBLICAR UN LIBRO </p>
						</Link>	
					</Col>
					<Col md={4}>
						<FontAwesome name="comments" />
						<p>COMENTARIOS</p>
					</Col>
					<Col md={4}>
						<FontAwesome name="search"/>
						<p>LO QUE ESTAN BUSCANDO</p>
					</Col>
				</Row>
			</Grid>	  
		);		
	}

 
  
};