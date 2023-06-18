import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sucursal } from '../../lib/models/sucursal';
import { Api, Response } from '../../lib/Api/Api';

interface SucursalesSliceInitialState {
    sucursal: Sucursal[];

    responseGetSucursales: number | null;
}

const initialState: SucursalesSliceInitialState = {
    sucursal: [],

    responseGetSucursales: null,
};

const sucursalesSlice = createSlice({
    name: 'sucursalesSlice',
    initialState,
    reducers: {
        clearSucursalesReducer: state => initialState,
        setResponseGetSucursales: (state, action: PayloadAction<number | null>) => {
            state.responseGetSucursales = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getSucursales.fulfilled, (state, action) => {
            state.responseGetSucursales = action.payload.intStatus;
            state.sucursal = [...(state.sucursal = action.payload.strAnswer)];
            console.log('action.payload.intStatus', action.payload.intStatus);
        });
        builder.addCase(getSucursales.rejected, state => {
            state.responseGetSucursales = 400;
        });
    },
});

const getSucursales = createAsyncThunk('sucursalesSlice/getSucursales', async () => {
    const response = await Api.get<Response<Sucursal[]>>('/getSucursales');
    console.log(response.data);
    return response.data;
});

export const {
    clearSucursalesReducer,
    setResponseGetSucursales,
} = sucursalesSlice.actions;

export { getSucursales };

export default sucursalesSlice.reducer;
