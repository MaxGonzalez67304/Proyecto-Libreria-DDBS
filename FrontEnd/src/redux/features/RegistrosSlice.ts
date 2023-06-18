import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Usuario } from '../../lib/models/usuario';
import { Api, Response } from '../../lib/Api/Api';

interface RegistroSliceInitialState {
  registro: Usuario;

  responsePostRegistro: number | null;
}

const initialState: RegistroSliceInitialState = {
  registro: {
    nombre: '',
    apellido: '',
    edad: '',
    correo: '',
    celular: '',
    nombreLibro: '',
    tiempoRenta: '',
  },

  responsePostRegistro: null,
};

const registroSlice = createSlice({
  name: 'registroSlice',
  initialState,
  reducers: {
    clearRegistroReducer: state => initialState,
    setResponseGetRegistro: (state, action: PayloadAction<number | null>) => {
      state.responsePostRegistro = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(postRegistro.fulfilled, (state, action) => {
      state.responsePostRegistro = action.payload.intStatus;
      state.registro = action.payload.strAnswer;
    });
    builder.addCase(postRegistro.rejected, state => {
      state.responsePostRegistro = 400;
    });
  },
});

const postRegistro = createAsyncThunk(
  'registroSlice/addUsuario',
  async (data: {
    nombre: string;
    apellido: string;
    edad: string;
    correo: string;
    celular: string;
    nombreLibro: string;
    tiempoRenta: string;
  }) => {
    const payload = {
      nombre: data.nombre,
      apellido: data.apellido,
      edad: data.edad,
      correo: data.correo,
      celular: data.celular,
      nombreLibro: data.nombreLibro,
      tiempoRenta: data.tiempoRenta,
    };
    const response = await Api.post<Response<Usuario>>(`/addUsuario`, payload);
    return response.data;
  },
);

export const { clearRegistroReducer, setResponseGetRegistro } =
  registroSlice.actions;

export { postRegistro };

export default registroSlice.reducer;
