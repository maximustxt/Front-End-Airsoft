import { useEffect } from "react";
//- Components:
import NavBar from "../NavBar/NavBar";
import CardHistoriasDeGuerra from "../Card Historias de Guerra/Card-Historia-De-Guerra";
//-Styles:
import Style from "./Historias_De_Guerra.module.css";
import { useDispatch, useSelector } from "react-redux";
//- Redux Actions:
import { FuncionGetHistoriasDeGuerra } from "../../Redux/Actions/Funcion_Actions";
//- Interfaces:
import Historias from "../../Interfaces/Historia";

const Historias_De_Guerra = () => {
  const dispatch = useDispatch();
  const Historias_De_Guerra: Historias[] = useSelector(
    (state: { HistoriasDeGuerra: [] }) => state.HistoriasDeGuerra
  );

  useEffect(() => {
    dispatch(FuncionGetHistoriasDeGuerra());
  }, []);

  return (
    <>
      <NavBar />
      <div className={Style.Container}>
        {Historias_De_Guerra.map(
          ({ id, Imagen, paisDondeSucedio, titulo, Descripcion }) => (
            <CardHistoriasDeGuerra
              Imagen={Imagen}
              paisDondeSucedio={paisDondeSucedio}
              titulo={titulo}
              Descripcion={Descripcion}
              id={id}
            />
          )
        )}
      </div>
    </>
  );
};

export default Historias_De_Guerra;
