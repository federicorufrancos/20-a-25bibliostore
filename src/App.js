import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import MostrarSuscriptor from './componentes/suscriptores/MostrarSubscriptor';
import Suscriptores from './componentes/suscriptores/Subscriptores';
import EditarSuscriptor from './componentes/suscriptores/EditarSubscriptor';
import NuevoSuscriptor from './componentes/suscriptores/NuevoSubscriptor';
import Navbar from './componentes/layout/Navbar';

import Libros from './componentes/libros/Libros';
import MostrarLibro from './componentes/libros/MostrarLibro';
import PrestamoLibro from './componentes/libros/PrestamoLibro';
import EditarLibro from './componentes/libros/EditarLibro';
import NuevoLibro from './componentes/libros/NuevoLibro';
import Login from './componentes/auth/Login';

//these are function to check that path are need to be autenticated and which not
import { UserIsNotAuthenticated, UserIsAuthenticated } from './helpers/auth';

function App() { 
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <div className="container">
          <Switch>
            <Route exact path="/" component={UserIsAuthenticated(Libros)}/>
            <Route exact path="/libros/mostrar/:id" component={UserIsAuthenticated(MostrarLibro)}/>
            <Route exact path="/libros/nuevo" component={UserIsAuthenticated(NuevoLibro)}/>
            <Route exact path="/libros/editar/:id" component={UserIsAuthenticated(EditarLibro)}/>
            <Route exact path="/libros/prestamo/:id" component={UserIsAuthenticated(PrestamoLibro)}/>
            <Route exact path="/suscriptores" component={UserIsAuthenticated(Suscriptores)}/>
            <Route exact path="/suscriptores/nuevo" component={UserIsAuthenticated(NuevoSuscriptor)}/>
            <Route exact path="/suscriptores/mostrar/:id" component={UserIsAuthenticated(MostrarSuscriptor)}/>
            <Route exact path="/suscriptores/editar/:id" component={UserIsAuthenticated(EditarSuscriptor)}/>
            <Route exact path="/login" component={UserIsNotAuthenticated(Login)}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
