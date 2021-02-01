import React, { Fragment, useContext } from 'react';
import Tareas from './Tareas';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import ProyectoContext from '../../context/Proyectos/ProyectoContext';
import TareasContext from '../../context/Tareas/TareasContext';

const ListadoTareas = () => {

    // Context de proyectos
    const ProyectosContext = useContext(ProyectoContext);
    const {proyecto,eliminarProyecto} = ProyectosContext;

    // Context de tareas
    const TareaContext = useContext(TareasContext);
    const {tareasproyecto} = TareaContext;

    // * Si no hay proyecto seleccionado
    if(!proyecto){
        return <h2>Selecciona un proyecto</h2>
    }

    // Array destructuring para extraer el proyecto actual
    const [ proyectoActual ] = proyecto;

    // ?console.log({tareasproyecto});

    const onClickEliminarP = () =>{
        eliminarProyecto(proyectoActual._id);
    };

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasproyecto.length === 0 
                    ?(<li className="tarea"><p>No hay tareas</p></li>)
                    :
                    <TransitionGroup>
                    {tareasproyecto.map( tareaProyecto => (
                        <CSSTransition
                            key={tareaProyecto._id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tareas
                                tareaProyecto={tareaProyecto}
                            />
                        </CSSTransition>
                    ))}
                    </TransitionGroup>
                }
            </ul>
            <button 
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminarP}
            >Eliminar proyecto &times;</button>
        </Fragment>
        )};

export default ListadoTareas;
