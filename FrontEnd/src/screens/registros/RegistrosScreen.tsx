import {Alert, Button, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {FC, PureComponent, useEffect, useState} from 'react';
import { NavigationContainer, StackActions, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { postRegistro } from '../../redux/features/RegistrosSlice';

const RegistrosScreen = () => {
    const dispatch = useAppDispatch();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [correo, setCorreo] = useState('');
    const [celular, setCelular] = useState('');

    const handleRegistro = () => {
      dispatch(postRegistro({nombre, apellido, edad, correo, celular}));

      Alert.alert(
        'Registro Exitoso',
        `Nombre: ${nombre}\nApellido: ${apellido}\nEdad: ${edad}\nCorreo: ${correo}\nCelular: ${celular}`
      );

      setNombre('');
      setApellido('');
      setEdad('');
      setCorreo('');
      setCelular('');
    };

    return (
        <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={text => setNombre(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={apellido}
          onChangeText={text => setApellido(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Edad"
          value={edad}
          onChangeText={text => setEdad(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={correo}
          onChangeText={text => setCorreo(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Celular"
          value={celular}
          onChangeText={text => setCelular(text)}
          keyboardType="phone-pad"
        />

        <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonStyle} onPress={handleRegistro} >
                <Text style={styles.buttonTextStyle}>Registrar</Text>
            </Pressable>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
    },
    buttonStyle: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
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

export default RegistrosScreen;

