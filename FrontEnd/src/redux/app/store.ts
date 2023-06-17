/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import libroReducer from '../features/LibrosSlice';
import registroReducer from '../features/RegistrosSlice';
import DetallesReducer from '../features/DetallesSlice';

export const store = configureStore({
    reducer: {
        libro: libroReducer,
        registro: registroReducer,
        detallesReducer: DetallesReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
