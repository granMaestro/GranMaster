import React, {PureComponent}    from "react"; 
import axios    from "axios"; 
import Pregunta 	from './pregunta'

export default class actionPregunta extends PureComponent {
	constructor(props) {
		super(props);
		this.state ={
      dataPregunta:[],
      dataCategoria:[],
			pruebaId:null
		}

	}

  componentWillMount() {
    var parameterValue = decodeURIComponent(window.location.search.match(/(\?|&)pruebaId\=([^&]*)/)[2]);
    axios.get("/x/v1/pre/pregunta/"+parameterValue)
    .then((response)=>{
      let newdataPregunta= [];
      response.data.pregunta.filter((obj)=>{
        newdataPregunta.push({titulo:obj.titulo, estado:obj.estado, name:obj.CategoriaId.name })
      })
      console.log(response.data.pregunta)
      this.setState({dataPregunta:newdataPregunta, pruebaId:response.data.pruebaId })
    })
    .catch((err)=>{
      console.log(err)
    })

    axios.get("/x/v1/cat/categoria/")
    .then((response)=>{
      let newData=[]
      response.data.categoria.filter((obj)=>{
          newData.push({value:obj._id, label:obj.name})
      })
      this.setState({dataCategoria:newData})
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  render(){
  	return(
      <Pregunta dataPregunta={this.state.dataPregunta} pruebaId={this.state.pruebaId}  dataCategoria={this.state.dataCategoria} />
  	 
  	)
  }
}