//- Interfaces:
import Producto from "../Productos";
import { Carritos } from "../Carrito";
import Historias from "../Historia";

export default interface Actions {
  type: string;
  payload: number | Producto[] | Carritos[] | Historias[] | [];
}
