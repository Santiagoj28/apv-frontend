import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const Header = () => {
    const {cerrarSesion} =useAuth();
  return (
    <header className="py-9 bg-indigo-900  ">
        <div className="flex flex-col lg:flex-row justify-between container mx-auto items-center">
            <h1 className="text-2xl font-bold text-indigo-200 text-center">Administrador de Pacientes
            {' '}<span className="text-white">Veterinaria</span> </h1>

            <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
                <Link to='/admin' className="text-white text-sm uppercase font-bold hover:text-gray-400">Pacientes </Link>
                <Link to='perfil' className="text-white text-sm uppercase font-bold hover:text-gray-400">Perfil</Link>

                <button type="button"
                 className="text-white text-sm uppercase font-bold hover:text-gray-400"
                 onClick={cerrarSesion}>Cerrar Sesion</button>
            </nav>
        </div>

        

    </header>
  )
}

export default Header