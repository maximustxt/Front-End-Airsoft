import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
//- Stilos:
import Style from "./Armas.module.css";
//- Interface:
import { Arma } from "./Interface/Armas";
//- Components:
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const Armas = () => {
  const [ArrayArmas, SetArrayArmas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/Armas_De_Guerra")
      .then((response) => {
        SetArrayArmas(response.data); // Corregido aquí
      })
      .catch((error) => console.log(error));
    //se desmonta:
    return () => {
      SetArrayArmas([]);
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className={Style.Container}>
        {ArrayArmas.map(
          ({ id, Imagen, paisDeCreacion, nombreDelArma, añosDeDesUso }) => (
            <Card
              Imagen={Imagen}
              paisDeCreacion={paisDeCreacion}
              nombreDelArma={nombreDelArma}
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

export default Armas;
