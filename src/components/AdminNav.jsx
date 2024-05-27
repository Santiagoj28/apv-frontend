import {Link} from 'react-router-dom'

const AdminNav = () => {
  return (
    <nav className='flex gap-3 justify-end'>
        <Link to='/admin/perfil' className="uppercase font-bold text-indigo-500 hover:text-indigo-700">Perfil </Link>
        <Link to='/admin/cambiar-password' className=" uppercase font-bold text-indigo-500 hover:text-indigo-700">Cambiar Password</Link>
    </nav>
  )
}

export default AdminNav