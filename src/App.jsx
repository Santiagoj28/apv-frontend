import {BrowserRouter,Route,Routes} from "react-router-dom"

import RutaProtegida from "./layouts/RutaProtegida";
import AuthLayouts from "./layouts/AuthLayouts";

//rutas publicas
import Login from "./paginas/login"
import Registrar from "./paginas/registrar"
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"
import OlvidePassword from "./paginas/OlvidePassword"
import NuevoPassword from "./paginas/NuevoPassword"

//CONTEXT
import { AuthProvider } from "../context/AuthProvider"
import { PacientesProvider } from "../context/PacientesProvider";

//rutas privadas
import AdministrarPacientes from "./paginas/AdministrarPacientes";
import EditarPerfil from "./components/EditarPerfil";
import CambiarPassword from "./components/CambiarPassword";

function App() {
  

  return (
    <BrowserRouter>

      <AuthProvider>
        <PacientesProvider>

          <Routes>

            <Route path="/" element={<AuthLayouts />}>
                <Route index element={<Login />} />
                <Route path="registrar" element={< Registrar/>} />
                <Route path="confirmar/:id" element={< ConfirmarCuenta/>} />
                <Route path="olvide-password" element={< OlvidePassword/>} />
                <Route path="olvide-password/:token" element={< NuevoPassword/>} />
            </Route>

            <Route path="/admin" element={<RutaProtegida/>}>
                <Route index element={<AdministrarPacientes/>}/>
                <Route path="perfil" element={<EditarPerfil />} />
                <Route path="cambiar-password" element={<CambiarPassword />} />

            </Route>

          </Routes>


        </PacientesProvider>
      </AuthProvider>
     
    </BrowserRouter>
  )
}

export default App
