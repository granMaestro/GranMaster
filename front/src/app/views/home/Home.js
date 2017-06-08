// @flow weak

import React, {PureComponent } from 'react';
// import PropTypes        from 'prop-types';
import {Jumbotron}             from '../../components';
import cx                      from 'classnames';
import { Link }                from 'react-router';
import FontAwesome             from 'react-fontawesome';



class Home extends PureComponent {
  state = {
    animated: true,
    viewEntersAnim: true
  };

  render() {
    const { animated, viewEntersAnim } = this.state;
    return(
      <div
        key="homeView"
        className={cx({
          'animatedViews': animated,
          'view-enter': viewEntersAnim
        })}>
        <Jumbotron>
          <h1>
            comparte el amor por los libros papi
          </h1>
          <h2>
            <div className="input-group">
              <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
              <span className="input-group-addon"><FontAwesome name='search'/></span>
            </div>
          </h2>
          <h2>
            Encuentra el libro que buscas entre miles de titulos ofertados por nuestra comunidad 
          </h2>
           
        </Jumbotron>
      </div>
    );
  }
}

export default Home;
