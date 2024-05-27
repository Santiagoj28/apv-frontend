import { useState,useEffect } from "react"
import Alerta from "./Alerta";
import usePacientes from "../../hooks/usePacientes";

const Formulario = () => {

  const [nombre,setNombre]=useState('');
  const [propietario,setPropietario]=useState('')
  const [email,setEmail]=useState('');
  const [fecha,setFecha]=useState('');
  const [sintomas,setSintomas]=useState('');
  const [id,setId]=useState(null);

  const [alerta,setAlerta]=useState({});
  const {guardarPaciente,paciente}=usePacientes();
  //console.log(paciente);

  useEffect(() => {
    if(paciente?.nombre){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id)
      
    }
  }, [paciente])
  

  

  const handleSubmit =  e=>{
    e.preventDefault()

    //validar el formulario
    if([nombre,propietario,email,fecha,sintomas].some(array=> array.trim() ==='')){
      setAlerta({msg:'Todos los campos son obligatorios',error:true})
      return;
    }
    setAlerta({});
    guardarPaciente({nombre,propietario,email,fecha,sintomas,id})
    setAlerta({msg:'Guardado correctamente',error:false})

    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
    setId('')

    
  }

  const {msg}=alerta
  return (
    <>
      <p className="text-lg text-center mb-10">Agrega tus pacientes y {' '}
          <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      {msg && (
        <Alerta alerta={alerta} />
      )}
      <form className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="mascota" 
            className="text-gray-700 uppercase font-bold" >Nombre Mascota</label>
            <input
             type="text"
             id="mascota"
             name="mascota"
             placeholder="Nombre de la Mascota"
             className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
             value={nombre}
             onChange={e=> setNombre(e.target.value)}
             />

          </div>

          <div className="mb-5">
            <label htmlFor="propietario" 
            className="text-gray-700 uppercase font-bold" >Nombre Propietario</label>
            <input
             type="text"
             id="propietario"
             name="propietario"
             placeholder="Nombre de la Propietario"
             className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
             value={propietario}
             onChange={e=> setPropietario(e.target.value)}
             />

          </div>

          <div className="mb-5">
            <label htmlFor="email" 
            className="text-gray-700 uppercase font-bold" >Email Propietario</label>
            <input
             type="email"
             id="email"
             name="email"
             placeholder="Email del Propietario"
             className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
             value={email}
             onChange={e=> setEmail(e.target.value)}
             />

          </div>

          <div className="mb-5">
            <label htmlFor="fecha" 
            className="text-gray-700 uppercase font-bold" >Fecha Alta:</label>
            <input
             type="date"
             id="fecha"
             name="fecha"
             className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
             value={fecha}
             onChange={e=> setFecha(e.target.value)}
             />

          </div>

          <div className="mb-5">
            <label htmlFor="sintomas" 
            className="text-gray-700 uppercase font-bold" >Sintomas:</label>
            <textarea
             id="sintomas"
             className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
             placeholder="Describe los sintomas "
             value={sintomas}
             onChange={e=> setSintomas(e.target.value)}
             
             />
          </div>

          <input type="submit" value={id ? 'Guardar cambios': 'Registrar Paciente'} 
            className=" bg-indigo-600 p-3 rounded-md w-full
            text-white font-bold uppercase hover:bg-indigo-900 cursor-pointer transition-colors lg:w-auto " />
      </form>

      
    </>
  )
}

export default Formulario