import React,{useContext} from 'react';

import ProyectoContext from '../../context/Proyectos/ProyectoContext';
import TareasContext from '../../context/Tareas/TareasContext';

const Proyecto = ({proyecto}) => {

    // De la variabel proyectos
    const {nombre} = proyecto;

    
    const ProyectosContext = useContext(ProyectoContext);
    const {proyectoActual} = ProyectosContext;


    const TareaContext = useContext(TareasContext);
    const {cargarTareas} = TareaContext;

    // funcion para agregar el proyecto actual
    const seleccionarProyecto = id =>{
        proyectoActual(id);
        cargarTareas(id);
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >
                {nombre}
            </button>   
        </li>        

     );
}
 
export default Proyecto;