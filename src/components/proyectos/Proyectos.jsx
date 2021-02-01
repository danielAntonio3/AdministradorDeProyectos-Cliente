import React, { useContext,useEffect } from 'react';

import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra'

import FormTareas from '../tareas/FormTareas';
import ListadoTareas from '../tareas/ListadoTareas';

import AuthContext from '../../context/auth/authContext';


const Proyectos = () => {

    /*
    ! extraemos la funcion que revisa primero si hay un token para eso se usa el AuthContext
    */
   const authContext = useContext(AuthContext);

   const { usuarioAuteticado } = authContext;

    useEffect(() => {
        usuarioAuteticado();
    // eslint-disable-next-line
    }, []);

    return ( 
        <div className="contenedor-app">
            
            <Sidebar />
            
            <div className="seccion-principal">

                <Barra />
                
                <main>

                <FormTareas />

                    <div className="contenedor-tareas">
                        <ListadoTareas />                        
                    </div>

                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;