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
import Loading from "../Loading/Loading";

const Armas = () => {
  const [ArrayArmas, SetArrayArmas] = useState([]);

  useEffect(() => {
    axios
      .get("https://servidor-airsoft.onrender.com/Armas_De_Guerra")
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
      {ArrayArmas.length ? (
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

export default Armas;
