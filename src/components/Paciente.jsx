import usePacientes from "../../hooks/usePacientes";

const Paciente = ({paciente}) => {
    const {email,nombre,propietario,sintomas,fecha,_id }=paciente;

    const { setEdicion,eliminarPaciente}=usePacientes();

    const formatearfecha = (fecha)=>{
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-MX',{dateStyle:'long'}).format(nuevaFecha);
    }
  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold uppercase text-indigo-700 my-2">Nombre:{' '}
            <span className="font-normal normal-case text-black">{nombre}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-2">Propietario:{' '}
            <span className="font-normal normal-case text-black">{propietario}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-2">Email:{' '}
            <span className="font-normal normal-case text-black">{email}</span>
        </p>
        
        <p className="font-bold uppercase text-indigo-700 my-2">Fecha:{' '}
            <span className="font-normal normal-case text-black">{formatearfecha(fecha)}</span>
        </p>

        <p className="font-bold uppercase text-indigo-700 my-2">Sintomas:{' '}
            <span className="font-normal normal-case text-black">{sintomas}</span>
        </p>

        <div className="flex justify-between my-5">
            <button type="button"
            onClick={()=>setEdicion(paciente)} 
            className="py-2 px-10 bg-indigo-600  hover:bg-indigo-800 rounded-md text-white uppercase font-bold">
                Editar
            </button>
            <button type="button"  
            onClick={()=>eliminarPaciente(_id)}
            className="py-2 px-10 bg-red-600  hover:bg-red-800 rounded-md text-white uppercase font-bold">
                Eliminar
            </button>

        </div>

    </div>
  )
}

export default Paciente