const PostIdCarritoLocalStorage = (idCarrito: string) => {
  localStorage.setItem("IdCarrito", JSON.stringify(idCarrito));
};

export default PostIdCarritoLocalStorage;
