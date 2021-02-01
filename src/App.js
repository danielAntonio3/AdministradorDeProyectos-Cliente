import React from 'react';
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';

import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

import ProyectosState from './context/Proyectos/ProyectosState';
import TareasState from './context/Tareas/TareasState';
import AlertaState from './context/alertas/alertasState';
import AuthState from './context/auth/authState';

import tokenAuth from './config/tokenAuth';

/* 
 * Sirve para proteger las rutas de acceso del proyecto 
*/
import RutaPrivada from './components/rutas/RutaPrivada';

/* 
  ! antes de ejecutar la app verificaremos si hay algun token en el local storage
  * sirve por si el usuario recarga la pagina no perdemos sus informacion en caso de que este alla iniciado sesion
*/
const token = localStorage.getItem('token');
  if(token){
    tokenAuth(token);
  }



function App() {
  return (
    <ProyectosState>
      <TareasState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta}/>
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareasState>
    </ProyectosState>
  );
}

export default App;
