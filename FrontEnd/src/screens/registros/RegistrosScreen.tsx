import {
  Alert,
  DevSettings,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/app/hooks';
import {postRegistro} from '../../redux/features/RegistrosSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      `Nombre: ${nombre}\nApellido: ${apellido}\nEdad: ${edad}\nCorreo: ${correo}\nCelular: ${celular}`,
    );

    DevSettings.reload();

    setNombre('');
    setApellido('');
    setEdad('');
    setCorreo('');
    setCelular('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Registro</Text>
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
        <Pressable style={styles.buttonStyle} onPress={handleRegistro}>
          <Text style={styles.buttonTextStyle}>Registrarse</Text>
        </Pressable>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 16,
  },
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
