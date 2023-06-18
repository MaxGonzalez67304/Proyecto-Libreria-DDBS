import { Button, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { FC, PureComponent, useEffect } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Sucursal } from '../../lib/models/sucursal';
import { useAppSelector, useAppDispatch } from '../../redux/app/hooks';
import { getSucursales, setResponseGetSucursales } from '../../redux/features/SucursalesSlice';

const SucursalesScreen: FC = () => {
  const sucursalReducer = useAppSelector(state => state.sucursalReducer);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  const fetchInitialHandler = () => {
    dispatch(getSucursales());
  };

  useEffect(() => {
    fetchInitialHandler();
  }, []);

  useEffect(() => {
    if (sucursalReducer.responseGetSucursales !== null) {
      const tmp = sucursalReducer.responseGetSucursales;
      console.log('tmp', sucursalReducer);
      dispatch(setResponseGetSucursales(null));
      if (tmp !== 200) {
        console.log(
          'Error',
          'Ocurrió un error al tratar de obtener las sucursales',
        );
      }
    }
  }, [sucursalReducer.responseGetSucursales]);

  const renderItem = ({ item }: { item: Sucursal }) => {
    return (
      <SucursalCard
        idSucursal={item.idSucursal}
        ciudad={item.ciudad}
        estado={item.estado}
        direccion={item.direccion}
      />
    );
  };

  const renderSeparator = () => <FlatListCardSeparator />;
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTextTitle}>No hay sucursales registradas</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Sucursales</Text>
      <FlatList
        data={sucursalReducer.sucursal}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderEmptyComponent}
      />
    </SafeAreaView>
  );
};

class SucursalCard extends PureComponent<SucursalCardProps> {
  render() {
    return (
      <View style={styles.notificationContainer}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{this.props.idSucursal}</Text>
        </View>

        <View style={styles.notificationMessageContainer}>
          <Text style={styles.notificationMessage}>
            Ciudad: {this.props.ciudad}
          </Text>

          <Text style={styles.notificationMessage}>
            Estado: {this.props.estado}
          </Text>

          <Text style={styles.notificationMessage}>
            Dirección: {this.props.direccion}
          </Text>
        </View>
      </View>
    );
  }
}

const FlatListCardSeparator: FC = () => (
  <View style={styles.flatListCardSeparator} />
);

interface SucursalCardProps {
  idSucursal: number;
  ciudad: string;
  estado: string;
  direccion: string;
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

export default SucursalesScreen;
