import React, { useReducer } from 'react';

import alertasContext from './alertasContext';
import alertasReducer from './alertasReducer';

import { 
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
 } from '../../types/Index';


// la primera letra de la funcion es MAYUSCULA si no causa error
 const AlertaState = props => {


    // state donde se almacenaran las funciones o contenedores
    const inicialState={
        alerta: null
    }


    // Dispatch para ejecutar las acciones
    const [state,dispatch] = useReducer(alertasReducer,inicialState);


    // Funcion que muestra el alerta
    const mostrarAlerta = (msg,categoria) =>{

        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });

        // En la misma funcion enviaremos un segundo dispatch
        // Se encargara de ocultar el aletrta despues de 5 segundo

        setTimeout(() => {
            dispatch({
                type:OCULTAR_ALERTA
            })

        }, 5000);

    };

    return (

        <alertasContext.Provider
            value={{
                alerta:state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertasContext.Provider>
    );



 };

 export default AlertaState;





