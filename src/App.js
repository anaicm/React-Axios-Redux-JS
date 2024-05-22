import "./App.css";
import React, { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useUsuarioSelector,
} from "./reducers/store.ts";
//estados
import appSlice from "./reducers/appSlice.ts";
//métodos de UserSlice.ts (CRUD)
import {
  getUser,
  postCreateUser,
  putUpdateUser,
  deleteUser,
} from "./reducers/UserSlice.ts";

function App() {
  const appState = useAppSelector();//dispatch para usar los estados de appState
  const dispatch = useAppDispatch();//tiene que ponerse
  const usuarioState = useUsuarioSelector();//guarda el estado entero de UserSlice

  // Estado local para los campos de entrada específicos de cada usuario para la actualización del
  // registro.
  const [editedUsers, setEditedUsers] = useState([]);

  //Cuando carga pagina llama al fetch de getUsers
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  //Salta cuando termina el fetch de get users y se actualizan los usuarios de redux
  // salta esto
  useEffect(() => {
    //el array entero de usuarios
    if (usuarioState.users.length > 0) {
      //se guarda el nuevo array actualizado en "setEditedUsers" que actualiza el estado "usuarioState"
      setEditedUsers(usuarioState.users.map((user) => ({ ...user })));
    }
  }, [usuarioState.users]);

  const handleGetUser = () => {
    dispatch(getUser());
    dispatch(appSlice.actions.setOpen(true));
  };

  const handleOcultar = () => {
    dispatch(appSlice.actions.setOpen(false));
  };
  //funcion para actualizar el estado local "editedUsers" que guarda una copia modificada de los usuarios
  //que hay en la BD con el nuevo registro actualizado, entra el valor nuevo escrito por el
  //input que es "e", el id de registro actualizado y el campo con "field" (columna)
  const handleInputChange = (e, id, field) => {
    setEditedUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, [field]: e.target.value } : user
      )
    );
  };
  //crear usuario------------------------------------
  const handleCreateUser = () => {
    const datos = {
      id: appState.id,
      title: appState.title,
      body: appState.body,
      userId: appState.userId,
    };
    dispatch(postCreateUser(datos));
  };
  //actualizar usuario------------------------------------
  const handleUpdateUser = (user) => {
    const updatedUser = editedUsers.find((u) => u.id === user.id);
    if (updatedUser) {
      dispatch(putUpdateUser(updatedUser));
    }
  };
  //Cancelar actualización usuario------------------------------------
  const handleCancelarUpdateUser = () => {
    //limpia el estado local "usuarioState"
    setEditedUsers(usuarioState.users.map((user) => ({ ...user })));
  };
//eliminar usuario------------------------------------
  const handleEliminarUser = (id) => {
    debugger;
    dispatch(deleteUser({ id }));
  };


  return (
    <div className="App">
      <h1>HTTP - Axios</h1>
      <button onClick={handleGetUser}>Get Users</button>
      {usuarioState.loading && <p>Loading...</p>}
      {usuarioState.error && <p>{usuarioState.error}</p>}
      {usuarioState.error2 && <p>{usuarioState.error2}</p>}
      {appState.open && (
        <div>
          {/** Para la actualización si la hay se hace el map del estado local "editedUsers" 
           * si no hubiera actualizacion y solo se quiere obtener la lista se hace map
           * de usuarioState=> Estado inicial declarado en UserSlice.ts, 
           * {usuarioState.users.map((user) => ()}
           * users => variable guardada en el estado inicial, que contiene el 
           * array de todos los campos*/}
          {editedUsers.map((user) => (
            <div key={user.id}>
              <p>Id: {user.id}</p>
              <p>
                Nombre:
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => handleInputChange(e, user.id, "name")}
                />
              </p>
              <p>
                Email:
                <input
                  type="text"
                  value={user.email}
                  onChange={(e) => handleInputChange(e, user.id, "email")}
                />
              </p>
              <button onClick={() => handleUpdateUser(user)}>Actualizar</button>
              <button onClick={handleCancelarUpdateUser}>Cancelar</button>
              <button onClick={() => handleEliminarUser(user.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
      <button onClick={handleCreateUser}>Create Post</button>
      <input
        type="text"
        placeholder="Id"
        value={appState.id}
        onChange={(e) => dispatch(appSlice.actions.setId(e.target.value))}
      />
      <input
        type="text"
        placeholder="Titulo"
        value={appState.title}
        onChange={(e) => dispatch(appSlice.actions.setTitle(e.target.value))}
      />
      <input
        type="text"
        placeholder="Cuerpo"
        value={appState.body}
        onChange={(e) => dispatch(appSlice.actions.setBody(e.target.value))}
      />
      <input
        type="text"
        placeholder="usuarioId"
        value={appState.userId}
        onChange={(e) => dispatch(appSlice.actions.setUserId(e.target.value))}
      />
      <button onClick={handleOcultar}>Ocultar</button>
    </div>
  );
}

export default App;
