import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FuncionObtenerCantidadCarrito } from "../../Redux/Actions/Funcion_Actions";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
//- Components:
import NavBar from "../NavBar/NavBar";
//- Interfaces:
import DetailArticulosDeVentas from "../../Interfaces/DetailArticulosDeVenta";
//- Styles:
import Style from "./DetailArticulosDeVenta.module.css";

//- LOCAL STORAGE:
import UsuarioGetLocalStorage from "../LocalStorage/Usuario/UsuarioGetLocalStorage";
//- Components:
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";

const DetailArticulosDeVenta = () => {
  const dispatch = useDispatch();
  const [Details, SetDetail]: any = useState({});
  const [ImagenSeleccionada, SetImagenSeleccionada]: any = useState("");
  const { id } = useParams();

  useEffect(() => {
    window.scroll(0, 0);
    // buscar el detail del producto
    axios
      .get(
        `https://servidor-airsoft.onrender.com/Articulos_De_Venta/Detail/${id}`
      )
      .then((response: { data: DetailArticulosDeVentas }) => {
        SetDetail(response.data); // Corregido aquí
      })
      .catch((error) => console.log(error));

    //se desmonta:
    return () => {
      SetDetail({});
    };
  }, []);

  //---------------------------------COMPRAR PRODUCTO:

  const FuncionComprarProducto = () => {
    if (!UsuarioGetLocalStorage()) {
      toast.error("Debes Loguearte para poder comprar");
    } else {
      axios
        .post(
          `https://servidor-airsoft.onrender.com/Carrito/${
            UsuarioGetLocalStorage().id
          }`,
          Details
        )
        .then((response: { data: DetailArticulosDeVentas }) => {
          //- Pedimos la cantidad:
          dispatch(FuncionObtenerCantidadCarrito(UsuarioGetLocalStorage().id));
          toast.success("Producto agregado correctamente");
        })
        .catch((error) => {
          toast.error(error.response.data);
        });

      axios
        .delete(
          `https://servidor-airsoft.onrender.com/Carrito/${id}?idUser=${
            UsuarioGetLocalStorage().id
          }`
        )
        .then((res) => res)
        .catch((error) => error);
    }
  };

  //--------------------------------SELECCION DE IMAGENES:

  const FuncionSelectImagen = (Dato: string): any => {
    const imagenSeleccionada = Details.Imagenes.find((e: string) => e === Dato);
    if (imagenSeleccionada) {
      SetImagenSeleccionada(imagenSeleccionada);
    }
  };

  return (
    <>
      <NavBar />
      {Details?.Name ? (
        <div className={Style.Container}>
          <br />
          <br />
          <h2>{Details.Name}</h2>
          <p>{Details.Tipo}</p>
          <div className={Style.ContainerImgSelect}>
            {ImagenSeleccionada.length ? (
              <img src={ImagenSeleccionada} />
            ) : (
              <img src={Details.Imagen} />
            )}
          </div>
          {/*------------------------------------------------------------------*/}
          <div className={Style.ContainerImg}>
            {Details.Imagenes &&
              Details.Imagenes.map((e: string, index: number) => (
                <div
                  className={
                    ImagenSeleccionada === e
                      ? Style.ContainerImagenSelect // Agregamos Style.ContainerImagenSelect cuando está seleccionada
                      : Style.ContainerImgNoSelect // Agregamos Style.ContainerImgNoSelect cuando no está seleccionada
                  }
                  key={index}
                >
                  <a onClick={() => FuncionSelectImagen(e)}>
                    <img src={e} alt="Imagen" />
                  </a>
                </div>
              ))}
          </div>
          <div className={Style.ContainerCompra}>
            <h4>{`$ ${Details.Precio}`}</h4>
            <button onClick={() => FuncionComprarProducto()}>Comprar</button>
          </div>
          <div className={Style.ContainerDescripcion}>
            <h2>Descripcion :</h2>
            <p>{Details.Descripcion}</p>
          </div>
          <Toaster position="bottom-left" reverseOrder={true} />
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

export default DetailArticulosDeVenta;
