import React,{ useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';

const Barra = () => {

    /*
    ! extraemos la funcion que revisa primero si hay un token para eso se usa el AuthContext
    */
    const authContext = useContext(AuthContext);

    const { usuario, usuarioAuteticado,  cerrarSesion } = authContext;

useEffect(() => {
    usuarioAuteticado();
    // eslint-disable-next-line
    }, []);


return ( 
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span> </p> :null}
            <nav className="nav-principal">
                <button 
                    className="btn btn-blank cerrar-sesion btn-color"
                    onClick={ ()=> cerrarSesion()}
                    >Cerrar sesión</button> 
            </nav>
        </header>
    );
}

export default Barra;