//Extraemos el de index 
import {
    FORMULARIO_PROYECTO,
    PROYECTOS_CREADOS,
    CREARNUEVO_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PTOYECTO,
    PROYECTO_ERROR
} from '../../types/Index';


export default (state, action)=>{
    switch (action.type){
        case FORMULARIO_PROYECTO:
            return { 
                ...state,
                formulario : true
            }
        case PROYECTOS_CREADOS:
            return { 
                ...state,
                proyectos: action.payload
            }
        case CREARNUEVO_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false,
                errorFormulario: false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorFormulario: true
            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload)
            }

        case ELIMINAR_PTOYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto:null
            }
        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        default:
            return state;
    }

}