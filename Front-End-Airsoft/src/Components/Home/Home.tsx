import { useEffect } from "react";
//- FuncionDispatch:
import {
  FuncionGetProductos,
  FuncionVaciarProductos,
} from "../../Redux/Actions/Funcion_Actions";
//- Stilos:
import Style from "./Home.module.css";
//- Interfaces:
import Producto from "../../Interfaces/Productos";
//- Components:
import NavBar from "../NavBar/NavBar";
import Card_Producto from "../Card-Productos/Card-Productos";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Productos: Producto[] = useSelector((state: any) => state.Productos);

  useEffect(() => {
    localStorage.removeItem("Usuarios");
  }, []);

  const ArrayDeImagenesProductos = [
    {
      Imagen:
        "https://airsoftyecla.es/modules/angarbanners/views/img/44071fb93d0d130ea06106bcc0f5aafa102981bb_piccatreplicas.jpg",
      Nombre: "Armas",
    },
    {
      Imagen:
        "https://airsoftyecla.es/modules/angarbanners/views/img/bfe506110ce4bcf3044cf239bcf72c6ed1389cd4_piccatmascaras.jpg",
      Nombre: "Casco",
    },
    {
      Imagen:
        "https://airsoftyecla.es/modules/angarbanners/views/img/6e026ad9f08c31700c9174113e47431de8e7ba69_piccatmiras.jpg",
      Nombre: "Visores",
    },
    {
      Imagen:
        "https://airsoftyecla.es/modules/angarbanners/views/img/b796a483830d411d208517cbafff885276642ea2_piccatspeedloaders.jpg",
      Nombre: "Cargadores",
    },
    {
      Imagen:
        "https://airsoftyecla.es/modules/angarbanners/views/img/7bc4b63e74b0c2d773e19b7acdd199b9e3aa2027_piccatuniformes.jpg",
      Nombre: "Indumentarias",
    },
    {
      Imagen:
        "https://airsoftyecla.es/modules/angarbanners/views/img/10911b22513b2f913951ae870eeaa1936adf024b_piccatchalecos.jpg",
      Nombre: "Chalecos",
    },
    {
      Imagen:
        "https://airsoftyecla.es/modules/angarbanners/views/img/a2e79e75bfc3f989b95a4ee143b7121a152db140_piccatbotas.jpg",
      Nombre: "Botas",
    },
    {
      Imagen:
        "https://airsoftyecla.es/modules/angarbanners/views/img/cdcdded1388945e6eaccd31db9580ff4e4a3f868_piccatpouchs.jpg",
      Nombre: "Estuches",
    },
    {
      Imagen:
        "https://airsoftyecla.es/modules/angarbanners/views/img/fc3f49efdeabbb2c065516c8920dec8440a30714_piccatmunicion.jpg",
      Nombre: "Balas",
    },
  ];

  useEffect(() => {
    dispatch(FuncionGetProductos());
  }, []);

  const FuncionRedirect = (name: string) => {
    navigate(`/${name}`);
  };

  return (
    <>
      <NavBar />

      {!Productos.length ? (
        <Loading />
      ) : (
        <>
          <div className={Style.ContainerDiversosProductos}>
            {ArrayDeImagenesProductos.map((e) => (
              <div key={e.Nombre} className={Style.Imagenes}>
                <img src={e.Imagen} alt={e.Nombre} />
                <p onClick={() => FuncionRedirect(e.Nombre)}>{e.Nombre}</p>
              </div>
            ))}
          </div>
          <h1>Productos De Airsoft</h1>
          <div className={Style.Container}>
            {Productos.map(({ id, Imagen, Tipo, Name, Precio }) => (
              <Card_Producto
                key={id}
                id={id}
                Imagen={Imagen}
                Tipo={Tipo}
                Name={Name}
                Precio={Precio}
              />
            ))}
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Home;
