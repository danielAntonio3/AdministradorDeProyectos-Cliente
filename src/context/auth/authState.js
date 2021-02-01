import React,{ useReducer } from 'react';

import authReducer from './authReducer';
import authContex from './authContext';
import clienteAxios from '../../config/axios';

// esto es de la carpeta de cliente
import tokenAuth from '../../config/tokenAuth';


import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types/Index';

const AuthState = props => {

    const inicialState={
        // token que se genera en el servidor se almacena
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    };

    // Creacion del dispach
    const [state,dispatch] = useReducer(authReducer,inicialState);

    // Funcion registrar nuevo usaurio
    const registrarUsuario = async datos =>{
    
        try {
            // Para hacer un registro
            const resultado = await clienteAxios.post('/api/usuarios', datos);
            //console.log(resultado.data);

            dispatch({
                 type: REGISTRO_EXITOSO,
                 payload: resultado.data
                });
            
            /* 
            * Si el registro es exitoso entonces regresamos el usuario logiado 
            */
            usuarioAuteticado();

        // Por si hay errores
        } catch (error) {
            // De esta manera podemos ver mejor el error
            //console.log(error.response.data.msg);
            const alerta ={
                msg:error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    };

    // Funcion que retorna al usurio autenticado 
    const usuarioAuteticado = async () => {
        // obtenemos lo que hay en localStorage
        const token = localStorage.getItem('token');
        if(token){
            //Funcino para enviar el token por hedears
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            //console.log(respuesta);

            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });

        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    };

    
    /*
    !  Funcion cuando el usuario inicia sesion
    *  MUY INPORTANTE PONERL EL ASYNC YA QUE son funciones asincronas 
    *  cuando uses async obligatoriamente tienes que usar await 
    */

    const iniciarSesion = async  datos =>{
        try {

            // llamos el archivo que esta en el servidor y le pasamos los datos que con los que trabaja
            const respuesta = await clienteAxios.post('/api/auth',datos); 
            //console.log(respuesta);
            
            dispatch({
                type:LOGIN_EXITOSO,
                payload: respuesta.data
            });

            /* 
            * Si el registro es exitoso entonces regresamos el usuario logiado 
            */
           usuarioAuteticado();
           
        } catch (error) {
            // si hay un error entonces se envia al alerta
            //console.log(error.response.data.msg);
            
            const alerta ={
                // donde se ubical los errores
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    };
    
    /*
        ! Funcion para cerrar sesión
    */
   const cerrarSesion = () =>{
        dispatch({
            type: CERRAR_SESION
        })
   };
    

    return(
        <authContex.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                usuarioAuteticado,
                registrarUsuario,
                iniciarSesion,
                cerrarSesion
                
            }}
        >
            {props.children}
        </authContex.Provider>

    );


};

export default AuthState;