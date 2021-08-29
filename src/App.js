import React from 'react';

import {store} from './redux/store';
import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {setItem, getItem, removeItem} from './utils/databaseHelpers';

import {
  Login,
  Register,
  ForgotPassword,
  Dashboard,
  FormDetail,
  ProductDetail,
} from './components';
import styles from './App.style';

const Stack = createNativeStackNavigator();

const PLSSHeaderOptions = {
  headerTitleAlign: 'center',
  title: 'Quick Products',
};

const PreLoginStackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={PLSSHeaderOptions}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={PLSSHeaderOptions}
      />
    </Stack.Navigator>
  );
};

const QFSSHeaderOptions = {};

const QuickFormsStackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Form Detail" component={FormDetail} />
      <Stack.Screen name="Product Detail" component={ProductDetail} />
    </Stack.Navigator>
  );
};

/* TODO: Dynamic initial routing (with using LowDB or AsyncLocalStorage)
    if (user.onceLoggedIn) {
      return <Stack.Navigator initialRouteName="Dashboard" />;
    }
*/

let isThereAnyLoggedInAccount = false;

getItem('user').then(({isLoggedIn, appKey}) => {
  isThereAnyLoggedInAccount = isLoggedIn && appKey ? true : false;
});

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          {!isThereAnyLoggedInAccount && (
            <Stack.Screen name="First Login" component={PreLoginStackScreens} />
          )}
          <Stack.Screen name="Quick Forms" component={QuickFormsStackScreens} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
