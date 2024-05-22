//importaciones de la libreria 
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';


import appSlice from './appSlice.ts';
import UserSlice from './UserSlice.ts';

export const store = configureStore({
    reducer: {
        app: appSlice.reducer,//slice que guarda los estados
       
        usuario: UserSlice.reducer // Agrega el slice relacionado con las casas
  

      
    }
});

type rootStateType = ReturnType<typeof store.getState>

type mapStateType = ReturnType<typeof appSlice.reducer>
//


type UserSliceType = ReturnType<typeof UserSlice.reducer>; // Define un tipo para el estado relacionado con las casas

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

//dispatch para usar los estados que se encuentra en appSlice.ts
export const useAppSelector = () => useSelector<rootStateType, mapStateType>(a => a.app);

export const useUsuarioSelector = () => useSelector<rootStateType, UserSliceType>(a => a.usuario);