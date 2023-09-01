const UsuarioGetLocalStorage = () => {
  const user = localStorage.getItem("Usuarios");
  if (user) {
    const usuario = JSON.parse(user);
    return usuario;
  } else {
    return undefined;
  }
};

export default UsuarioGetLocalStorage;
