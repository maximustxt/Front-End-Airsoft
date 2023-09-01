const UsuarioPostLocalStorage = (usuario: {
  name: string;
  email: string;
  id: string;
}) => {
  if (usuario) {
    localStorage.setItem("Usuarios", JSON.stringify(usuario));
  } else {
    return "No existe el usuario";
  }
};

export default UsuarioPostLocalStorage;
