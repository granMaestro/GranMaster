import React, {PureComponent}    from "react"; 
import axios    from "axios"; 
import Usuario 	from './usuario'

export default class actionUsuario extends PureComponent {
	constructor(props) {
		super(props);
		this.state ={
			dataUsuario:[]
		}

	}

  componentWillMount() {

     axios.get("/x/v1/user/users")
    .then((response)=>{
      let newData=[]
      response.data.user.filter((obj)=>{
        newData.push({nombre:obj.nombre, email:obj.email})
      }) 
      this.setState({dataUsuario: newData})
    })
    .catch((err)=>{
      console.log(err)
    }) 
  }
  render(){
  	return(
      <Usuario dataUsuario={this.state.dataUsuario} />
  	 
  	)
  }
}