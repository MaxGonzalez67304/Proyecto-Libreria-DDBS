import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Libro} from '../../lib/models/libro';
import {Api, Response} from '../../lib/Api/Api';

interface DetalleSliceInitialState {
    detalleLibro: Libro | null;
    idLibro: number;

    responseGetLibroDetalle: number | null;
}

const initialState: DetalleSliceInitialState = {
    detalleLibro: null,
    idLibro: 0,

    responseGetLibroDetalle: null,
};

const detallesSlice = createSlice({
    name: 'detallesSlice',
    initialState,
    reducers: {
        clearLibroDetalleReducer: state => initialState,
        // RECIBES LAS PLACAS QUE FUERON ENVIADAS DESDE EL SCREEN Y LAS GUARDAS EN EL STATE DEL REDUCER
        setIdLibroDetalle: (state, action: PayloadAction<{ idLibro: number }>) => {
            const idLibro = action.payload.idLibro;
            state.idLibro = idLibro;
            console.log("idLibro", idLibro);
        },
        setResponseGetLibroDetalle: (state, action: PayloadAction<number | null>) => {
            state.responseGetLibroDetalle = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getIdLibro.fulfilled, (state, action) => {
            state.responseGetLibroDetalle = action.payload.intStatus;
            state.detalleLibro = action.payload.strAnswer;
            console.log('action.payload.intStatus', action.payload.intStatus);
        });
        builder.addCase(getIdLibro.rejected, (state) => {
            state.responseGetLibroDetalle = 400;
        });
    },
});

const getIdLibro = createAsyncThunk(
    'detallesSlice/deleteLibro',
    async (idLibro: number) => {
        console.log("ola", idLibro);
        const response = await Api.get<Response<Libro>>(`/deleteLibro/${idLibro}`);
        console.log(response.data);
        return response.data;
    }
);

export const {
    clearLibroDetalleReducer,
    setIdLibroDetalle,
    setResponseGetLibroDetalle
} = detallesSlice.actions;

export {
    getIdLibro
};

export default detallesSlice.reducer;
