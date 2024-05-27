import {Link,useNavigate} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Alerta from '../components/Alerta';
import clienteAxios from '../../config/axios';
import { useState } from 'react';

 const Login = () => {
   
   const navegate = useNavigate();
   const {setAuth} = useAuth()

   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('')
   const [alerta,setAlerta]=useState({}); 

   const handleSubmit= async(e)=>{
    e.preventDefault();
    
    if([email,password].some(array => array.trim()==='')){
      setAlerta({msg:'Ambos campos son obligatorios', error:true});
      return
    }
    try {
      const url='/veterinarios/login'
      const {data} = await clienteAxios.post(url,{email,password});
      setAuth(data)
      
      localStorage.setItem('token',data.token);

      navegate('/admin');
      
    } catch (error) {
      setAlerta({msg:error.response.data.msg, error:true})
    }

    
  }

  const {msg} = alerta ;
  return (
    <>
    
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesion y Administra tus <span className="text-black">Pacientes</span> </h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          {msg &&
          <Alerta alerta={alerta}/>
          }
          <form onSubmit={handleSubmit}>

            <div className="my-5">
              <label  className="uppercase text-gray-600 block text-xl font-bold">
                Email
              </label>
              <input 
                type="email"
                placeholder="Email de Registro"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={email}
                onChange={e=>setEmail(e.target.value)}
               />
            </div>

            <div className="my-5">
              <label  className="uppercase text-gray-600 block text-xl font-bold">
                Password
              </label>
              <input 
                type="password"
                placeholder="Password de Registro"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={e=> setPassword(e.target.value)}
               />
            </div>

            <input type="submit"
              value="Iniciar Sesion"
              className="bg-indigo-600 w-full py-3 px-10 rounded-xl text-white mt-5 font-bold uppercase hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />

          </form>

          <nav className="lg:flex lg:justify-between mt-10" >
            <Link to="/registrar" className='block text-center my-5 text-gray-500'>No tienes una cuenta?Registrate</Link>
            <Link to="/olvide-password"className='block text-center my-5 text-gray-500'>¿Olvidaste tu contraseña?</Link>
          </nav>
        </div>
      
    </>
  )
}



export default Login
