//- Stilos:
import { Link, useNavigate } from "react-router-dom";
import Style from "./Card.module.css";
//- Interfaces:
import { Props } from "../../Interfaces/Interfaces.Card";

const Card = ({
  Imagen,
  paisDeCreacion,
  nombreDelArma,
  añosDeDesUso,
  nombreDelvehiculo,
  nombreDelCañon,
  titulo,
  id,
}: Props) => {
  const navigate = useNavigate();

  const FuncionOnClick = (): any => {
    navigate(`/Detail/${id}`);
  };

  return (
    <>
      <a className={Style.link} onClick={FuncionOnClick}>
        <div className={Style.ContainerArma} key={nombreDelArma}>
          {" "}
          {/* Agregamos la clave única para cada elemento */}
          <img
            className={Style.ImagenArma}
            src={Imagen}
            alt={`Imagen de ${nombreDelArma}`}
          />
          {nombreDelArma ? <p>{nombreDelArma}</p> : <p>{nombreDelvehiculo}</p>}
          {nombreDelCañon && !nombreDelArma && !nombreDelArma ? (
            <p>{nombreDelCañon}</p>
          ) : (
            ""
          )}
          <h3>Uso: {añosDeDesUso}</h3>
          <p>Pais de creacion :</p>
          <img
            className={Style.ImagenpaisDeCreacion}
            src={paisDeCreacion}
            alt={`Bandera de ${paisDeCreacion}`}
          />
        </div>
      </a>
    </>
  );
};

export default Card;
