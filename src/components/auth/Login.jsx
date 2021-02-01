import React,{ useState,useEffect,useContext} from 'react';
import {Link} from 'react-router-dom';

// Iportamos el  alertaContext para utilizarlo
import AlertasContext from '../../context/alertas/alertasContext';
import AuthContext from '../../context/auth/authContext';


const Login = (props) => {


     // hacemos diponible el context
     const alertasContext = useContext(AlertasContext);
     const authContext = useContext(AuthContext);
 
     // Extraemos los valores del context
     const {alerta,mostrarAlerta} = alertasContext;
     const { mensaje, autenticado, iniciarSesion } = authContext

    //state para usuario 
    const [usuario, setUsuario] = useState({
        email:'',
        password:''
    })

    // en caso de que el usurio se haya autenticado o registrado o sea un registro nuevo
    useEffect(()=>{
        // Validamos si el usario esta registrado y si lo esta lo enviamos a la parte de los proyectos
        if(autenticado){
            // enviar a proyectos
            props.history.push('/proyectos');
        }

        // caso contrario y exista un mensaj
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
            return;
        }

        // El props.history es para que reacione a un cambio de ruta  
        
        // eslint-disable-next-line
    },[mensaje, autenticado, props.history]);
    
    //etraemos los valores del state
    const {email,password} = usuario;


    // Funcion del input de email
    const handleLogin = e=>{

        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value 
        })

    }

    // Cuando el usuario desea iniciar sesios
    const IniciarSesion = e =>{
        e.preventDefault();

        //validar que los campos esten llenos
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios','alerta-error');
            return;
        }

        //Pasamos al action 
        iniciarSesion({email, password});

    }

    return ( 
        <div className="form-usuario">
             {alerta ?
                (<div className={`alerta ${alerta.categoria}`}> {alerta.msg}</div>) :null
            }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form
                    onSubmit={IniciarSesion}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Correo:</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Escribe tu correo"
                            value={email}
                            onChange={handleLogin}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Contraseña:</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Escribe tu contraseña"
                            value={password}
                            onChange={handleLogin}
                        />
                    </div>

                    <div>
                        <input 
                            type="submit"
                            className="btn btn-block btn-primario"
                            value="Iniciar sesion"
                        />
                    </div>
                </form>
                <Link 
                    to={'/nueva-cuenta'}
                    className="enlace-cuenta"
                >
                    Obtener nueva cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;