import React, {PureComponent}    from "react"; 
import axios    from "axios"; 
import PruebaSite 	from './prueba'

export default class actionPruebaSite extends PureComponent {
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
      <PruebaSite dataPrueba={this.state.dataPrueba} />
  	 
  	)
  }
}