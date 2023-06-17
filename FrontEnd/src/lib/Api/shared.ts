import {Api, Response} from './Api';

export const obtenerRegistros = () => {
  return Api.get<Response<{}>>('/buscar');
};

export const deleteLibros = (idLibro: number) => {
  return Api.get<Response<{}>>(`deleteLibro/${idLibro}`);
};

export const obtenerRegistrosVehiculos = (placas: string) => {
  return Api.get<Response<{}>>(`buscarRegistros/${placas}`);
};

export const addUsuario = (nombre: string, apellido: string, edad: string, correo: string, celular: string) => {
  return Api.post<Response<{}>>(`addUsuario`, {nombre, apellido, edad, correo, celular});
}
