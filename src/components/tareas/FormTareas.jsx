import React,{ useContext, useState, useEffect} from 'react';

import ProyectoContext from '../../context/Proyectos/ProyectoContext';

import TareasContext from '../../context/Tareas/TareasContext';

const FormTareas = () => {

    // Extraer si un proyecto esta activo
    const ProyectosContext = useContext(ProyectoContext);
    const {proyecto} = ProyectosContext;

    const TareaContext = useContext(TareasContext);
    const {TareaACtualSeleccionada,FormularioTarea,validarTareaForm,agregraTarea,cargarTareas,editarTarea} =TareaContext;


    // Para cargar si existe uan tarea selecionada
    useEffect( ()=>{

        if(TareaACtualSeleccionada !== null){
            setNomTarea(TareaACtualSeleccionada)
        }else{
            setNomTarea({
                nombre:''
            })   
        }
        
    },[TareaACtualSeleccionada]);


    // State de formulario
    const [nomTarea, setNomTarea] = useState({
        nombre: ''
    })
    
    const {nombre} = nomTarea;

    
    //verificamos si hay un proyecto seleccionado 
    if(!proyecto) return null;

     // Array destructuring para extraer el proyecto actual
     const [proyectoActual] = proyecto;
 

     // funcion para guardar el nombre de tarea 
     const obtenerNomTarea = e =>{
        setNomTarea({
            ...nomTarea,
            [e.target.name] : e.target.value
        })
     };

     
     // Funcion para agregar una nueva tarea al proyecto o para editar tarea
     const agregraTareas = e =>{
         e.preventDefault();


        //validar frmulartio
        if(nombre.trim() === ''){
            validarTareaForm();
            return;
        }

        // Verificamos que no hay una terea seleccionada
         if(TareaACtualSeleccionada === null){
            // agregar la tarea nueva
            nomTarea.proyecto=proyectoActual._id;
            agregraTarea(nomTarea);
    
         }else{
             // actualizar tarea existente
            editarTarea(nomTarea);
        }
         // Recargar las tareas nuevamente
         cargarTareas(proyectoActual._id);

         //reiniciar le formulario
         setNomTarea({
             nombre:''
         })
         
     };

    return ( 
        <div className="formulario">
            <form
                onSubmit={agregraTareas}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        placeholder="Nombre de tarea...."
                        className="input-text"
                        name="nombre" 
                        value={nombre}
                        onChange={obtenerNomTarea}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        value={TareaACtualSeleccionada ?"Editar tarea":"Agregar tarea"}
                        className="btn btn-primario btn-block"
                    />
                </div>
            </form>
            {FormularioTarea ? <p className="error mensaje">El nombre de la tarea es obligatorio</p>:null}
        </div>



     );
}
 
export default FormTareas;