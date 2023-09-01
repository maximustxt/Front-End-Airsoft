import {
  PRODUCTOS,
  VACIAR_PRODUCTOS,
  HISTORIA_DE_GUERRA,
  PRECIO_TOTAL,
  CONTADOR_CARRITO,
  CANTIDAD_CARRITO,
  CARRITO,
} from "../Actions/Actions";
//- Interfaces:
import StateGlobalRedux from "../../Interfaces/Redux/Redux";
import Producto from "../../Interfaces/Productos";
import Actions from "../../Interfaces/Redux/Actions";
import Historias from "../../Interfaces/Historia";
import { Carritos } from "../../Interfaces/Carrito";

const InicialState: StateGlobalRedux = {
  Productos: [],
  HistoriasDeGuerra: [],
  Precio_Total: 0,
  ContadorCarrito: 1,
  CantidadCarrito: 0,
  ArrayCarrito: [],
};

const rootReducer = (
  state = InicialState,
  actions: Actions
): StateGlobalRedux => {
  switch (actions.type) {
    case PRODUCTOS:
      return {
        ...state,
        Productos: actions.payload as Producto[],
      };
    case VACIAR_PRODUCTOS:
      return {
        ...state,
        Productos: actions.payload as [],
      };
    case HISTORIA_DE_GUERRA:
      return {
        ...state,
        HistoriasDeGuerra: actions.payload as Historias[],
      };
    case PRECIO_TOTAL:
      return {
        ...state,
        Precio_Total: actions.payload as number,
      };
    case CONTADOR_CARRITO:
      return {
        ...state,
        ContadorCarrito: actions.payload as number,
      };
    case CANTIDAD_CARRITO:
      return {
        ...state,
        CantidadCarrito: actions.payload as number,
      };
    case CARRITO:
      return {
        ...state,
        ArrayCarrito: actions.payload as Carritos[],
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
