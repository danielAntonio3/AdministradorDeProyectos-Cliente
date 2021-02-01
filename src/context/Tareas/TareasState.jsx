import React, { useReducer } from 'react';

import TareaContext from './TareasContext';
import Tareareducer from './Tareasreducer';

 import {
    TAREAS_PROYECTO,
    CREARNUEVA_TAREA,
    VALIDAR_FORMTAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    EDITAR_TAREA
} from '../../types/Index';

// ! importamos el cliente
import clienteAxios from '../../config/axios';

const TareasState = props => {

    const initialState = {
        tareasproyecto: [],
        FormularioTarea: false,
        TareaACtualSeleccionada: null
    }


    // crear el dispach y el state
    const [state,dispatch] = useReducer(Tareareducer,initialState);


    //funcion para cargar tareas de los proyectos
    const cargarTareas = async proyecto => {
       
        try {
            // ! si pasas paramentrros con params en tu servidor tienes que leer lo como 
            // ? req.query 
        const resultado = await clienteAxios.get('/api/tareas',{ params:{ proyecto }});

        // ? console.log(resultado);

        dispatch({
            type:TAREAS_PROYECTO,
            payload: resultado.data
        })

       } catch (error) {
           console.log(error);
       }
    }

    // * Funcion que permite agregar un nuevo tarea al proyecto
    const agregraTarea = async tarea =>{

        try {

            await clienteAxios.post('/api/tareas',tarea);
            // eslint-disable-next-line
                 // ? console.log(resultado);
            dispatch({
                type: CREARNUEVA_TAREA,
                payload: tarea
            })
            
        } catch (error) {

            console.log(error);

        }

    };

    // * Funcion que valida el formulario de tarea
    const validarTareaForm = () => {
        dispatch({
            type: VALIDAR_FORMTAREA 
        })
    };

    // * Funcion que elimina una tarea 
    const eliminarTarea =  async (id,proyecto) =>{

        // ? console.log(id);
        try {

            await clienteAxios.delete(`/api/tareas/${id}`,{params:{ proyecto }});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
           });
            
        } catch (error) {
            console.log(error);
        }

    }

     // * Funcion que edita una tarea seleccionada o cambiar el estado tarea
     const editarTarea = async tarea =>{

          // ? console.log(tarea);

          try {
              
    const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`,tarea);
        
    // ? console.log(resultado.data);

        dispatch({ 
            type: EDITAR_TAREA,
            payload: resultado.data
         })

          } catch (error) {

            console.log(error);
              
          }

    }

    // * Funcion para extraer una tarea para edicion
    const guardarTareaActual = tarea =>{
        dispatch({
             type: TAREA_ACTUAL,
             payload: tarea
        })
    }

   

    return (
        <TareaContext.Provider 
         value={{
            tareasproyecto: state.tareasproyecto,
            FormularioTarea:state.FormularioTarea,
            TareaACtualSeleccionada:state.TareaACtualSeleccionada,
            cargarTareas,
            agregraTarea,
            validarTareaForm,
            eliminarTarea,
            guardarTareaActual,
            editarTarea
         }}
        >
            {props.children}
        </TareaContext.Provider>

    )

}


export default TareasState;
 