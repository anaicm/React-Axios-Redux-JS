import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk para obtener usuarios
//"getUser" => nombre que se le tienen que poner a thunk, no sirve para nada pero hay que ponerlo
//y no pueden estar repetidos.
export const getUser = createAsyncThunk("getUser", async () => {
  try {
    //response => la consulta
    //await se tiene que poner para no dar error
    //axio con el paquete que estoy trabajando
    //get método de la consulra(viene de axios).
    //url => que le entra al método get para saber donde tiene que ir
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    throw error;
  }
});
interface UserState {
  users: any[]; // Ajusta el tipo según tus necesidades
  loading: boolean;
  error: string | null;
  error2: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  error2: null, //si se quieren poner un error para cada cosa se crean más variables de error
  //y se tiene que poner en el componente, si solo hay uno con ponerlo una vez basta
};

//----------------------------------añadir fila en la tabla
export interface AddUsuario {
  id: string;
  title: string;
  body: string;
  userId: string;
}
//void => Cuando no devuelve nada, como tienen que tener uno de salida y otro de entrada
//en este caso no hay nada de salida
export const postCreateUser = createAsyncThunk<void, AddUsuario>(
  "/Usuarios",
  //addUsuario => nombre del parámetro que entra con los datos, este ya sabe todos los campos que
  //contiene la interfaz
  //AddUsuario => Tipo del que es el objeto que esta creado en la interfaz
  //los post son por body siempre, campos que necesita para rellenar la tabla, en este caso
  //estan en addUsuario
  async (addUsuario: AddUsuario, thunkApi) => {
    try {
      const url = "https://jsonplaceholder.typicode.com/postsmm";
      //petición:
      //response => la consulta
      //await se tiene que poner para no dar error
      //axio con el paquete que estoy trabajando
      //get método de la consulra(viene de axios).
      //url => que le entra al método get para saber donde tiene que ir

      const response = await axios.post(url, addUsuario);
      console.log(response);
      return response.data;
    } catch (error: any) {
      if (error.errors) return thunkApi.rejectWithValue(error.errors);
      else return thunkApi.rejectWithValue(error);
    }
  }
);
//----------------------------------modificar fila en la tabla
// Interfaz para la actualización de usuario
export interface UpdateUsuario {
  id: string;
  name: string;
  email: string;
  userId: string;
}

export const putUpdateUser = createAsyncThunk<UpdateUsuario, UpdateUsuario>(
  "putUpdateUser",
  async (updateUsuario: UpdateUsuario, thunkApi) => {
    try {
      const url = `https://jsonplaceholder.typicode.com/posts/1`;
      const response = await axios.put(url, updateUsuario);
      console.log(response);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return thunkApi.rejectWithValue(error.response.data);
      } else {
        return thunkApi.rejectWithValue(error.message);
      }
    }
  }
);
// Interfaz para eliminar usuario
export interface DeleteUsuario {
    id: string;
  }
  
  export const deleteUser = createAsyncThunk<void, DeleteUsuario>(
    "deleteUser",
    async (deleteUsuario: DeleteUsuario, thunkApi) => {
      try {
        //para eliminar registro se tiene que pasar por query string, deleteUsuario que contiene
        //el campo id.
        const url = `https://jsonplaceholder.typicode.com/users/${deleteUsuario.id}`;
        const response = await axios.delete(url);
        console.log(response);
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data) {
          return thunkApi.rejectWithValue(error.response.data);
        } else {
          return thunkApi.rejectWithValue(error.message);
        }
      }
    }
  );
  
const userSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      // Manejo de estados para postCreateUser
      .addCase(postCreateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCreateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload); // Agrega el nuevo usuario al array de usuarios
      })
      .addCase(postCreateUser.rejected, (state, action) => {
        state.loading = false;
        state.error2 = action.error.message || "Failed to create user";
      })
      // Manejo de estados para putUpdateUser
      .addCase(putUpdateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putUpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        debugger;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(putUpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.error2 = action.error.message || "Failed to update user";
      })
       // Manejo de estados para deleteUser
       .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.meta.arg.id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error2 = action.error.message || "Failed to delete user";
      });
  },
});
export default userSlice;
