import React, {useEffect, useState} from 'react';
import {ActivityIndicator, LogBox} from 'react-native';
LogBox.ignoreAllLogs();

import {store} from './redux/store';
import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {setItem, getItem, removeItem} from './utils/databaseHelpers';

import {logOutput, logError} from './utils/logHelpers';

import {
  Login,
  Register,
  ForgotPassword,
  Dashboard,
  FormDetail,
  ProductDetail,
} from './pages';
import styles from './App.style';

const Stack = createNativeStackNavigator();

 const PLSSHeaderOptions = {
  headerTitleAlign: 'center',
  title: 'Quick Products',
};

//removeItem('user');

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

const QFSSHeaderOptions = {
  headerTitleAlign: 'center',
  title: 'My Forms',

  headerStyle: {
    backgroundColor: '#0A1551',
  },

  headerTintColor: '#fff',

  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
};

const ProductDetailsHeaderOptions = {
  headerStyle: {backgroundColor: '#0A1551'},
  headerTintColor: '#fff',
  headerTitleStyle: {
    color: '#fff',
  },
};
const FormDetailsHeaderOption = {
  headerStyle: {backgroundColor: '#0A1551'},
  headerTintColor: '#fff',
  headerTitleStyle: {
    color: '#fff',
  },
};

const QuickFormsStackScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={QFSSHeaderOptions}
      />
      <Stack.Screen
        name="Form Detail"
        component={FormDetail}
        options={FormDetailsHeaderOption}
      />
      <Stack.Screen
        name="Product Detail"
        component={ProductDetail}
        options={ProductDetailsHeaderOptions}
      />
    </Stack.Navigator>
  );
};

// TODO: Fix null object error while no data is present in the database
async function getIsAnyUserLoggedInOnce() {
  const scopes = ['App', 'getIsAnyUserLoggedInOnce'];
  try {
    const {isLoggedIn, appKey} = await getItem('user');
    const isLoginExistAndValid = isLoggedIn && appKey;
    const message = 'isLoggedIn && appKey: ' + isLoginExistAndValid;
    logOutput(scopes, message);
    return isLoginExistAndValid;
  } catch (err) {
    logError(scopes, err.message);
  }
}

// removeItem('user');

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
