// @flow weak

import React, {
  PureComponent
}                     from 'react';
// import PropTypes      from 'prop-types';
import {Jumbotron}    from '../../components';
import AnimatedView   from '../../components/animatedView/AnimatedView';

class PageNotFound extends PureComponent {
  render() {
    return(
      <AnimatedView>
        <Jumbotron>
          <h1>
            Esta pagina no existe...
          </h1>
        </Jumbotron>
      </AnimatedView>
    );
  }
}

export default PageNotFound;
