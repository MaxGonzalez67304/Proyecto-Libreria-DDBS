import { Api, Response } from './Api';

export const obtenerRegistros = () => {
  return Api.get<Response<{}>>('/getLibros');
};

export const obtenerUsuarios = () => {
  return Api.get<Response<{}>>('/getUsuarios');
};

export const obtenerSucursales = () => {
  return Api.get<Response<{}>>('/getSucursales');
};

export const deleteLibros = (idLibro: number) => {
  return Api.get<Response<{}>>(`deleteLibro/${idLibro}`);
};

export const addUsuario = (
  nombre: string,
  apellido: string,
  edad: string,
  correo: string,
  celular: string,
  nombreLibro: string,
  tiempoRenta: string,
) => {
  return Api.post<Response<{}>>(`addUsuario`, {
    nombre,
    apellido,
    edad,
    correo,
    celular,
    nombreLibro,
    tiempoRenta,
  });
};
