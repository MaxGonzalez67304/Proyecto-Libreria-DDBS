import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/home/HomeScreen';
import RegistrosScreen from '../screens/registros/RegistrosScreen';
import SucursalesScreen from './sucursales/SucursalesScreen';
import UsuariosScreen from './usuarios/UsuariosScreen';

const Tab = createMaterialBottomTabNavigator();

const LandingScreen: FC = () => {
  let initialRoute = 'HomeScreen';

  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="white"
        barStyle={{ backgroundColor: 'rgba(255, 140, 0, 0.7)' }}
        initialRouteName={initialRoute}>

        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Libros',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="swim" color={color} size={20} />
            ),
          }}
        />

        <Tab.Screen
          name="SucursalesScreen"
          component={SucursalesScreen}
          options={{
            tabBarLabel: 'Sucursales',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="sitemap" color={color} size={20} />
            ),
          }}
        />

        <Tab.Screen
          name="UsuariosScreen"
          component={UsuariosScreen}
          options={{
            tabBarLabel: 'Usuarios',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="run" color={color} size={20} />
            ),
          }}
        />

        <Tab.Screen
          name="RegistrosScreen"
          component={RegistrosScreen}
          options={{
            tabBarLabel: 'Registro',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="bookmark" color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default LandingScreen;
