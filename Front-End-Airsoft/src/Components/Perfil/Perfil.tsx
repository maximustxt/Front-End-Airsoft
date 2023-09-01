//- Auth 0:
import { useAuth0 } from "@auth0/auth0-react";
//- Components:
import NavBar from "../NavBar/NavBar";
//- ICONOS:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
//- Stylos:
import Style from "./Perfil.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
//- LOCAL STORAGE:
import UsuarioGetLocalStorage from "../LocalStorage/Usuario/UsuarioGetLocalStorage";

const Perfil = () => {
  const { user, isAuthenticated } = useAuth0();
  const [Compra, SetCompra] = useState([]);

  useEffect(() => {
    if (UsuarioGetLocalStorage()) {
      axios
        .get(
          `https://servidor-airsoft.onrender.com/Compras/${
            UsuarioGetLocalStorage().id
          }`
        )
        .then((response) => {
          console.log(response.data);
          SetCompra(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <>
      <NavBar />
      {isAuthenticated && (
        <>
          <br />
          <br />
          <div className={Style.Container}>
            <div className={Style.ContainerInfoUser}>
              <h4>MIS DATOS</h4>
              <hr />
              <img src={user?.picture} alt={user?.name} />
              <p>
                <FontAwesomeIcon icon={faUser} /> {user?.name}
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} /> {user?.email}
              </p>
            </div>
            <div className={Style.ContainerDatosCompra}>
              <h4>MIS COMPRAS</h4>
              <hr />
              {Compra.map(({ Name, Imagen }) => (
                <div className={Style.ContainerMisCompras}>
                  <img src={Imagen} alt={Name} />
                  <p>{Name}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Perfil;
