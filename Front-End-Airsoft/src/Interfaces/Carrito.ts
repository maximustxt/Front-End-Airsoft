export interface Carritos {
  id: string;
  Contador: number;
  Precio: number;
  Name: string;
  Description: string;
  Imagen: string;
  PrecioUnitario: number;
  Stock: number;
  Imagenes: string[];
  Tipo: string;
}

export interface Props {
  openMenuCarrito: boolean;
  SetOpenMenuCarrito: (value: boolean) => void;
}
