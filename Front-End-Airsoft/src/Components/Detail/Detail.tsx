import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
//- Styles:
import Style from "./Detail.module.css";
//- Components:
import NavBar from "../NavBar/NavBar";
//- Interfaces:
import Naval from "./Interfaces/Interfaces.Barcos";
//- Components:
import Footer from "../Footer/Footer";

const Detail = () => {
  const [Details, SetDetail]: any = useState({});
  const { id } = useParams();

  useEffect(() => {
    // buscar el detail del producto
    axios
      .get(`http://localhost:3001/Detail/${id}`)
      .then((response: { data: Naval }) => {
        SetDetail(response.data); // Corregido aquí
      })
      .catch((error) => console.log(error));
    //se desmonta:
    return () => {
      SetDetail({});
    };
  }, []);
  return (
    <>
      <NavBar />

      {Details ? (
        <div className={Style.Container}>
          <h1>Descripcion:</h1>
          <div className={Style.containerParrafos}>
            <p>{Details.Descripcion}</p>
          </div>
          <h1>Historia</h1>
          <div className={Style.containerParrafos}>
            <p>{Details.Historia}</p>
          </div>
          <div className={Style.ContainerImagenes}>
            <img src={Details.Imagen} />
            {Details.Imagenes &&
              Details.Imagenes.map((e: string) => (
                <img src={e} key={e} alt="Imagen" />
              ))}
          </div>
          <hr />
          <h3>PAISES QUE LA USARON</h3>
          <div className={Style.paisDeUso}>
            {Details.paisesQueLaUsaron &&
              Details.paisesQueLaUsaron.map((e: string) => (
                <img src={e} key={e} alt="Imagen" />
              ))}
          </div>
          <hr />
          <h3>Años que presento servicio</h3>
          <p>{Details.añosDeDesUso}</p>
          <hr />
          <h3>Pais de creacion</h3>
          <div className={Style.paisDeCreacion}>
            <img src={Details.paisDeCreacion} />
          </div>
          <hr />
          <h3>Conflictos Donde Participo</h3>
          {Details.ConflictosENDondeParticipo &&
            Details.ConflictosENDondeParticipo.map((e: string) => <p>*{e}</p>)}
        </div>
      ) : (
        <h1>ERROR</h1>
      )}
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Detail;
