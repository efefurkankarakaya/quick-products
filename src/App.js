import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';

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
    <Stack.Navigator initialRouteName="Login">
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
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Form Detail" component={FormDetail} />
      <Stack.Screen name="Product Detail" component={ProductDetail} />
    </Stack.Navigator>
  );
};

// TODO: Fix null object error while no data is present in the database
async function getIsAnyUserLoggedInOnce() {
  try {
    const {isLoggedIn, appKey} = await getItem('user');
    console.log('AND: ' + isLoggedIn && appKey);
    return isLoggedIn && appKey;
  } catch (err) {
    console.error(err);
  }
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isThereAnyLoggedInAccount, setIsThereAnyLoggedInAccount] =
    useState(false);

  useEffect(() => {
    getIsAnyUserLoggedInOnce().then(res => {
      setIsThereAnyLoggedInAccount(res);
      setIsLoading(false);
    });
  }, []);

  const initialMainRouteName = isThereAnyLoggedInAccount
    ? 'Quick Forms'
    : 'Pre Login';
  return (
    <Provider store={store}>
      {isLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialMainRouteName}
            screenOptions={{
              headerShown: false,
            }}>
            {!isThereAnyLoggedInAccount && (
              <Stack.Screen name="Pre Login" component={PreLoginStackScreens} />
            )}
            <Stack.Screen
              name="Quick Forms"
              component={QuickFormsStackScreens}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </Provider>
  );
}

export default App;
