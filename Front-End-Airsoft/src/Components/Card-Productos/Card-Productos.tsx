import { useNavigate } from "react-router-dom";
//- Interfaces:
import Card_Productos from "./Interfaces/Card-Productos";
//- Stilos:
import Style from "./Card-Producto.module.css";

const Card_Producto = ({ id, Name, Precio, Imagen }: Card_Productos) => {
  const navigate = useNavigate();

  const FuncionOnClick = () => {
    navigate(`/DetailArticuloDeVenta/${id}`);
  };

  return (
    <>
      <a onClick={FuncionOnClick}>
        <div className={Style.ContainerCard}>
          <img src={Imagen} />
          <h5>{`$ ${Precio}`}</h5>
          <p>{Name}</p>
        </div>
      </a>
    </>
  );
};

export default Card_Producto;
