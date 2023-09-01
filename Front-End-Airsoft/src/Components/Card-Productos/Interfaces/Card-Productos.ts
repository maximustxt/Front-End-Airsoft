export default interface Card_Productos {
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
