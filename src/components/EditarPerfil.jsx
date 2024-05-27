import AdminNav from "./AdminNav"
import useAuth from "../../hooks/useAuth"
import { useState,useEffect } from "react";
import Alerta from "./Alerta";


const EditarPerfil = () => {

  const {auth,actualizarPerfil}= useAuth();
  const [perfil,setPerfil] = useState({});
  const[alerta,setAlerta]=useState({});

  useEffect(() => {
    setPerfil(auth);
    
    
  }, [auth])

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const {nombre,email} = perfil;
    if([nombre.trim(),email.trim()].includes('')){
      setAlerta({msg:'Nombre y Email no puede ir vacios.',error:true});
      return;

    }
    const resultado =  await actualizarPerfil(perfil);
    setAlerta(resultado)
    
  }
  
  const {msg}=alerta
  return (
    <>
    
        <AdminNav />
        <h2 className="font-bold text-3xl text-center mt-10 ">Editar Perfil</h2>
        <p className="text-xl text-center mt-5 mb-10">Modifica tu {''} 
            <span className="text-indigo-600">Informacion aqui</span>
        </p>

        <div className="flex justify-center">
          <div className="bg-white shadow w-full md:w-1/2 rounded-lg p-5">
            {msg &&
             <Alerta alerta={alerta}/>}
              <form onSubmit={handleSubmit}>

                <div className="my-3 ">
                  <label htmlFor="nombre" className="uppercase font-bold text-gray-600">Nombre</label>
                  <input type="text"
                   className="border bg-gray-50 w-full p-2 mt-5 rounded-lg "
                   name="nombre"
                   value={perfil.nombre || ''}
                   onChange={e => setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value
                   })} />

                </div>

                <div className="my-3 ">
                  <label htmlFor="web" className="uppercase font-bold text-gray-600">Web</label>
                  <input type="text"
                   className="border bg-gray-50 w-full p-2 mt-5 rounded-lg "
                   name="web" 
                   value={perfil.web || ''}
                   onChange={e => setPerfil({
                    ...perfil,
                   [e.target.name]: e.target.value
                   })}/>

                </div>

                <div className="my-3 ">

                  <label htmlFor="telefono" className="uppercase font-bold text-gray-600">Telefono</label>
                  <input type="text"
                   className="border bg-gray-50 w-full p-2 mt-5 rounded-lg "
                   name="telefono" 
                   value={perfil.telefono || ''}
                   onChange={e => setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value
                   })}/>

                </div>

                <div className="my-3 ">
                  <label htmlFor="email" className="uppercase font-bold text-gray-600">Email</label>
                  <input type="email"
                   className="border bg-gray-50 w-full p-2 mt-5 rounded-lg "
                   name="email"
                   value={perfil.email || ''}
                   onChange={e => setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value
                   })}/>

                </div>

                <input type="submit" 
                className="bg-indigo-700  text-white font-bold px-10 py-3 rounded-lg uppercase mt-5"
                value="Guardar Cambios"/>
 
              </form>
          </div>

        </div>
    </>
     
  )
}

export default EditarPerfil