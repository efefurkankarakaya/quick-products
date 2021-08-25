import React from 'react';
import {SafeAreaView, View} from 'react-native';

import {store} from './redux/store';
import {Provider} from 'react-redux';

import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  Login,
  Register,
  ForgotPassword,
  Dashboard,
  FormDetail,
} from './components';
import styles from './App.style';

const Stack = createNativeStackNavigator();

const FLSSHeaderOptions = {
  headerTitleAlign: 'center',
  title: 'Quick Products',
};

// SS: Stack Screens
const FirstLoginSS = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={FLSSHeaderOptions}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={FLSSHeaderOptions}
      />
    </Stack.Navigator>
  );
};

const QuickFormsSS = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Form Detail" component={FormDetail} />
    </Stack.Navigator>
  );
};

/* TODO: Dynamic initial routing (with using LowDB or AsyncLocalStorage)
    if (user.onceLoggedIn) {
      return <Stack.Navigator initialRouteName="Dashboard" />;
    }
*/

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="First Login" component={FirstLoginSS} />
          <Stack.Screen name="Quick Forms" component={QuickFormsSS} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
