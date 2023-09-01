import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
//- Auth 0:
import { useAuth0 } from "@auth0/auth0-react";
//- Styles:
import Style from "./Login.module.css";
//- Iconos Flechas:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faAngleUp,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
//- LOCAL STORAGE:
import UsuarioDeleteLocalStorage from "../LocalStorage/Usuario/UsuarioDeleteLocalStorage";
import UsuarioGetLocalStorage from "../LocalStorage/Usuario/UsuarioGetLocalStorage";
import UsuarioPostLocalStorage from "../LocalStorage/Usuario/UsuarioPostLocalStorage";

const Login = () => {
  const navigate = useNavigate();
  const [menuPerfil, SetmenuPerfil] = useState(false);
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  //-------------------------Funcion Para Menu User:
  const FuncionOpenMenu = () => {
    SetmenuPerfil(!menuPerfil);
  };

  //-------------------------Funcion Para ir al Perfil:
  const FuncionPerfil = () => {
    navigate("/Perfil_Del_Usuario");
  };

  //------------------------Funcion Logout:
  const FuncionLogout = () => {
    if (UsuarioGetLocalStorage()) {
      axios
        .delete(
          `http://localhost:3001/Usuarios/${UsuarioGetLocalStorage().email}`
        )
        .then((response) => {
          UsuarioDeleteLocalStorage();
          toast.error(response.data);
        })
        .catch((error: any) => {});
      logout({ logoutParams: { returnTo: window.location.origin } });
    }
  };

  const FuncionPosteoUser = () => {
    if (!UsuarioGetLocalStorage()) {
      const ObjetoBody = {
        email: user?.email,
        name: user?.name,
        password: user?.sub,
      };

      axios
        .post(`http://localhost:3001/Usuarios`, ObjetoBody)
        .then((response) => response)
        .catch((error: any) => {
          console.error(error.message);
        });

      //-------------Obtengo los datos del usuario:

      axios
        .get(`http://localhost:3001/Usuarios/${ObjetoBody.email}`)
        .then((response) => {
          UsuarioPostLocalStorage({ ...response.data, Imagen: user?.picture });
        })
        .catch((error: any) => {
          console.error(error.message);
        });
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      ) : (
        ""
      )}

      {isAuthenticated ? FuncionPosteoUser() : ""}

      {isAuthenticated && (
        <div className={Style.ContainerPadre}>
          <img
            className={Style.Imagen}
            src={UsuarioGetLocalStorage().Imagen}
            alt={user?.name}
          />
          {menuPerfil ? (
            <a onClick={() => FuncionOpenMenu()}>
              <FontAwesomeIcon icon={faAngleUp} color="white" />
            </a>
          ) : (
            <a onClick={() => FuncionOpenMenu()}>
              <FontAwesomeIcon icon={faChevronDown} color="white" />
            </a>
          )}
          <div
            className={
              menuPerfil ? Style.ContainerHijo : Style.ContainerHijoOutsai
            }
          >
            <a onClick={() => FuncionPerfil()}>
              <div className={Style.ContainerPerfilIcon}>
                <FontAwesomeIcon icon={faUser} color="#ffce00" />
                <a>Mi Perfil</a>
              </div>
            </a>
            <br />
            <a onClick={() => FuncionLogout()}>
              <div className={Style.ContainerPerfilIcon}>
                <FontAwesomeIcon icon={faSignOutAlt} color="#ffce00" />
                <a>Logout</a>
              </div>
            </a>
          </div>
          <Toaster position="bottom-left" reverseOrder={true} />
        </div>
      )}
    </>
  );
};

export default Login;
