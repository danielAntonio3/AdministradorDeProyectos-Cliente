import {
    TAREAS_PROYECTO,
    CREARNUEVA_TAREA,
    VALIDAR_FORMTAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    EDITAR_TAREA
} from '../../types/Index';

export default (state, action) =>{
    switch (action.type){

        case TAREAS_PROYECTO:
            return { 
                ...state,
                tareasproyecto: action.payload
             }
        case CREARNUEVA_TAREA:
            return { 
                ...state,
                tareasproyecto: [action.payload,...state.tareasproyecto],
                FormularioTarea:false
             }
        case VALIDAR_FORMTAREA:
            return { 
                ...state,
                FormularioTarea:true
            }
        case ELIMINAR_TAREA:
            return { 
                ...state,
                tareasproyecto:state.tareasproyecto.filter(tarea => tarea._id !== action.payload) 
            }
            
        case EDITAR_TAREA:
            return { 
                ...state,
                tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea),
                TareaACtualSeleccionada: null
             }
        case TAREA_ACTUAL:
            return{
                ...state,
                TareaACtualSeleccionada: action.payload 
            }
        default:
            return state;

    }

}