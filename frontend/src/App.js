import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import TareasScreen from "./components/TareasScreen";
import CalendarioScreen from "./components/CalendarioScreen";
import PerfilScreen from "./components/PerfilScreen";
import RecursosScreen from "./components/RecursosScreen";
import ValoracionesScreen from "./components/ValoracionesScreen";
import BoletinScreen from "./components/BoletinScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/tareas" element={<TareasScreen />} />
        <Route path="/calendario" element={<CalendarioScreen />} />
        <Route path="/perfil" element={<PerfilScreen />} />
        <Route path="/recursos" element={<RecursosScreen />} />
        <Route path="/valoraciones" element={<ValoracionesScreen />} />
        <Route path="/boletin" element={<BoletinScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
