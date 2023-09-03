import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
//- Interfaces
import StateGlobalRedux from "../../../Interfaces/Redux/Redux";
import Producto from "../../../Interfaces/Productos";
//- Funciones Actions:
import { FuncionGetProductos } from "../../../Redux/Actions/Funcion_Actions";
//- Stylos:
import Style from "./Estuches.module.css";
//- Components:
import NavBar from "../../NavBar/NavBar";
import Card_Producto from "../../Card-Productos/Card-Productos";
import Footer from "../../Footer/Footer";
import Loading from "../../Loading/Loading";

const Estuches = () => {
  const dispatch = useDispatch();
  const Productos = useSelector((state: StateGlobalRedux) => state.Productos);

  useEffect(() => {
    dispatch(FuncionGetProductos());
    //se desmonta:
  }, []);

  return (
    <>
      <NavBar />
      {Productos.length ? (
        <div className={Style.Container}>
          <div className={Style.ContainerArticulos}>
            {Productos.length
              ? Productos?.filter((e: Producto) => e.Tipo === "Estuches").map(
                  ({ id, Imagen, Tipo, Name, Precio }) => (
                    <Card_Producto
                      id={id}
                      Imagen={Imagen}
                      Tipo={Tipo}
                      Name={Name}
                      Precio={Precio}
                    />
                  )
                )
              : ""}
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Estuches;
