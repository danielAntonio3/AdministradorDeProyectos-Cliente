import React,{ useState, useContext, useEffect} from 'react';
// para las rutas
import {Link} from 'react-router-dom';

// Iportamos el  alertaContext para utilizarlo
import AlertasContext from '../../context/alertas/alertasContext';
import AuthContext from '../../context/auth/authContext';


// Se coloca props para poder enviar al usuario a otra parte del codigo
const NuevaCuenta = (props) => {

    // hacemos diponible el context
    const alertasContext = useContext(AlertasContext);
    const authContext = useContext(AuthContext);

    // Extraemos los valores del context
    const {alerta,mostrarAlerta} = alertasContext;
    const { mensaje, autenticado, registrarUsuario } = authContext;

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

    //state para usuario 
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        password2: ''
    });

    //etraemos los valores del state
    const {nombre,email,password,password2} = usuario;


    // Funcion del input de email
    const handleNewUser = e=>{
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value 
        })
    };

    // Cuando el usuario quiere iniciar sesios
    const crearCuenta = e =>{
        e.preventDefault();

        //validar que los campos esten llenos
        if(nombre.trim() ===''|| email.trim() === '' || password.trim() === '' || password2.trim() === '' ){
            mostrarAlerta('Todos los campos son obligatorios','alerta-error');
            return;
          }

          // Valinamos que los password sean mayores a 6 caracteres
          if(password.length < 6){
            mostrarAlerta('La contraseña debe tener mas de 6 caracteres como minimo','alerta-error');
            return;
          }

          // Validamos que los dos password sean iguales 
          if(password !== password2){
            mostrarAlerta('Las contraseñas no son iguales, verifica tus contraseñas','alerta-error');
            return;
          }
        
        //pasarlo al action
        registrarUsuario({
            nombre,email,password
        });


    }

    return ( 
        <div className="form-usuario">
            {alerta ?
            (<div className={`alerta ${alerta.categoria}`}> {alerta.msg}</div>)
             :null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>

                <form
                    onSubmit={crearCuenta}
                >
                  <div className="campo-form">
                        <label htmlFor="nombre">Nombre:</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Escribe tu nombre"
                            value={nombre}
                            onChange={handleNewUser}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Correo:</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Escribe tu correo"
                            value={email}
                            onChange={handleNewUser}
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
                            onChange={handleNewUser}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password2">Confirmar contraseña:</label>
                        <input 
                            type="password"
                            id="password2"
                            name="password2"
                            placeholder="Confirmar contraseña"
                            value={password2}
                            onChange={handleNewUser}
                        />
                    </div>

                    <div>
                        <input 
                            type="submit"
                            className="btn btn-block btn-primario"
                            value="Registrarme"
                        />
                    </div>
                </form>

                <Link 
                    to={'/'}
                    className="enlace-cuenta"
                >
                    Volver a inicio de sesión
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;