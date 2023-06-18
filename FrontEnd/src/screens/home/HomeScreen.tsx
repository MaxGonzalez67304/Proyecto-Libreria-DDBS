import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  DevSettings,
} from 'react-native';
import React, { FC, PureComponent, useEffect } from 'react';
import { Libro } from '../../lib/models/libro';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { useNavigation } from '@react-navigation/native';
import { getLibro, setResponseGetLibro } from '../../redux/features/LibrosSlice';
import { setIdLibroDelete } from '../../redux/features/UsuariosSlice';

const HomeScreen: FC = () => {
  const librosReducer = useAppSelector(state => state.libro);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  const fetchInitialHandler = () => {
    dispatch(getLibro());
  };

  useEffect(() => {
    fetchInitialHandler();
  }, []);

  const detalleHandler = async (idLibro: number) => {
    dispatch(setIdLibroDelete({ idLibro: idLibro }));
    navigation.navigate('UsuariosScreen');
    DevSettings.reload();
  };

  useEffect(() => {
    if (librosReducer.responseGetLibro !== null) {
      const tmp = librosReducer.responseGetLibro;
      console.log('tmp', librosReducer);
      dispatch(setResponseGetLibro(null));
      if (tmp !== 200) {
        console.log(
          'Error',
          'Ocurrió un error al tratar de obtener los libros',
        );
      }
    }
  }, [librosReducer.responseGetLibro]);

  const renderItem = ({ item }: { item: Libro }) => {
    return (
      <LibroCard
        idLibro={item.idLibro}
        nombre={item.nombre}
        isbn={item.isbn}
        tipo={item.tipo}
        autor={item.autor}
        fechaPublicacion={item.fechaPublicacion}
        cantidad={item.cantidad}
        getNavigationUsuario={getNavigationUsuario}
        detalleHandler={detalleHandler}
      />
    );
  };

  const getNavigationUsuario = () => navigation.navigate('UsuariosScreen');

  const renderSeparator = () => <FlatListCardSeparator />;
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTextTitle}>No hay libros registrados</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Libros</Text>
      <FlatList
        data={librosReducer.libro}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderEmptyComponent}
      />
    </SafeAreaView>
  );
};

class LibroCard extends PureComponent<LibroCardProps> {
  render() {
    return (
      <View style={styles.notificationContainer}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{this.props.idLibro}</Text>
        </View>

        <View style={styles.notificationMessageContainer}>
          <Text style={styles.notificationMessage}>
            Nombre: {this.props.nombre}
          </Text>
          <Text style={styles.notificationMessage}>
            Tipo: {this.props.tipo}
          </Text>
          <Text style={styles.notificationMessage}>
            Autor: {this.props.autor}
          </Text>
          <Text style={styles.notificationMessage}>
            Fecha de publicación:{' '}
            {this.props.fechaPublicacion
              .toString()
              .split(' ')
              .slice(1, 4)
              .join(' ')}
          </Text>
          <Text style={styles.notificationMessage}>
            Cantidad: {this.props.cantidad}
          </Text>

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                this.props.detalleHandler(this.props.idLibro);
              }}>
              <Text style={styles.buttonTextStyle}>Eliminar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }
}

const FlatListCardSeparator: FC = () => (
  <View style={styles.flatListCardSeparator} />
);

interface LibroCardProps {
  idLibro: number;
  nombre: string;
  isbn: number;
  tipo: string;
  autor: string;
  fechaPublicacion: Date;
  cantidad: number;
  getNavigationUsuario: () => void;
  detalleHandler: (idLibro: number) => void;
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
    backgroundColor: 'rgba(255, 140, 0, 1)',
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

export default HomeScreen;
