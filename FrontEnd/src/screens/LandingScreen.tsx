import {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/home/HomeScreen';
import DetallesScreen from './detalles/DetallesScreen';
import RegistrosScreen from '../screens/registros/RegistrosScreen';
import SucursalesScreen from './sucursales/SucursalesScreen';

const Tab = createMaterialBottomTabNavigator();

const LandingScreen: FC = () => {
  let initialRoute = 'HomeScreen';

  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="white"
        barStyle={{backgroundColor: 'rgba(255, 140, 0, 0.7)'}}
        initialRouteName={initialRoute}>

        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Libros',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="variable" color={color} size={20} />
            ),
          }}
        />

        <Tab.Screen
          name="DetallesScreen"
          component={DetallesScreen}
          options={{
            tabBarLabel: 'Detalles',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="camera" color={color} size={20} />
            ),
          }}
        />

        <Tab.Screen
          name="SucursalesScreen"
          component={SucursalesScreen}
          options={{
            tabBarLabel: 'Sucursales',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="bookmark" color={color} size={20} />
            ),
          }}
        />

        <Tab.Screen
          name="RegistrosScreen"
          component={RegistrosScreen}
          options={{
            tabBarLabel: 'Registros',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="star" color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default LandingScreen;
