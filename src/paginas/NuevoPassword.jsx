import {useNavigate,useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../../config/axios';

//import clienteAxios from '../../config/axios'

const NuevoPassword = () => {
  const [password,setPassword] = useState('');
  const [passwordRepeat,setPasswordRepeat] = useState('');
  const [tokenValido,setTokenValido]=useState(false);
  const [alert,setAlerta] = useState({});

  let navigate = useNavigate();

  const params = useParams();

  

  const {token} = params
  
  useEffect(  () => {
    const comprobarToken = async ()=>{
      try {
        const url = `/veterinarios/restablecer-password/${token}`
        await clienteAxios(url);
        setAlerta({msg: 'Coloca tu nuevo password'})
        setTokenValido(true)
      } catch (error) {
          setAlerta({ msg : 'Hubo un error en el enlace', error: true})
          return
          
      }
      
    }
    comprobarToken();
  },[]);

  

  const handleSubmit = async e =>{
    e.preventDefault();

    if(password === ''){
      setAlerta({msg:'Password no puede ir vacio',error : true})
      return
    }else if(passwordRepeat === ''){
      setAlerta({msg:'Debes confirmar tu password',error : true})
      return
    }
    if(password !== passwordRepeat){
      setAlerta({msg:'Los Password Deben ser Iguales',error:true})
      return
    }
    if(password < 6 || passwordRepeat < 6){
      setAlerta({msg: 'Password debe contener mas de 6 caracteres',error:true})
      return
    }

    try {
      const url = `/veterinarios/restablecer-password/${token}`
      const {data} = await clienteAxios.post(url,{password})
      setPasswordModificado(true);
      setTokenValido(false);
      setAlerta({msg:'Password actualizado correctamente',error:false})
      setTimeout(() => {
        navigate('/')
      }, 3000);
      //console.log(data);

      setAlerta({msg: data.msg ,error:false})
    } catch (error) {
      setAlerta({msg : error.response.data.msg})
    }
  }

  const {msg} = alert;
  return (
    <>
        
    <div>
      <h1 className="text-indigo-600 font-black text-6xl">Restablecer Password y <span className="text-black">sigue Administrando </span>tus Pacientes </h1>
      <p className='text-center text-xl text-gray-500 mt-5'>Te enviaremos las instrucciones a tu correo</p>
    </div>

    <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

      {  (msg)&&
                <Alerta
                alerta={alert}
                />
      }

      { tokenValido && (
      <>
        <form onSubmit={handleSubmit} >

          <div className="my-5">
            <label  className="uppercase text-gray-600 block text-xl font-bold">
              Nuevo Password
            </label>
            <input 
              type="password"
              placeholder="New Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e=> setPassword(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label  className="uppercase text-gray-600 block text-xl font-bold">
              Confirmar Password
            </label>
            <input 
              type="password"
              placeholder="Repetir Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={passwordRepeat}
              onChange={e=> setPasswordRepeat(e.target.value)}
            
              
            />
          </div>

          <input type="submit"
            value="Cambiar Password"
            className="bg-indigo-600 w-full py-3 px-10 rounded-xl text-white mt-5 font-bold uppercase hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />

        </form>

       
      </>
      )}
      
    </div>  

</>
  )
}

export default NuevoPassword