import { useEffect, useState } from "react";
import axios from "axios";
//- Stylos:
import Style from "./Cañones.module.css";
//- Components:
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const Cañones = () => {
  const [Cañones, SetCañones] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/Canones_De_Guerra")
      .then((response) => {
        SetCañones(response.data); // Corregido aquí
      })
      .catch((error) => console.log(error));
    //se desmonta:
    return () => {
      SetCañones([]);
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className={Style.Container}>
        {Cañones.map(
          ({ id, Imagen, paisDeCreacion, nombreDelCañon, añosDeDesUso }) => (
            <Card
              Imagen={Imagen}
              paisDeCreacion={paisDeCreacion}
              nombreDelCañon={nombreDelCañon}
              añosDeDesUso={añosDeDesUso}
              id={id}
            />
          )
        )}
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Cañones;
