//- Stilos:
import { useNavigate } from "react-router-dom";
import Style from "./CardHistoriasDeGuerra.module.css";
//- Interfaces:
import props from "./interfaces/HitoriasDeGuerra";

const CardHistoriasDeGuerra = ({
  id,
  Imagen,
  paisDondeSucedio,
  titulo,
  Descripcion,
}: props) => {
  const navigate = useNavigate();

  const FuncionOnClick = () => {
    navigate(`/DetailHistoriaDeGuerra/${id}`);
  };

  return (
    <>
      <a className={Style.Link} onClick={FuncionOnClick}>
        <div className={Style.ContainerHistoriaDeGuerra} key={titulo}>
          <img
            className={Style.ImagenHistoria}
            src={Imagen}
            alt={`Imagen de ${titulo}`}
          />
          <div className={Style.DescripcionTitulo}>
            <h3>{titulo}</h3>
            <p>{Descripcion}</p>
          </div>
        </div>
      </a>
    </>
  );
};

export default CardHistoriasDeGuerra;
