import {Button, FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {FC, PureComponent, useEffect} from 'react';
import { getLibro, setResponseGetLibro } from '../../redux/features/LibrosSlice';
import {
  getIdLibro,
  setResponseGetLibroDetalle,
} from '../../redux/features/DetallesSlice';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Libro} from '../../lib/models/libro';
import {useAppDispatch, useAppSelector} from '../../redux/app/hooks';
import {setIdLibroDetalle} from '../../redux/features/DetallesSlice';
import { NavigationContainer, StackActions, useNavigation } from '@react-navigation/native';

const DetallesScreen: FC = () => {
  const detalleReducer = useAppSelector(state => state.detallesReducer); //SUSCRIBIR PARA RECIBIR DATOS DEL REDUX
  //const {registro} = useAppSelector((state) => state.registro);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  const fetchInitialHandler = () => {
    dispatch(getIdLibro(detalleReducer.idLibro));
  };

  useEffect(() => {  //HACER LA PETICION
    fetchInitialHandler();
  }, []);

   useEffect(() => {
    if (detalleReducer.responseGetLibroDetalle !== null) {
      const tmp = detalleReducer.responseGetLibroDetalle;
      console.log('tmp', detalleReducer);
      dispatch(setResponseGetLibroDetalle(null));
      if (tmp !== 200) {
        console.log(
          'Error',
          'Ocurrió un error al tratar de obtener los vehiculos',
        );
      }
    }
  }, [detalleReducer.responseGetLibroDetalle ]);

  const getNavigation = () => (
    navigation.navigate('HomeScreen')
  );

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Detalles</Text>
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


export default DetallesScreen;
