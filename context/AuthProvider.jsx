import {useState,useEffect,createContext} from 'react';
import clienteAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [auth,setAuth] = useState({})
    const [cargando,setCargando]=useState(true);
    

    useEffect(()=>{
        const autenticarUsuario = async ()=>{
            const token = localStorage.getItem('token');
            
            if(!token){
                setCargando(false);
            };

            const config = {
                headers : {
                    "Content-Type":"application/json",
                    Authorization : `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios('/veterinarios/perfil',config);
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({})
            }
            setCargando(false)
        }
        autenticarUsuario();
    },[]);

    const actualizarPerfil =async (datos)=>{
        const token = localStorage.getItem('token');

        const config = {
            headers : {
                "Content-Type":"application/json",
                Authorization : `Bearer ${token}`
            }
        }
        try {
            const url = `/veterinarios/perfil/${datos._id}`;
            const {data}=await clienteAxios.put(url,datos,config);
            return {
                msg: "Almacenado correctamente"
            }

        } catch (error) {
            return {
               msg: error.response.data.msg,
               error:true
            }
        }
    }

    const guardarPassword = async (datos) =>{
        const token = localStorage.getItem('token');

        const config = {
            headers : {
                "Content-Type":"application/json",
                Authorization : `Bearer ${token}`
            }
        }
        
        
        try {
            const url = '/veterinarios/actualizar-password';
            const {data}= await clienteAxios.put(url,datos,config);
            return {
                msg: data.msg,
                error:false
            }
        } catch (error) {
           return{
            msg:error.response.data.msg,
            error:true
           }
        }
    }

    const cerrarSesion = ()=>{
        localStorage.removeItem('token');
        setAuth({});
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export{
    
    AuthProvider
}

export default AuthContext