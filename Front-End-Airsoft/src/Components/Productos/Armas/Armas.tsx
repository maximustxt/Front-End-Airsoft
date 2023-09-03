import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
//- Interfaces:
import StateGlobalRedux from "../../../Interfaces/Redux/Redux";
import Producto from "../../../Interfaces/Productos";
//- Funciones Actions:
import { FuncionGetProductos } from "../../../Redux/Actions/Funcion_Actions";
//- Stylos:
import Style from "./Armas.module.css";
//- Components:
import NavBar from "../../NavBar/NavBar";
import Card_Producto from "../../Card-Productos/Card-Productos";
import Footer from "../../Footer/Footer";
import Loading from "../../Loading/Loading";

const Armas = () => {
  const dispatch = useDispatch();
  const Productos = useSelector((state: StateGlobalRedux) => state.Productos);

  useEffect(() => {
    dispatch(FuncionGetProductos());
  }, []);
  return (
    <>
      <NavBar />
      <div className={Style.Container}>
        {Productos.length ? (
          <div className={Style.ContainerArticulos}>
            {Productos.length
              ? Productos.filter(
                  (e: Producto) => e.Tipo === "Arma Airsoft"
                ).map(({ id, Imagen, Tipo, Name, Precio }) => (
                  <Card_Producto
                    id={id}
                    Imagen={Imagen}
                    Tipo={Tipo}
                    Name={Name}
                    Precio={Precio}
                  />
                ))
              : ""}
          </div>
        ) : (
          <Loading />
        )}
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Armas;
