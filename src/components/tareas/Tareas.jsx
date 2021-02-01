import React,{ useContext } from 'react';

import TareasContext from '../../context/Tareas/TareasContext';
import ProyectoContext from '../../context/Proyectos/ProyectoContext';

const Tareas = ({tareaProyecto}) => {

    // Extraciones de proyectos
    const {nombre,estado,_id} = tareaProyecto;

    // Context de tarea
    const TareaContext = useContext(TareasContext);
    const {eliminarTarea,cargarTareas,editarTarea,guardarTareaActual} = TareaContext;
    
    // context de ´proyectos
    const ProyectosContext = useContext(ProyectoContext);
    const {proyecto} = ProyectosContext;

    const [proyectoActual] = proyecto;


    // Funcion que se ejecuta cuando el usuario preciona el boton de eliminar tarea
    const EliminarTareas = id =>{
        eliminarTarea( id, proyectoActual._id);
        cargarTareas( proyectoActual._id);
    };

    // Funcion que cambia el estado de la tarea en completo o incompleto 
    const modificarEstadoTarea = tarea =>{

        if(tarea.estado){   
            tarea.estado = false;
        }else {
            tarea.estado = true;
        }
        editarTarea( tarea );
    };

    //funcion para editar una tarea creada
    const modificarTarea = tarea =>{
        guardarTareaActual(tarea);
    };


    return ( 
        <li className="tarea sombra">
            <p>{nombre}</p>
            <div className="estado">
                {estado 
                    ? (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => modificarEstadoTarea(tareaProyecto)}
                        >Completado</button>
                      )
                    : 
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => modificarEstadoTarea(tareaProyecto)}
                        >Incompleto</button>
                      )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={()=> modificarTarea(tareaProyecto)}
                >Editar</button>
                
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={()=> EliminarTareas(_id)}
                >Eliminar</button>
            </div>

        </li>

     );
}
 
export default Tareas;