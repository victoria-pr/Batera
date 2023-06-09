import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import TareasScreen from "./components/TareasScreen";
import CalendarioScreen from "./components/CalendarioScreen";
import PerfilScreen from "./components/PerfilScreen";
import RecursosScreen from "./components/RecursosScreen";
import ValoracionesScreen from "./components/ValoracionesScreen";
import BoletinScreen from "./components/BoletinScreen";
import PerfilSilverScreen from "./components/PerfilSilverScreen";
import FormularioScreen from "./components/FormularioScreen";
import NewFormScreen from "./components/NewFormScreen";

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
        <Route path="/login" element={<Login />} />
        <Route path="/perfilSilver/:id" element={<PerfilSilverScreen />} />
        <Route path="/formularioSilver/:id" element={<FormularioScreen />} />
        <Route
          path="/formularioSilver/:id/create"
          element={<NewFormScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
