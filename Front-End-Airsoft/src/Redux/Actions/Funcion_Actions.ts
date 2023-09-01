import {
  PRODUCTOS,
  VACIAR_PRODUCTOS,
  HISTORIA_DE_GUERRA,
  PRECIO_TOTAL,
  CONTADOR_CARRITO,
  CANTIDAD_CARRITO,
  CARRITO,
} from "./Actions";
import { Dispatch } from "redux";
//- Axios:
import axios from "axios";

//----------------------------------OBTENER PRODUCTOS:

export const FuncionGetProductos = (): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/Articulos_De_Venta`
      );
      dispatch({ type: PRODUCTOS, payload: response.data });
    } catch (error: any) {
      alert(error.massage);
    }
  };
};

//----------------------------------VACIAR PRODUCTOS:

export const FuncionVaciarProductos = (): {
  type: "VACIAR_PRODUCTOS";
  payload: [];
} => {
  return { type: VACIAR_PRODUCTOS, payload: [] };
};

//--------------------------------------HISTORIAS DE GUERRA:

export const FuncionGetHistoriasDeGuerra = (): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/Historias-De-Guerra`
      );
      dispatch({ type: HISTORIA_DE_GUERRA, payload: response.data });
    } catch (error: any) {
      alert(error.massage);
    }
  };
};

//--------------------------------------PRECIO_TOTAL:

export const FuncionObtenerPrecioTotal = (idUser: string): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/Carrito/TotalPrecio/${idUser}`
      );
      dispatch({ type: PRECIO_TOTAL, payload: response.data });
    } catch (error: any) {
      alert(error.response.data);
    }
  };
};

//--------------------------------------CANTIDAD DEL CARRITO:

export const FuncionObtenerCantidadCarrito = (idUser: string): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/Carrito/Longitud_Carrito/${idUser}`
      );
      dispatch({ type: CANTIDAD_CARRITO, payload: response.data });
    } catch (error: any) {
      alert(error.response.data);
    }
  };
};

//---------------------------------------CONTADOR_CARRITO:

export const FuncionModificarContador = (
  idUser: string,
  idCarrito: string,
  InfoContador: string,
  ValorContador: number
): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/Contador/${idUser}?idCarrito=${idCarrito}&&InfoContador=${InfoContador}`,
        { ValorContador }
      );
      dispatch({ type: CONTADOR_CARRITO, payload: response.data });
    } catch (error: any) {
      // alert(error.response.data);
    }
  };
};

//- OBTENER CONTADOR:

export const FuncionObtenerContador = (
  idUser: string,
  idCarrito: string
): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/Contador/${idUser}?idCarrito=${idCarrito}`
      );
      dispatch({ type: CONTADOR_CARRITO, payload: response.data });
    } catch (error: any) {
      // alert(error.response.data);
    }
  };
};

//- OBTENER CARRITO:

export const FuncionObtenerCarrito = (idUser: string): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/Carrito/${idUser}`
      );
      dispatch({ type: CARRITO, payload: response.data });
    } catch (error: any) {
      // alert(error.response.data);
    }
  };
};
