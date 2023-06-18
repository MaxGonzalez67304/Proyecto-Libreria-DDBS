import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Libro} from '../../lib/models/libro';
import {Api, Response} from '../../lib/Api/Api';

interface UsuariosSliceInitialState {
    detalleLibro: Libro | null;
    idLibro: number;

    responseGetLibroDetalle: number | null;
}

const initialState: UsuariosSliceInitialState = {
    detalleLibro: null,
    idLibro: 0,

    responseGetLibroDetalle: null,
};

const usuariosSlice = createSlice({
    name: 'usuariosSlice',
    initialState,
    reducers: {
        clearLibroDetalleReducer: state => initialState,
        setIdLibroDelete: (state, action: PayloadAction<{ idLibro: number }>) => {
            const idLibro = action.payload.idLibro;
            state.idLibro = idLibro;
            console.log("idLibro", idLibro);
        },
        setResponseGetLibroDetalle: (state, action: PayloadAction<number | null>) => {
            state.responseGetLibroDetalle = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(deleteIdLibro.fulfilled, (state, action) => {
            state.responseGetLibroDetalle = action.payload.intStatus;
            state.detalleLibro = action.payload.strAnswer;
            console.log('action.payload.intStatus', action.payload.intStatus);
        });
        builder.addCase(deleteIdLibro.rejected, (state) => {
            state.responseGetLibroDetalle = 400;
        });
    },
});

const deleteIdLibro = createAsyncThunk(
    'usuariosSlice/deleteLibro',
    async (idLibro: number) => {
        const response = await Api.get<Response<Libro>>(`/deleteLibro/${idLibro}`);
        console.log(response.data);
        return response.data;
    }
);

export const {
    clearLibroDetalleReducer,
    setIdLibroDelete,
    setResponseGetLibroDetalle
} = usuariosSlice.actions;

export {
    deleteIdLibro
};

export default usuariosSlice.reducer;
