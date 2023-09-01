import { useNavigate } from "react-router-dom";
//- Interfaces:
import CardCarrito from "./interfaces/interfaces";
//- Stilos:
import Style from "./Card_Carrito.module.css";

const Card_Carrito = ({
  id,
  Name,
  Precio,
  Imagen,
  FuncionEliminarProducto,
}: CardCarrito) => {
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
          <button onClick={() => FuncionEliminarProducto()}>Eliminar</button>
        </div>
      </a>
    </>
  );
};

export default Card_Carrito;
