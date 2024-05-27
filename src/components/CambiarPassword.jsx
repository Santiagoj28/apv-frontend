import AdminNav from "./AdminNav"
import { useState } from "react";
import Alerta from "./Alerta";
import useAuth from "../../hooks/useAuth";

const CambiarPassword = () => {
  const { guardarPassword}=useAuth();
  

  const [alerta,setAlerta]=useState({})
  const [password,setPassword]=useState({
    pwd_actual : '',
    pwd_nuevo : ''
  });
  const handleSubmit = async e=>{
    e.preventDefault();

    if(Object.values(password).some(array => array.trim() === "")){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error : true
      })
      return
    }

    if(password.pwd_nuevo.length < 6 ){
      setAlerta({
        msg: "El password debe tener minimo 6 caracteres ",
        error:true
      })
      return;
    }

     const resultado = await guardarPassword(password);
     setAlerta(resultado)
     setPassword({
      pwd_actual:'',
      pwd_nuevo:''
     })
     
     
    
  }
  const {msg}= alerta;

  return (
    <>
      <AdminNav />

      <h2 className="font-bold text-3xl text-center mt-10 ">Editar Password</h2>
      <p className="text-xl text-center mt-5 mb-10">Modifica tu {''} 
        <span className="text-indigo-600">password aqui</span>
      </p>

        <div className="flex justify-center">
          <div className="bg-white shadow w-full md:w-1/2 rounded-lg p-5">
            {msg &&
             <Alerta alerta={alerta}/>}
              <form onSubmit={handleSubmit}>

                <div className="my-3 ">
                  <label htmlFor="password" className="uppercase font-bold text-gray-600">Password Actual</label>
                  <input type="password"
                   className="border bg-gray-50 w-full p-2 mt-5 rounded-lg "
                   name="pwd_actual"
                   placeholder="Password Actual"
                   value={password.pwd_actual || ''}
                   onChange={e=> setPassword({
                    ...password,
                    [e.target.name]:e.target.value
                   })}
                    />

                </div>

                <div className="my-3 ">
                  <label htmlFor="password" className="uppercase font-bold text-gray-600">Password nuevo</label>
                  <input type="password"
                   className="border bg-gray-50 w-full p-2 mt-5 rounded-lg "
                   name="pwd_nuevo"
                   value={password.pwd_nuevo || ''}
                   placeholder="Password nuevo"
                   onChange={e=> setPassword({
                    ...password,
                    [e.target.name]:e.target.value
                   })}
                    />

                </div>

                <input type="submit" 
                className="bg-indigo-700  text-white font-bold px-10 py-3 rounded-lg uppercase mt-5"
                value="Actualizar password"/>
 
              </form>
          </div>

        </div>
    </>
    
  )
}

export default CambiarPassword