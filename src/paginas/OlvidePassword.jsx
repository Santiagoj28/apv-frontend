import {Link} from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../../config/axios'

const OlvidePassword = () => {
  const [email,setEmail]=useState('');
  const [alert,setAlerta]=useState({});

  const handleSubmit = async e =>{
    e.preventDefault();

    if(email === '' || email.length < 6){
      setAlerta({
        msg: 'Debes colocar tu Email',
        error: true
      });
      return;
    }

    try {
      const url = '/veterinarios/olvide-password'
      const {data} = await clienteAxios.post(url,{
        email
      });
      console.log(data)
      setAlerta({  msg : data.msg , error:false  })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error : true
      })
    }

    
  }
 
  const {msg} = alert;
  return (
    <>
        
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">Recupera tu Acceso y no Pierdas <span className="text-black">tus Pacientes</span>  </h1>
          <p className='text-center text-xl text-gray-500 mt-5'>Te enviaremos las instrucciones a tu correo</p>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

          {  (msg)&&
              <Alerta
              alerta={alert}
              />
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
                onChange={e=> setEmail(e.target.value)}
               />
            </div>

            <input type="submit"
              value="Enviar instrucciones"
              className="bg-indigo-600 w-full py-3 px-10 rounded-xl text-white mt-5 font-bold uppercase hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />

          </form>
          <nav className="lg:flex lg:justify-between mt-10" >
            <Link to="/" className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta?Iniciar Sesion</Link>
            <Link to="/olvide-password"className='block text-center my-5 text-gray-500'>¿No tienes cuenta?Crea una</Link>
          </nav>
        </div>  

    </>
  )
}

export default OlvidePassword