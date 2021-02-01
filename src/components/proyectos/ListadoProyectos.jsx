import React, { useContext, useEffect } from 'react';
import {CSSTransition,TransitionGroup} from 'react-transition-group';

import Proyecto from './Proyecto';
import ProyectoContext from '../../context/Proyectos/ProyectoContext';

import AlertasContext from '../../context/alertas/alertasContext';

const ListadoProyectos = () => {

    //Extraer proyectos
    const ProyectosContext = useContext(ProyectoContext);
    //Extrer el los valores que tiene el context
    const {mensaje,proyectos,obtenerProyectos} = ProyectosContext;

    const alertaContext = useContext(AlertasContext);
    const { alerta, mostrarAlerta}= alertaContext; 



    //Obtener proyectos
    useEffect( () => {

        // * si hay un error mostramos el error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();
        //eslint-disable-next-line
    },[mensaje]); 

    //Verificamos si proyectos tiene contenido
    if(proyectos.length === 0) return <p>No hay proyectos, Crea un nuevo proyecto...</p>;



    return ( 
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria} `}>{alerta.msg}</div> ) : null}
            <TransitionGroup>
            {proyectos.map(proyecto=>(
                <CSSTransition
                    key={proyecto._id}
                    timeout={200}
                    classNames="proyecto"
                >
                    <Proyecto 
                        proyecto={proyecto}
                    />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ul>

     );
}
 
export default ListadoProyectos;