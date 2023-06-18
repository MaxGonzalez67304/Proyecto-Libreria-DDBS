import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import React, {FC} from 'react';
import {
  StackActions,
  useNavigation,
} from '@react-navigation/native';

const PromocionesScreen: FC = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sucursales</Text>
      <Button
        title="Ir a Home"
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

export default PromocionesScreen;
