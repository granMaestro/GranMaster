import React, {PureComponent}    from "react"; 
import axios    from "axios"; 
import Perfil 	from './perfil'

export default class actionPerfil extends PureComponent {
	constructor(props) {
		super(props);
		this.state ={
			data:[]
		}

	}

  componentWillMount() {
    axios.get("/x/v1/user/profile")
    .then((response)=>{
      this.setState({data:response.data.user.local})
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  render(){
  	return(
  		<Perfil data={this.state.data} />
  	)

  }
}