import React, {PureComponent}    from "react"; 
import axios    from "axios"; 
import Categoria 	from './categoria'

export default class actionCategoria extends PureComponent {
	constructor(props) {
		super(props);
		this.state ={
			data:[]
		} 

	}

  componentWillMount() {
    axios.get("http://localhost:8080/x/v1/cat/categorias")
    .then((response)=>{
 
      this.setState({data:response.data.categoria})
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  render(){
  	return(
  		<Categoria data={this.state.data} />
  	)

  }
}