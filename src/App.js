import React from 'react';
import {SafeAreaView, View} from 'react-native';

import {store} from './redux/store';
import {Provider} from 'react-redux';

import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login, Dashboard} from './components';
import styles from './App.style';

const Stack = createNativeStackNavigator();

const FLSOptions = {
  headerTitleAlign: 'center',
  title: 'Quick Products',
};

const FirstLoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={FLSOptions} />
      <Stack.Screen name="Register" component="Register" options={FLSOptions} />
    </Stack.Navigator>
  );
};

/* TODO: 
  * Dynamic initial routing (with using LowDB or AsyncLocalStorage)
    if (user.onceLoggedIn) {
      return <Stack.Navigator initialRouteName="Dashboard" />;
    }
*/

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTitleAlign: 'center',
              title: 'Quick Products',
            }}
          /> */}
          <Stack.Screen name="First Login" component={FirstLoginStack} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
