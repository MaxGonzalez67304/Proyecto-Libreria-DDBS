import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Libro } from '../../lib/models/libro';
import { Api, Response } from '../../lib/Api/Api';

interface LibrosSliceInitialState {
  libro: Libro[];

  responseGetLibro: number | null;
}

const initialState: LibrosSliceInitialState = {
  libro: [],

  responseGetLibro: null,
};

const librosSlice = createSlice({
  name: 'librosSlice',
  initialState,
  reducers: {
    clearLibroReducer: state => initialState,
    setResponseGetLibro: (state, action: PayloadAction<number | null>) => {
      state.responseGetLibro = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getLibro.fulfilled, (state, action) => {
      state.responseGetLibro = action.payload.intStatus;
      state.libro = [...(state.libro = action.payload.strAnswer)];
      console.log('action.payload.intStatus', action.payload.intStatus);
    });
    builder.addCase(getLibro.rejected, state => {
      state.responseGetLibro = 400;
    });
  },
});

const getLibro = createAsyncThunk('librosSlice/getLibros', async () => {
  const response = await Api.get<Response<Libro[]>>('/getLibros');
  console.log(response.data);
  return response.data;
});

export const { clearLibroReducer, setResponseGetLibro } = librosSlice.actions;

export { getLibro };

export default librosSlice.reducer;
