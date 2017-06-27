import React, {PureComponent}    from "react"; 
import axios    from "axios"; 
import Prueba 	from './prueba'

export default class actionPrueba extends PureComponent {
	constructor(props) {
		super(props);
		this.state ={
			dataPrueba:[]
		}

	}

  componentWillMount() {
     axios.get("/x/v1/pru/prueba")
    .then((response)=>{
      this.setState({dataPrueba: response.data.prueba})
    })
    .catch((err)=>{
      console.log(err)
    }) 
  }
  render(){
  	return(
      <Prueba dataPrueba={this.state.dataPrueba} />
  	 
  	)
  }
}