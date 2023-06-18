import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Libro } from '../../lib/models/libro';
import { Usuario } from '../../lib/models/usuario';
import { Api, Response } from '../../lib/Api/Api';

interface UsuariosSliceInitialState {
  detalleLibro: Libro | null;
  usuario: Usuario[];
  idLibro: number;

  responseGetLibroDetalle: number | null;
  responseGetUsuarios: number | null;
}

const initialState: UsuariosSliceInitialState = {
  detalleLibro: null,
  usuario: [],
  idLibro: 0,

  responseGetLibroDetalle: null,
  responseGetUsuarios: null,
};

const usuariosSlice = createSlice({
  name: 'usuariosSlice',
  initialState,
  reducers: {
    clearLibroDetalleReducer: state => initialState,
    setIdLibroDelete: (state, action: PayloadAction<{ idLibro: number }>) => {
      const idLibro = action.payload.idLibro;
      state.idLibro = idLibro;
      console.log('idLibro', idLibro);
    },
    setResponseGetLibroDetalle: (
      state,
      action: PayloadAction<number | null>,
    ) => {
      state.responseGetLibroDetalle = action.payload;
    },
    setResponseGetUsuarios: (state, action: PayloadAction<number | null>) => {
      state.responseGetUsuarios = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(deleteIdLibro.fulfilled, (state, action) => {
      state.responseGetLibroDetalle = action.payload.intStatus;
      state.detalleLibro = action.payload.strAnswer;
      console.log('action.payload.intStatus', action.payload.intStatus);
    });
    builder.addCase(deleteIdLibro.rejected, state => {
      state.responseGetLibroDetalle = 400;
    });

    builder.addCase(getUsuarios.fulfilled, (state, action) => {
      state.responseGetUsuarios = action.payload.intStatus;
      state.usuario = [...(state.usuario = action.payload.strAnswer)];
      console.log('action.payload.intStatus', action.payload.intStatus);
    });
    builder.addCase(getUsuarios.rejected, state => {
      state.responseGetUsuarios = 400;
    });
  },
});

const deleteIdLibro = createAsyncThunk(
  'usuariosSlice/deleteLibro',
  async (idLibro: number) => {
    const response = await Api.get<Response<Libro>>(`/deleteLibro/${idLibro}`);
    console.log(response.data);
    return response.data;
  },
);

const getUsuarios = createAsyncThunk('usuariosSlice/getUsuarios', async () => {
  const response = await Api.get<Response<Usuario[]>>('/getUsuarios');
  console.log(response.data);
  return response.data;
});

export const {
  clearLibroDetalleReducer,
  setIdLibroDelete,
  setResponseGetLibroDetalle,
  setResponseGetUsuarios,
} = usuariosSlice.actions;

export { deleteIdLibro, getUsuarios };

export default usuariosSlice.reducer;
