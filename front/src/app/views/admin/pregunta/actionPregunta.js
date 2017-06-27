import React, {PureComponent}    from "react"; 
import axios    from "axios"; 
import Pregunta 	from './pregunta'

export default class actionPregunta extends PureComponent {
	constructor(props) {
		super(props);
		this.state ={
      dataPregunta:[],
			pruebaId:null
		}

	}

  componentWillMount() {
    var parameterValue = decodeURIComponent(window.location.search.match(/(\?|&)pruebaId\=([^&]*)/)[2]);
    axios.get("/x/v1/pre/pregunta/"+parameterValue)
    .then((response)=>{
      this.setState({dataPregunta:response.data.pregunta, pruebaId:response.data.pruebaId })
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  render(){
  	return(
      <Pregunta dataPregunta={this.state.dataPregunta} pruebaId={this.state.pruebaId} />
  	 
  	)
  }
}