import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Style from "./Carrito.module.css";
import toast, { Toaster } from "react-hot-toast";
//- Interfaces:
import StateGlobalRedux from "../../Interfaces/Redux/Redux";
import { Carritos, Props } from "../../Interfaces/Carrito";
//- ICONOS:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faTrash,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
//- Funciones Actions:
import {
  FuncionObtenerPrecioTotal,
  FuncionModificarContador,
  FuncionObtenerCarrito,
  FuncionObtenerCantidadCarrito,
} from "../../Redux/Actions/Funcion_Actions";
//- LOCAL STORAGE :
import UsuarioGetLocalStorage from "../LocalStorage/Usuario/UsuarioGetLocalStorage";
import DeleteIdCarritoLocalStorage from "../LocalStorage/Id-Carrito/DeleteIdCarritoLocalStorage";
import PostIdCarritoLocalStorage from "../LocalStorage/Id-Carrito/PostIdCarritoLocalStorage";

const Carrito = ({ openMenuCarrito, SetOpenMenuCarrito }: Props) => {
  const dispatch = useDispatch();
  const Precio_Total = useSelector(
    (state: StateGlobalRedux) => state.Precio_Total
  );
  const ArrayCarrito: Carritos[] = useSelector(
    (state: StateGlobalRedux) => state.ArrayCarrito
  );

  useEffect(() => {
    if (UsuarioGetLocalStorage()) {
      //- Obtenemos el carrito:
      dispatch(FuncionObtenerCarrito(UsuarioGetLocalStorage().id));
      //- PRECIO TOTAL:
      dispatch(FuncionObtenerPrecioTotal(UsuarioGetLocalStorage().id));
    }
  }, []);

  //-  Funcion Compra:
  const FuncionCompra = () => {
    if (!ArrayCarrito.length) {
      toast.error("Carrito Vacio");
    }

    if (!UsuarioGetLocalStorage().id) {
      toast.error("Debes Loguearte para poder comprar");
    } else {
      axios
        .post(
          `https://servidor-airsoft.onrender.com/Mercado_Pago/${
            UsuarioGetLocalStorage().id
          }`
        )
        .then((response) => {
          // Redirigir al usuario a la URL de pago
          window.location.href = response.data.response.body.init_point;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const FuncionVerMasProductos = () => {
    document.location.href = "/";
  };

  //------------------------------Funcion Eliminar Carrito:
  const FuncionEliminarCarrito = (id: string) => {
    DeleteIdCarritoLocalStorage();
    axios
      .delete(
        `https://servidor-airsoft.onrender.com/Carrito/${id}?idUser=${
          UsuarioGetLocalStorage().id
        }`
      )
      .then(
        (
          response //- Obtenemos el carrito:
        ) => {
          //- PRECIO TOTAL:
          dispatch(FuncionObtenerPrecioTotal(UsuarioGetLocalStorage().id));
          //- Pedimos la cantidad:
          dispatch(FuncionObtenerCantidadCarrito(UsuarioGetLocalStorage().id));
          dispatch(FuncionObtenerCarrito(UsuarioGetLocalStorage().id));
        }
      )
      .catch((error) => alert(error.response.data));
  };

  const FuncionOutsideMenuCarrito = () => {
    document.body.style.overflow = "auto";
    SetOpenMenuCarrito(!openMenuCarrito);
  };

  //*----------------------------------------------Funciones Que Modifican El Contador:

  const FuncionIncrementarContador = (
    Stock: number,
    id: string,
    Contador: number
  ) => {
    dispatch(FuncionObtenerCarrito(UsuarioGetLocalStorage().id));
    //- PRECIO TOTAL:
    dispatch(FuncionObtenerPrecioTotal(UsuarioGetLocalStorage().id));
    PostIdCarritoLocalStorage(id);
    if (Contador < Stock) {
      dispatch(
        FuncionModificarContador(
          UsuarioGetLocalStorage().id,
          id,
          "Incremento",
          1
        )
      );
    }
  };

  const FuncionDecrementarContador = async (id: string, Contador: number) => {
    dispatch(FuncionObtenerCarrito(UsuarioGetLocalStorage().id));
    //- PRECIO TOTAL:
    dispatch(FuncionObtenerPrecioTotal(UsuarioGetLocalStorage().id));
    PostIdCarritoLocalStorage(id);
    if (Contador > 1) {
      dispatch(
        FuncionModificarContador(
          UsuarioGetLocalStorage().id,
          id,
          "Decremento",
          1
        )
      );
    }
  };

  return (
    <>
      {/*-------------------------------------CONTAINER CARRITO-----------------------------------*/}

      <div
        className={
          openMenuCarrito
            ? Style.ContainerCarritoOpen
            : Style.ContainerCarritoOutside
        }
      >
        <div className={Style.ContainerBoton}>
          <button
            className={Style.BtnOutsideMenuCarrito}
            onClick={() => FuncionOutsideMenuCarrito()}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h3>Carrito de Compras</h3>
        </div>
        {/*---------------------------Linea separadora Naranja------------------------*/}

        <div className={Style.LineaSeparadora}></div>

        {/*---------------------------------------------------------------------------*/}
        <div className={Style.ContainerCardCarrito}>
          {ArrayCarrito.map(
            ({ id, Imagen, PrecioUnitario, Name, Stock, Contador }) => (
              <div className={Style.CardCarrito}>
                <img src={Imagen} />
                <p>{Name}</p>
                <p className={Style.Precio}>Precio : {`$ ${PrecioUnitario}`}</p>
                <button
                  className={Style.BTNContador}
                  onClick={() =>
                    FuncionIncrementarContador(Stock, id, Contador)
                  }
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                  {/* Flecha hacia la izquierda */}
                </button>
                <p>{Contador}</p>
                <button
                  className={Style.BTNContador}
                  onClick={() => FuncionDecrementarContador(id, Contador)}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
                <a onClick={() => FuncionEliminarCarrito(id)}>
                  <FontAwesomeIcon icon={faTrash} color="red" />
                </a>
              </div>
            )
          )}
        </div>
        {/*---------------------------Linea separadora Naranja------------------------*/}

        <div className={Style.LineaSeparadora}></div>

        {/*------------------------Container Precio Total--------------------------*/}

        <div className={Style.ContainerTotalPrecio}>
          <p className={Style.TotalPrecio}>TOTAL :</p>
          <p className={Style.TotalPrecio}>{`$ ${Precio_Total}`}</p>
        </div>
        {/*-----------------------------------------------------------------------*/}
        <div className={Style.ContainerBoton}>
          <button
            className={Style.BotonIniciarCompra}
            onClick={() => FuncionCompra()}
          >
            INICIAR COMPRA
          </button>
        </div>
        <div className={Style.ContainerBotonVerMasProductos}>
          <button
            className={Style.BTNVerMasProductos}
            onClick={() => FuncionVerMasProductos()}
          >
            VER MÁS PRODUCTOS
          </button>
        </div>
        <Toaster position="bottom-left" reverseOrder={true} />
      </div>
      {/*-----------------------------------------------------------------------------------------*/}
    </>
  );
};

export default Carrito;
