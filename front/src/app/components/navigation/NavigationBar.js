// @flow weak

import React, {Component}              from 'react';
import PropTypes          from 'prop-types';
import {Link}             from 'react-router-dom';
import Humburger          from './humburger/Humburger';
import Main             from './main';
import axios              from 'axios';
  

export default class NavigationBar extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data:[]
    }
     $(document).click(function(){  
      $('#main-left').addClass('main-right-hidden'); //hide the button
    });
  }
  componentWillMount() {
    axios.get("/x/v1/user/perfil")
    .then((response)=>{
      this.setState({data:response.data.user})
    })
    .catch((err)=>{
       
    })
  }
  render() {
    const {data} = this.state; 
    return (
      <nav className="navbar navbar-default">
        <div className="containersCustom">
          <div className="navbar-header">
            {
              <Humburger />
            }
              <Main />
              <Link to='/' className="navbar-brand">
            GRAND MASTER
          </Link>
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1">
              {
                data
                ?<ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link to="/profile">{data.nombre}</Link>
                  </li>
                </ul>
                :<ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link to="/ingresar">Ingresar</Link>
                  </li>
                </ul>
              }
          </div>
        </div>
      </nav>
    );
  }
};

 
