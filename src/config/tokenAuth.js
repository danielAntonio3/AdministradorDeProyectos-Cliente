// este codigo es para colocar el header token
import ClienteAxios from './axios';

const tokenAuth = token =>{

    if(token){
        // colocamos en los headers el token 
        ClienteAxios.defaults.headers.common['x-auth-token'] = token;
    }else {
        
        // Si el usuario ya cerro sesion o expiro el token
        delete  ClienteAxios.defaults.headers.common['x-auth-token'];
    }

};

export default tokenAuth;
