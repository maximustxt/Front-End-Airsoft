import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
//- Stilos:
import Style from "./Aviacion.module.css";
//- Interface:
import AviacionInterface from "./interface/Aviacion";
//- Components:
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";

const Aviacion = () => {
  const [ArrayAviacion, SetArrayAviacion] = useState([]);

  useEffect(() => {
    axios
      .get("https://servidor-airsoft.onrender.com/Aviones_De_Combate")
      .then((response) => {
        SetArrayAviacion(response.data); // Corregido aquí
      })
      .catch((error) => console.log(error));
    //se desmonta:
    return () => {
      SetArrayAviacion([]);
    };
  }, []);

  return (
    <>
      <NavBar />
      {ArrayAviacion.length ? (
        <div className={Style.Container}>
          {ArrayAviacion.map(
            ({
              id,
              Imagen,
              paisDeCreacion,
              nombreDelvehiculo,
              añosDeDesUso,
            }) => (
              <Card
                Imagen={Imagen}
                paisDeCreacion={paisDeCreacion}
                nombreDelvehiculo={nombreDelvehiculo}
                añosDeDesUso={añosDeDesUso}
                id={id}
              />
            )
          )}
        </div>
      ) : (
        <Loading />
      )}
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Aviacion;
