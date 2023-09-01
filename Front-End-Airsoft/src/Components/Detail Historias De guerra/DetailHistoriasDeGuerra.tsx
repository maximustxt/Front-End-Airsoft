import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//- Stylos:
import Style from "./DetailHistoriasDeGuerra.module.css";
//- Components:
import NavBar from "../NavBar/NavBar";
//- Interfaces:
import HistoriaDeGuerraDetail from "./interface/HistoriaDeGuerra";
//- Components:
import Footer from "../Footer/Footer";

const DetailHistoriasDeGuerra = () => {
  const [Details, SetDetail]: any = useState({});
  const { id } = useParams();

  useEffect(() => {
    // buscar el detail del producto
    axios
      .get(`http://localhost:3001/Historias-De-Guerra/Detail/${id}`)
      .then((response: { data: HistoriaDeGuerraDetail }) => {
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
          <h1>{Details.titulo}</h1>
          <h2>Descripcion:</h2>
          <div className={Style.divParrafo}>
            <p>{Details.Descripcion}</p>
          </div>
          <h2>Historia: </h2>
          <div className={Style.divParrafo}>
            <p>{Details.Historia}</p>
          </div>
          <div className={Style.ContainerImg}>
            {Details.Imagenes &&
              Details.Imagenes.map((e: string) => (
                <img src={e} key={e} alt="Imagen" />
              ))}
          </div>
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

export default DetailHistoriasDeGuerra;
