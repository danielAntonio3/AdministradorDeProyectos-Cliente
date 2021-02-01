import React, { Fragment, useState, useContext } from 'react';

import ProyectoContext from '../../context/Proyectos/ProyectoContext';

const NuevoProyecto = () => {

    //obtener el state de formulario
    const ProyectosContext = useContext(ProyectoContext);

    //Extrer el los valores que tiene el context
    const {formulario,errorFormulario,
           mostrarFormulario,agregraProyecto,mostrarError} = ProyectosContext;

    //state que captura los datos del formulario
    const [proyecto, setProyectos] = useState({
        nombre:''
    });


    // extraemos el objeto del state
    const {nombre} = proyecto;

    // funcion que captura los datos
    const handleProyecto = e => {
        setProyectos({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    };


    // funcion del submit
    const SubmitProyecto = e => {
        e.preventDefault();

        //validar el input 
        if(nombre.trim() === ''){
            mostrarError();
            return ;
        }

        // agregar al state una vez este correcto
        agregraProyecto(proyecto);

        //reiniciar el input
        setProyectos({
            nombre:''
        })

    };


    //funcion que cambia el el state de formulario y muestra los campos para mostrar el fromulario
    const showFormulario = e => {
        e.preventDefault();
        mostrarFormulario();
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={showFormulario}
            >
                Nuevo proyecto
            </button>

                {formulario ?
                    (
                        <form 
                            className="formulario-nuevo-proyecto"
                            onSubmit={SubmitProyecto}
                        >
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Nombre de tu proyecto"
                                name="nombre"
                                value={nombre}
                                onChange={handleProyecto}
                            />

                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar Proyecto"
                            /> 
                        </form>
                    ): null}

                {errorFormulario?<p className="mensaje error">El nombre del proyecto es obligatorio</p>:null}
        </Fragment>

      );
}
 
export default NuevoProyecto;