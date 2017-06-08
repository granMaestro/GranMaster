// @flow weak

import React from 'react';
import {
  Route,
  Switch
 }                              from 'react-router';
import {
  ConnectedHome,
  ConnectedAbout
}                               from '../containers';
import {
  Registrarse,
  actionPerfil,
  Cuenta,
  actionCategoria,
  Ingresar,
  Test,
  PageNotFound
}                               from '../views';

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ConnectedHome} />
      <Route path="/about" component={ConnectedAbout} />
      
      <Route path="/registrarse" component={Registrarse} />
      <Route path="/ingresar" component={Ingresar} />
      <Route path="/perfil" component={actionPerfil} />
      <Route path="/cuenta" component={Cuenta} />
      <Route path="/categoria" component={actionCategoria} />
      <Route path="/test" component={Test} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
};

export default MainRoutes;
