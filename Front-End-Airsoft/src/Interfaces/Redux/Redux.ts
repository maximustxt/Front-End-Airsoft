//- Interfaces:
import Producto from "../Productos";
import { Carritos } from "../Carrito";
import Historias from "../Historia";

export default interface StateGlobalRedux {
  Productos: Producto[] | [];
  HistoriasDeGuerra: Historias[];
  Precio_Total: number;
  ContadorCarrito: number;
  CantidadCarrito: number;
  ArrayCarrito: Carritos[];
}
