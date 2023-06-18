import {Button, FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {FC, PureComponent, useEffect} from 'react';
import {
  deleteIdLibro,
  getUsuarios,
  setResponseGetLibroDetalle,
} from '../../redux/features/UsuariosSlice';
import {useAppDispatch, useAppSelector} from '../../redux/app/hooks';
import { StackActions, useNavigation } from '@react-navigation/native';

const UsuariosScreen: FC = () => {
  const usuarioReducer = useAppSelector(state => state.usuarioReducer);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  const fetchInitialHandler = () => {
    dispatch(getUsuarios());
    dispatch(deleteIdLibro(usuarioReducer.idLibro));
  };

  useEffect(() => {  //HACER LA PETICION
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
  }, [usuarioReducer.responseGetLibroDetalle ]);

  const getNavigation = () => (
    navigation.navigate('HomeScreen')
  );

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Usuarios</Text>
    <Button
        title="PRUEBA"
        onPress={() => navigation.dispatch(StackActions.popToTop())}
    />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F8FC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default UsuariosScreen;
