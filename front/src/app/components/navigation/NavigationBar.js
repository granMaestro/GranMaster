// @flow weak

import React, {Component}              from 'react';
import PropTypes          from 'prop-types';
import {Link}             from 'react-router-dom';
import Humburger          from './humburger/Humburger';
import Main             from './main';


import axios              from 'axios';
import logo          from './logo.png'; 

export default class NavigationBar extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data:[]
    }
  }
  componentWillMount() {
    axios.get("/x/v1/user/profile")
    .then((response)=>{
      this.setState({data:response.data.user.local})
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
            <img src={logo} className='img-responsive' /> 
          </Link>
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1">
              {

                data.email
                ?<ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link to="/profile">{data.email}</Link>
                  </li>
                </ul>
                :<ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link to="/ingresar">Ingresar</Link>
                  </li>
                  <li>
                    <Link to="/registrarse">Registrarse</Link>
                  </li>
                </ul>
              }
              
            
          </div>
        </div>
      </nav>
    );
  }
};

 
