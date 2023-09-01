import { useState, useEffect } from "react";
import axios from "axios";
//- Stylos:
import Style from "./Vehiculos.module.css";
//- Components:
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const Vehiculos = () => {
  const [Vehiculos, SetVehiculos] = useState([]);

  useEffect(() => {
    axios
      .get("https://servidor-airsoft.onrender.com/Veiculos_De_Guerra")
      .then((response) => {
        SetVehiculos(response.data); // Corregido aquí
      })
      .catch((error) => console.log(error));
    //se desmonta:
    return () => {
      SetVehiculos([]);
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className={Style.Container}>
        {Vehiculos.map(
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

export default Vehiculos;
