import React, {PureComponent}    from "react"; 
import axios    from "axios"; 
import Categoria 	from './categoria'

export default class actionCategoria extends PureComponent {
	constructor(props) {
		super(props);
		this.state ={
      dataCategoria:[],
			dataCategoriaPadre:[]
		}

	}

  componentWillMount() {

     axios.get("/x/v1/cat/categoria")
    .then((response)=>{
      let categoriaPadreIds = null
      let newData=[]
      let newdataCategoriaPadre= [];
      response.data.categoria.filter((obj)=>{
          newdataCategoriaPadre.push({value:obj._id, label:obj.name})
      })

      response.data.categoria.filter((obj)=>{
        if(obj.categoriaPadreId){
          newData.push({id: obj._id, nombre:obj.name, descripcion:obj.descripcion, categoriaPadreId: obj.categoriaPadreId.name}) 
        } else{
          newData.push({id: obj._id, nombre:obj.name, descripcion:obj.descripcion, categoriaPadreId: categoriaPadreIds}) 
        }
        
      }) 
      this.setState({dataCategoria: newData, dataCategoriaPadre: newdataCategoriaPadre})
    })
    .catch((err)=>{
      console.log(err)
    }) 
  }
  render(){
  	return(
      <Categoria dataCategoria={this.state.dataCategoria} dataCategoriaPadre={this.state.dataCategoriaPadre} />
  	 
  	)
  }
}