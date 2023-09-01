export default interface CardCarrito {
  FuncionEliminarProducto?: any;
  id: string;
  Name: string;
  Tipo: string;
  Imagen: string;
  Imagenes?: string[];
  Descripcion?: string;
  Precio: number;
  Contador?: number;
  Stock?: number;
}
