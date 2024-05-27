import ListadoPacientes from "../components/ListadoPacientes";
import Formulario from "../components/Formulario";
import { useState } from "react";

const AdministrarPacientes = () => {
  const [mostrarFormulario,setMostrarFormulario]=useState(false)
  return (
    
        <div className="flex flex-col lg:flex-row">
          <button type="button" 
            className="bg-indigo-600 text-white font-bold mx-10 uppercase p-2 rounded-md mb-5 md:hidden"
            onClick={()=> setMostrarFormulario(!mostrarFormulario)}>
            { mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar formulario' }
          </button>

          <div className={`${mostrarFormulario ? 'block': 'hidden md:block'} 'md:w-1/2 lg:w-2/5' `}>
            <Formulario />
          </div>
          <div className="md:w-1/2 lg:w-3/5">
            <ListadoPacientes />
          </div>
        </div>

    
  )
}

export default AdministrarPacientes