import usePacientes from "../../hooks/usePacientes"
import Paciente from "./Paciente";

const ListadoPacientes = () => {
  const {pacientes}=usePacientes();
  //console.log(pacientes)
  return (
    <>
      { pacientes.length ? (
        <>
          <h2 className="font-black text-center text-3xl">Listado Pacientes</h2>
          <p className=" text-lg mt-5 font-bold text-gray-500 text-center mb-10 ">Administra tus {''} 
            <span className="text-indigo-500">pacientes y citas:</span>
          </p>

          {pacientes.map(paciente => (
            <Paciente 
              key={paciente._id}
              paciente={paciente}
            />
          ))}
        </>
       ) : (
        <>
          <h2 className="font-black text-center text-3xl">No hay pacientes</h2>
          <p className=" text-lg mt-5 font-bold text-gray-500 text-center mb-10 ">Comienza agregando Pacientes{''} <span className="text-indigo-500">y aparecerán en este lugar:</span> </p>
        </>
      ) }
    </>
  )
}

export default ListadoPacientes