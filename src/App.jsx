import { BrowserRouter, Routes, Route } from "react-router-dom";
import Usuarios from "./Usuarios";
import ActualizarUsuario from "./ActualizarUsuario";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Usuarios />} />
        <Route path="/actualizar/:id" element={<ActualizarUsuario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;