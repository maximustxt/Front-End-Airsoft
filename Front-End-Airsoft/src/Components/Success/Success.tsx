//- Componentes:
import { useEffect } from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
// Estilos:
import Style from "./Success.module.css";
//- LOCAL STORAGE:
import UsuarioGetLocalStorage from "../LocalStorage/Usuario/UsuarioGetLocalStorage";

const Success = () => {
  useEffect(() => {
    if (UsuarioGetLocalStorage().id) {
      axios
        .get(
          `https://servidor-airsoft.onrender.com/Carrito/${
            UsuarioGetLocalStorage().id
          }`
        )
        .then((response) => {
          //- Guardo y creo las compras que realice:
          if (response.data.length) {
            response.data.map((e: any) =>
              axios
                .post(
                  `https://servidor-airsoft.onrender.com/Compras/${
                    UsuarioGetLocalStorage().id
                  }`,
                  e
                )
                .then((response) => response)
                .catch((error) => error)
            );
          }
        });
      //- Se vacia el carrito:
      axios
        .delete(
          "https://servidor-airsoft.onrender.com/Carrito/Eliminar_Todo_El_Carrito"
        )
        .then((response) => response)
        .catch((error) => error);
    }
  }, []);

  //-------------------------------Funcion Volver al Inicio:
  const FuncionInicio = () => {
    document.location.href = "/";
  };

  //----------------------------Funcion ir al Perfil:
  const FuncionIrAlPerfil = () => {
    document.location.href = "/Perfil_Del_Usuario";
  };

  return (
    <>
      <NavBar />
      <div className={Style.Container}>
        <p>Compra registrada con exito</p>
        <button onClick={() => FuncionInicio()} className={Style.Btn}>
          Volver al Inicio
        </button>
        <button onClick={() => FuncionIrAlPerfil()} className={Style.Btn}>
          Ir al Perfil
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Success;
