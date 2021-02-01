import React, { useContext, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';


import AuthContext from '../../context/auth/authContext';

    /*
     * Recive un component 
     */
const RutaPrivada = ({ component:Component, ...props }) => {

        const authContext = useContext(AuthContext);
        const { autenticado, cargando, usuarioAuteticado } = authContext; 

        useEffect(() => {
        usuarioAuteticado();
        
        // eslint-disable-next-line
        }, []);

    return ( 

        /*
        ! Primero verificamos si el usuario esta autenticado
        * NO ESTA: se envia a la pagina principal
        ? SI ESTA: se envia al componente que esta llamando este archivo
        */
        <Route 
            {...props}
            render={props => !autenticado && !cargando ? ( <Redirect to="/" /> ) :( <Component {...props}/>) }
        />

     );
}
 
export default RutaPrivada;