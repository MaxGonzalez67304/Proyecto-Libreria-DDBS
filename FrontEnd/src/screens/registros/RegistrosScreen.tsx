import React, { useState } from 'react';
import {
  Alert,
  DevSettings,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAppDispatch } from '../../redux/app/hooks';
import { postRegistro } from '../../redux/features/RegistrosSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';

const RegistrosScreen = () => {
  const dispatch = useAppDispatch();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [nombreLibro, setNombreLibro] = useState('');
  const [tiempoRenta, setTiempoRenta] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleRegistro = () => {
    dispatch(
      postRegistro({
        nombre,
        apellido,
        edad,
        correo,
        celular,
        nombreLibro,
        tiempoRenta,
      }),
    );

    Alert.alert(
      'Registro Exitoso',
      `Nombre: ${nombre}\nApellido: ${apellido}\nEdad: ${edad}\nCorreo: ${correo}\nCelular: ${celular} \nNombre del libro: ${nombreLibro}\nTiempo de renta: ${tiempoRenta}`,
    );

    DevSettings.reload();

    setNombre('');
    setApellido('');
    setEdad('');
    setCorreo('');
    setCelular('');
    setNombreLibro('');
    setTiempoRenta('');
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setTiempoRenta(date.toDateString()); // Almacenar la fecha seleccionada como una cadena (string)
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

        <TextInput
          style={styles.input}
          placeholder="Nombre del libro"
          value={nombreLibro}
          onChangeText={text => setNombreLibro(text)}
        />

        <Text style={styles.datePickerLabel}>Tiempo de renta:</Text>
        <View style={styles.datePickerContainer}>
          <DatePicker
            style={styles.datePickerButton}
            date={selectedDate}
            mode="date"
            onDateChange={handleDateChange}
          />
        </View>

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
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  datePickerLabel: {
    marginRight: 10,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 300,
    height: 80,
    marginBottom: 10,
    padding: 10,
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

export default RegistrosScreen;
