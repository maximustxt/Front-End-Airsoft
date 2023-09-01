const GetIdCarritoLocalStorage = () => {
  const id = localStorage.getItem("IdCarrito");
  if (id) {
    const idCarrito = JSON.parse(id);
    return idCarrito;
  }
};

export default GetIdCarritoLocalStorage;
