import { Routes, Route } from "react-router-dom";
//- Components:
import Home from "./Components/Home/Home";
import Armas from "./Components/Armas/Armas";
import Aviacion from "./Components/Aviacion-De-Guerra/Aviacion";
import Naval from "./Components/Naval-De-Guerra/Naval";
import HistoriasDeGuerra from "./Components/Historias-De-Guerra/Historias_De_Guerra";
import Cañones from "./Components/Cañones-De-Guerra/Cañones";
import Vehiculos from "./Components/Vehiculos-De-Guerra/Vehiculos";
import Detail from "./Components/Detail/Detail";
import DetailHistoriasDeGuerra from "./Components/Detail Historias De guerra/DetailHistoriasDeGuerra";
import DetailArticulosDeVenta from "./Components/DetailArticulosDeVenta/DetailArticulosDeVenta";
import Perfil from "./Components/Perfil/Perfil";
import Success from "./Components/Success/Success";
import Carrito from "./Components/Carrito/Carrito";

//- Productos:
import Indumentarias from "./Components/Productos/Indumentarias/Indumentarias";
import Cascos from "./Components/Productos/Cascos/Cascos";
import Armas_Producto from "./Components/Productos/Armas/Armas";
import Cargadores from "./Components/Productos/Cargadores/Cargadores";
import Chalecos from "./Components/Productos/Chalecos/Chalecos";
import Visores from "./Components/Productos/Visores/Visores";
import Estuches from "./Components/Productos/Estuches/Estuches";
import Balas from "./Components/Productos/Balas/Balas";
import Botas from "./Components/Productos/Botas/Botas";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Armas_De_Guerra" element={<Armas />} />
      <Route path="/success" element={<Success />} />
      <Route path="/Aviacion_De_Guerra" element={<Aviacion />} />
      <Route path="/Cañones_De_Guerra" element={<Cañones />} />
      <Route path="/Naval_De_Guerra" element={<Naval />} />
      <Route path="/Historias_De_Guerra" element={<HistoriasDeGuerra />} />
      <Route path="/Vehiculos_De_Guerra" element={<Vehiculos />} />
      <Route path="/Detail/:id" element={<Detail />} />
      <Route path="/Perfil_Del_Usuario" element={<Perfil />} />
      <Route
        path="/DetailHistoriaDeGuerra/:id"
        element={<DetailHistoriasDeGuerra />}
      />
      <Route
        path="/DetailArticuloDeVenta/:id"
        element={<DetailArticulosDeVenta />}
      />
      <Route path="/Carrito" element={<Carrito />} />

      {/*---------------PRODUCTOS----------------*/}
      <Route path="/Armas" element={<Armas_Producto />} />
      <Route path="/Chalecos" element={<Chalecos />} />
      <Route path="/Indumentarias" element={<Indumentarias />} />
      <Route path="/Estuches" element={<Estuches />} />
      <Route path="/Balas" element={<Balas />} />
      <Route path="/Botas" element={<Botas />} />
      <Route path="/Cargadores" element={<Cargadores />} />
      <Route path="/Casco" element={<Cascos />} />
      <Route path="/Visores" element={<Visores />} />
    </Routes>
  );
}

export default App;
