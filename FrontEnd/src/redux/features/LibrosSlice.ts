import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Libro} from '../../lib/models/libro';
import {Api, Response} from '../../lib/Api/Api';

interface LibrosSliceInitialState {
    libro: Libro[];
    idLibro: string;

    responseGetLibro: number | null;
}

const initialState: LibrosSliceInitialState = {
    libro: [],
    idLibro: '',

    responseGetLibro: null,
};

const librosSlice = createSlice({
    name: 'librosSlice',
    initialState,
    reducers: {
        clearLibroReducer: state => initialState,
        setIdLibro: (state, action: PayloadAction<{ idLibro: string }>) => {
            const idLibro = action.payload.idLibro;
            state.idLibro = idLibro;
        },
        setResponseGetLibro: (state, action: PayloadAction<number | null>) => {
            state.responseGetLibro = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getLibro.fulfilled, (state, action) => {
            state.responseGetLibro = action.payload.intStatus;
            state.libro = [...state.libro = action.payload.strAnswer];
            console.log('action.payload.intStatus', action.payload.intStatus);
        });
        builder.addCase(getLibro.rejected, (state) => {
            state.responseGetLibro = 400;
        });
    },
});

const getLibro = createAsyncThunk(
    'librosSlice/buscar',
    async () => {
        const response = await Api.get<Response<Libro[]>>('/buscar');
        console.log(response.data);
        return response.data;
    }
);

export const {
    clearLibroReducer,
    setIdLibro,
    setResponseGetLibro
} = librosSlice.actions;

export {
    getLibro
};

export default librosSlice.reducer;
