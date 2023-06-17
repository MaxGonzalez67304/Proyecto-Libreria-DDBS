/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/app/store';
import LandingScreen from './src/screens/LandingScreen';

const App: FC = () => {
  return (
    <Provider store={store}>
      <LandingScreen/>
    </Provider>
  );
};

export default App;
