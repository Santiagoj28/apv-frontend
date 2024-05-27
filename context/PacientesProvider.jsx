import {useState,useEffect,createContext} from 'react';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';

const PacientesContext = createContext();

export const PacientesProvider = ({children}) => {
    
    const[pacientes,setPacientes]=useState([]);
    const[paciente,setPaciente]=useState({});
    const {auth }=useAuth();

    useEffect(()=>{

        const obtenerPacientes = async () =>{
            try {
                const token = localStorage.getItem('token');
                if(!token)return;
                const config = {
                    headers:{
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data}= await clienteAxios('/pacientes',config);
                setPacientes(data)
                
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes();
    },[auth]);

    //guardar paciente
    const guardarPaciente = async(paciente)=>{

        //obtener el bearer token y configurar el token
        const token = localStorage.getItem('token');
        const config = {
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if(paciente.id){
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`,paciente,config);

                const pacientesEditado = pacientes
                .map(pacienteState => pacienteState._id === data._id ? data : pacienteState);
                setPacientes(pacientesEditado);
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
              
                const {data}=  await clienteAxios.post('/pacientes',paciente,config);
                const{updateAt,createAt,__v, ...pacienteAlmacenado} = data
    
                setPacientes([pacienteAlmacenado,...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }

       
    }

    //update paciente
    const setEdicion = async(paciente)=>{
        setPaciente(paciente);
    }

    const eliminarPaciente = async id=>{
        const confirmar = confirm('Confirmas que deseas eliminar?')
        if(confirmar){
            try {
                //obtener el bearer token y configurar el token
                const token = localStorage.getItem('token');
                const config = {
                    headers:{
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios.delete(`/pacientes/${id}`,config);
                const pacienteActualizado = pacientes.filter(pacienteState => pacienteState._id !== id);
                setPacientes(pacienteActualizado);
                
            } catch (error) {
                console.log(error)
            }
        }
    }

    
  return (
    <PacientesContext.Provider
    value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente,
        
    }}>
        {children}
    </PacientesContext.Provider>
  )
}

export default PacientesContext