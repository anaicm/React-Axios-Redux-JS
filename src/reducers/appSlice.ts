import { createSlice } from "@reduxjs/toolkit";

//AppState => le pongo este tipo (nombre que yo quiero) para la app
interface AppState {

  url:string;
  open:boolean;
  id: string,
  title: string,
  body: string,
  userId: string,
  name:string,
   
}
const initialState: AppState = {
  url:"",
  open:false,
  id: "",
  title: "",
  body: "",
  userId: "",
  name:"",
   
};
const appSlice = createSlice({
  //app => le pongo de nombre app para el componente (es el nombre generico)
  name: "app",
  initialState,
  reducers: {
    //reducers sincronos la aplicacion lee y escribe
    setEmail: (state, action) => {
      state.url = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setBody: (state, action) => {
      state.body = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    
 
  },
});

export default appSlice;
