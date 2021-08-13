import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Login from './components';
import styles from './App.style';
import {store} from './redux/store';
import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Login />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
