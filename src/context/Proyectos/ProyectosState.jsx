import React, {useReducer} from 'react';



import ProyectoContext from './ProyectoContext';
import ProyectoReducer from './Proyectoreducer';

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


/* 
    ? Como se trabaja con la base de datos ahy que incorporar nuestro servicio
*/
import clienteAxios from '../../config/axios';


const ProyectoState = props => {

        
        const inicialState={
            proyectos:[],        
            formulario: false,
            errorFormulario:false,
            proyecto: null,
            mensaje: null
        }
   
    // Dispatch para ejecutar las acciones
    const [state,dispatch] = useReducer(ProyectoReducer,inicialState);


    // Serie de funciones para el CRUD
    const mostrarFormulario = () =>{
        dispatch({
            type:FORMULARIO_PROYECTO
                })
    }


    // Funcion que permite cargar los proyectos
    const obtenerProyectos = async () =>{
            
        try {
            
            const resultado = await clienteAxios.get('/api/proyectos');

            //console.log(resultado);

            dispatch({
                type:PROYECTOS_CREADOS,
                payload: resultado.data.proyectos
                })

        } catch (error) {
             // ? console.log(error);            
            
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            };

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }

    }


    // * Funcion que permite agregar un nuevo proyecto     
    const agregraProyecto = async proyecto =>{
        
        try {
            
        const resultado = await clienteAxios.post('/api/proyectos', proyecto);
        // ? console.log(resultado);

        // * insertamos el proyecto al state
            dispatch({
                type:  CREARNUEVO_PROYECTO,
                payload: resultado.data
            })


        } catch (error) {
             // ? console.log(error);            
        
        const alerta = {
            msg: 'Hubo un error',
            categoria: 'alerta-error'
        };

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }  
         
    };

    const mostrarError = () =>{
        dispatch({
            type: VALIDAR_FORMULARIO
        })

    }

    const proyectoActual = proyectoId =>{

        dispatch({
            type:PROYECTO_ACTUAL,
            payload: proyectoId
        })

    }

    const eliminarProyecto = async proyectoId =>{
        
        try {

            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

            dispatch({
                type: ELIMINAR_PTOYECTO,
                payload: proyectoId
            });

        } catch (error) {
            // ? console.log(error);            
        const alerta = {
            msg: 'Hubo un error',
            categoria: 'alerta-error'
        }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })

        }
        
    }

    // * Hacemos disponibles en todo el proyecto las funciones creadas con anteoridad
    // * Colocando primero los state y despues funciones
        return(
            <ProyectoContext.Provider
                value={{
                    proyectos:          state.proyectos,
                    formulario:         state.formulario,
                    errorFormulario:    state.errorFormulario,
                    proyecto:           state.proyecto,
                    mensaje:            state.mensaje,
                    mostrarFormulario,
                    obtenerProyectos,
                    agregraProyecto,
                    mostrarError,
                    proyectoActual,
                    eliminarProyecto
                }}
            >
                {props.children}
            </ProyectoContext.Provider>
        )

    };

export default ProyectoState;