/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Registro } from '../../lib/models/registro';
import { Api, Response } from '../../lib/Api/Api';

interface RegistroSliceInitialState {
    registro: Registro[];
    //registroArray: RegistroArray[];

    //aux: registro[1];
    responseGetRegistro: number | null;
}

const initialState: RegistroSliceInitialState = {
    registro: [],

    // CREAR VARIABLE PARA ACCEDER A LOS DATOS DEL VECTOR QUE ESTE ADENTRO
    responseGetRegistro: null,
};

const registroSlice = createSlice({
    name: 'registroSlice',
    initialState,
    reducers: {
        clearRegistroReducer: state => initialState,
        setResponseGetRegistro: (state, action: PayloadAction<number | null>) => {
            state.responseGetRegistro = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getRegistro.fulfilled, (state, action) => {
            state.responseGetRegistro = action.payload.intStatus;
            state.registro = [...state.registro = action.payload.strAnswer[0].registro];
        });
        builder.addCase(getRegistro.rejected, (state) => {
            state.responseGetRegistro = 400;
        });
    },
});

const getRegistro = createAsyncThunk(
    'registroSlice/buscarRegistros',
    async (placas: string) => {
        const response = await Api.get<Response<{registro: Registro[]}[]>>(`/buscarRegistros/${placas}`);
        console.log(placas);
        console.log(response.data);
        return response.data;
    }
);

export const {
    clearRegistroReducer,
    setResponseGetRegistro
} = registroSlice.actions;

export {
    getRegistro
};

export default registroSlice.reducer;
