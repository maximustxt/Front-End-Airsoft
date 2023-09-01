import { Link } from "react-router-dom";
import Style from "./NavBar.module.css";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
//- Interfaces:
import StateGlobalRedux from "../../Interfaces/Redux/Redux";
//- Components:
import Login from "../Login/Login";
//- ICONOS:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faTimes,
  faShoppingCart,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
//- Funciones Actions:
import {
  FuncionObtenerPrecioTotal,
  FuncionObtenerCantidadCarrito,
  FuncionObtenerCarrito,
} from "../../Redux/Actions/Funcion_Actions";
//- LOCAL STORAGE :
import UsuarioGetLocalStorage from "../LocalStorage/Usuario/UsuarioGetLocalStorage";
//- Components:
import Carrito from "../Carrito/Carrito";

const NavBar = () => {
  const dispatch = useDispatch();
  const [openMenu, SetOpenMenu] = useState(false);
  const [openMenuMovil, SetopenMenuMovil] = useState(false);
  const [openMenuCarrito, SetOpenMenuCarrito] = useState(false);
  const CantidadCarrito = useSelector(
    (state: StateGlobalRedux) => state.CantidadCarrito
  );

  //- Cuando el componente se monta:
  useEffect(() => {
    if (UsuarioGetLocalStorage()) {
      //- Pedimos la cantidad:
      dispatch(FuncionObtenerCantidadCarrito(UsuarioGetLocalStorage().id));
      if (UsuarioGetLocalStorage()) {
        //- PRECIO TOTAL:
        dispatch(FuncionObtenerPrecioTotal(UsuarioGetLocalStorage().id));
      }
    }
  }, []);

  const FuncionDesplegarMenuMovil = () => {
    SetopenMenuMovil(!openMenuMovil);
  };
  //- Funcion Abrir menu:
  const FuncionOpenMenu = (): void => {
    SetOpenMenu(!openMenu);
  };

  const FuncionOpenMenuCarrito = (): void => {
    if (!UsuarioGetLocalStorage()) {
      toast.error("Debes Loguearte para poder ir al carrito");
    } else {
      SetOpenMenuCarrito(!openMenuCarrito);
      //- Obtenemos el carrito:
      dispatch(FuncionObtenerCarrito(UsuarioGetLocalStorage().id));

      //- PRECIO TOTAL:
      dispatch(FuncionObtenerPrecioTotal(UsuarioGetLocalStorage().id));

      document.body.style.overflow = "hidden";
    }
  };

  return (
    <>
      <main className={openMenuCarrito ? Style.menu_overlay : ""}>
        <div className={Style.navbar}>
          <Link to={"/"}>
            <img
              className={Style.Icono}
              src="https://airsoftyecla.es/img/aisoft-yecla-logo-1571086028.jpg"
            />
          </Link>
          <a onClick={() => FuncionDesplegarMenuMovil()}>
            <div className={Style.MenuHamburgesa}>
              {openMenuMovil ? (
                <FontAwesomeIcon icon={faTimes} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </div>
          </a>
          <div
            className={!openMenuMovil ? Style.nav_items : Style.nav_items_Open}
          >
            <a onClick={() => FuncionOpenMenuCarrito()}>
              <div className={Style.ContainerIconoCarrito}>
                <FontAwesomeIcon icon={faShoppingCart} color="white" />
                <div className={Style.ContainerCantidad}>
                  {CantidadCarrito > 0 ? (
                    <FontAwesomeIcon
                      icon={faBell}
                      color="orange"
                      fontSize="12px"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </a>
            <Login />
            <a className={Style.DespliegeDeMenu} onClick={FuncionOpenMenu}>
              <div className={Style.Select}>
                <div className={Style.ContainerFlechas}>
                  <p>Cosas que pueden interesarte🧐</p>
                  <FontAwesomeIcon icon={faChevronDown} color="white" />
                </div>

                <section
                  className={` ${openMenu ? Style.HijoSelect : Style.outSide}`}
                >
                  <a>
                    <Link to={"/Aviacion_De_Guerra"}>Aviacion</Link>
                  </a>
                  <a>
                    <Link to={"/Naval_De_Guerra"}>Naval</Link>
                  </a>
                  <a>
                    <Link to={"/Vehiculos_De_Guerra"}>Vehiculos</Link>
                  </a>
                  <a>
                    <Link to={"/Cañones_De_Guerra"}>Cañones</Link>
                  </a>
                  <a>
                    <Link to={"/Armas_De_Guerra"}>Armas</Link>
                  </a>
                  <a>
                    <Link to={"/Historias_De_Guerra"}>Historias De Guerra</Link>
                  </a>
                </section>
              </div>
            </a>
          </div>
        </div>
        <span className={Style.BordeNav}></span>
      </main>
      {/*----------------------------------CARRITO---------------------------------------*/}
      <Carrito
        openMenuCarrito={openMenuCarrito}
        SetOpenMenuCarrito={SetOpenMenuCarrito}
      />
      <Toaster position="bottom-left" reverseOrder={true} />
      {/*--------------------------------------------------------------------------------*/}
    </>
  );
};

export default NavBar;
