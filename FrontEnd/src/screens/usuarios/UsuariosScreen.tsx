import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { FC, PureComponent, useEffect } from 'react';
import {
  deleteIdLibro,
  getUsuarios,
  setResponseGetLibroDetalle,
} from '../../redux/features/UsuariosSlice';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { Usuario } from '../../lib/models/usuario';

const UsuariosScreen: FC = () => {
  const usuarioReducer = useAppSelector(state => state.usuarioReducer);
  const dispatch = useAppDispatch();

  const fetchInitialHandler = () => {
    dispatch(getUsuarios());
    dispatch(deleteIdLibro(usuarioReducer.idLibro));
  };

  useEffect(() => {
    fetchInitialHandler();
  }, []);

  useEffect(() => {
    if (usuarioReducer.responseGetLibroDetalle !== null) {
      const tmp = usuarioReducer.responseGetLibroDetalle;
      console.log('tmp', usuarioReducer);
      dispatch(setResponseGetLibroDetalle(null));
      if (tmp !== 200) {
        console.log(
          'Error',
          'Ocurrió un error al tratar de obtener los usuarios',
        );
      }
    }

    if (usuarioReducer.responseGetUsuarios != null) {
      const tmp = usuarioReducer.responseGetUsuarios;
      console.log('tmp', usuarioReducer);
      dispatch(setResponseGetLibroDetalle(null));
      if (tmp !== 200) {
        console.log(
          'Error',
          'Ocurrió un error al tratar de obtener los usuarios',
        );
      }
    }
  }, [
    usuarioReducer.responseGetLibroDetalle,
    usuarioReducer.responseGetUsuarios,
  ]);

  const renderItem = ({ item }: { item: Usuario }) => {
    return (
      <UsuarioCard
        idUsuario={item.idUsuario}
        nombre={item.nombre}
        apellido={item.apellido}
        edad={item.edad}
        correo={item.correo}
        celular={item.celular}
        nombreLibro={item.nombreLibro}
        tiempoRenta={item.tiempoRenta}
      />
    );
  };

  const renderSeparator = () => <FlatListCardSeparator />;
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTextTitle}>No hay usuarios registrados</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Usuarios</Text>
      <FlatList
        data={usuarioReducer.usuario}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderEmptyComponent}
      />
    </SafeAreaView>
  );
};

class UsuarioCard extends PureComponent<UsuarioCardProps> {
  render() {
    return (
      <View style={styles.notificationContainer}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{this.props.idUsuario}</Text>
        </View>

        <View style={styles.notificationMessageContainer}>
          <Text style={styles.notificationMessage}>
            Nombre: {this.props.nombre}
          </Text>

          <Text style={styles.notificationMessage}>
            Apellido: {this.props.apellido}
          </Text>

          <Text style={styles.notificationMessage}>
            Edad: {this.props.edad}
          </Text>

          <Text style={styles.notificationMessage}>
            Correo: {this.props.correo}
          </Text>

          <Text style={styles.notificationMessage}>
            Teléfono: {this.props.celular}
          </Text>

          <Text style={styles.notificationMessage}>
            Nombre libro rentado: {this.props.nombreLibro}
          </Text>

          <Text style={styles.notificationMessage}>
            Tiempo rentado: {this.props.tiempoRenta}
          </Text>
        </View>
      </View>
    );
  }
}

const FlatListCardSeparator: FC = () => (
  <View style={styles.flatListCardSeparator} />
);

interface UsuarioCardProps {
  idUsuario: number;
  nombre: string;
  apellido: string;
  edad: string;
  correo: string;
  celular: string;
  nombreLibro: string;
  tiempoRenta: string;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  notificationAmount: {
    marginVertical: 4,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
  title: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 16,
  },
  notificationContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
  },
  notificationHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingLeft: 8,
  },
  notificationTitle: {
    color: '#382476',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationDate: {
    color: '#3D4C64',
    fontSize: 12,
    marginVertical: 4,
    fontWeight: '300',
  },
  notificationMessageContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  notificationMessage: {
    color: '#3D4C64',
    textAlign: 'justify',
    marginBottom: 8,
  },
  emptyContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    padding: 10,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  emptyTextTitle: {
    fontSize: 16,
    color: '#3D4C64',
    textAlign: 'center',
  },
  flatListCardSeparator: {
    height: 16,
  },
  buttonStyle: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 130,
    paddingVertical: 12,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 140, 0, 0.7)',
    borderRadius: 4,
    elevation: 3,
  },
  buttonTextStyle: {
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
    color: 'white',
  },
});

export default UsuariosScreen;
