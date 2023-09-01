import { useEffect, useState } from "react";
import axios from "axios";
//- Stylos:
import Style from "./Naval.module.css";
//- Components:
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const Naval = () => {
  const [Naval, SetNaval] = useState([]);

  useEffect(() => {
    axios
      .get("https://servidor-airsoft.onrender.com/Barcos_Submarinos_De_Guerra")
      .then((response) => {
        SetNaval(response.data); // Corregido aquí
      })
      .catch((error) => console.log(error));
    //se desmonta:
    return () => {
      SetNaval([]);
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className={Style.Container}>
        {Naval.map(
          ({ id, Imagen, paisDeCreacion, nombreDelvehiculo, añosDeDesUso }) => (
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
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Naval;
