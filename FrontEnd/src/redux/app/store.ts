import { configureStore } from '@reduxjs/toolkit';
import libroReducer from '../features/LibrosSlice';
import registroReducer from '../features/RegistrosSlice';
import usuarioReducer from '../features/UsuariosSlice';

export const store = configureStore({
    reducer: {
        libro: libroReducer,
        registro: registroReducer,
        usuarioReducer: usuarioReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
