import {useState} from 'react'
import {Link} from "react-router-dom";
import Alerta from '../components/Alerta';
import clienteAxios from '../../config/axios';


const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const [alert,setAlerta]=useState({});
  
  const handleSubmit = async(e) => {
    e.preventDefault()

    if([nombre,email,password,repetirPassword].includes('')){
      setAlerta({msg: 'Hay campos vacios', error: true})
      return;
    }
    if(password !== repetirPassword){
      setAlerta({msg: 'Los passwords no son iguales', error: true})
      return;
    }
    if(password.length < 8){
      setAlerta({msg: 'El password debe tener mas de 8 caracteres', error: true})
      return;
    }
    setAlerta({})

    //crear el usuario en la api
    try {
      const url = `/veterinarios`
      const respuesta = await clienteAxios.post(url,{nombre,email,password})
      setAlerta({
        msg: respuesta.data.msg,
        error:false
      })
     
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
        
    }
  }
  const {msg} = alert
  return (
    <>
       
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">Crea tu cuenta y <span className="text-black">Administra</span> tus Pacientes </h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          {  (msg)&&
             <Alerta
             alerta={alert}
             />
          }
          
          
          
          <form action="" onSubmit={handleSubmit} id="formulario">
          
            <div className="my-5">

              <label  className="uppercase text-gray-600 block text-xl font-bold">
                Nombre
              </label>
              <input 
                type="text"
                placeholder="Nombre de Registro"
                value={nombre}
                onChange={e=> setNombre(e.target.value)}
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
               />
            </div>

            <div className="my-5">
              <label  className="uppercase text-gray-600 block text-xl font-bold">
                Email
              </label>
              <input 
                type="email"
                placeholder="Email de Registro"
                value={email}
                onChange={e=> setEmail(e.target.value)}
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
               />
            </div>

            <div className="my-5">
              <label  className="uppercase text-gray-600 block text-xl font-bold">
                Password
              </label>
              <input 
                type="password"
                placeholder="Password de Registro"
                value={password}
                onChange={e=> setPassword(e.target.value)}
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
               />
            </div>

            <div className="my-5">
              <label  className="uppercase text-gray-600 block text-xl font-bold">
                Confirmar Password
              </label>
              <input 
                type="password"
                value={repetirPassword}
                onChange={e=> setRepetirPassword(e.target.value)}
                placeholder="Password Confirma tu Password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
               />
            </div>

            <input type="submit"
              value="Registrar"
              className="bg-indigo-600 w-full py-3 px-10 rounded-xl text-white mt-5 font-bold uppercase hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />
           

          </form>

          <nav className="lg:flex lg:justify-between mt-10" >
            <Link to="/" className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta?Iniciar Sesion</Link>
            <Link to="/olvide-password"className='block text-center my-5 text-gray-500'>¿Olvidaste tu contraseña?</Link>
          </nav>
        </div>    
        
    </>
  )
}

export default Registrar