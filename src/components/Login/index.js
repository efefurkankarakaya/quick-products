import React, {useRef} from 'react';
import {View, Text, Image} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {useSelector, useDispatch} from 'react-redux';
import {logIn} from '../../redux/login/loginSlice';

import {CustomTextInput, CustomButton, CustomText} from '../../fields';
import styles from './Login.styles.js';
import Logo from '../../assets/logo.png';

import axios from 'axios';
import qs from 'qs';

// Mock
import LoginResult from '../../mock/login_data';

// Validations
const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

// Login Component
function Login({navigation}) {
  // Redux
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const dispatch = useDispatch();

  // Ref
  const passwordInput = useRef(null);

  // Formik setup
  const {handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
    validationSchema: loginSchema,
    initialValues: {username: '', password: ''},
    onSubmit: values => {
      // Handle Login with Mock Data
      (() => {
        const data = LoginResult;
        const {message, responseCode, content} = data;
        const {userInfo} = content;
        const {appKey} = userInfo; // TODO: Add to Redux Store
        // TODO: Find Answers for The Questions Below
        //  * Are appKeys constant or changing every single login?
        //  * Are appKeys using as a header?
        console.log(message, responseCode, appKey);
        if (message == 'success' && responseCode == 200) {
          dispatch(logIn({isLoggedIn}));
          navigation.navigate('Quick Forms', {screen: 'Dashboard'});
        }
      })();

      // Handle Login with Real Data
      /*
      // Login endpoint
      const endpoint = 'https://m-baydogan.jotform.dev/intern-api/user/login';

      // Stringify parameters as Query String
      // JSON.stringify does not work here because the endpoint does not support it
      const data = qs.stringify({
        username: values.username,
        password: values.password,
      });

      // Axios Config
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      // Axios POST Request
      axios
        .post(endpoint, data, config)
        .then(({data}) => {
          // Destructure Data
          const {responseCode, content} = data;
          const {userInfo} = content;

          // Control
          const isNotLoginSuccessful = Object.keys(userInfo).length < 1;
          if (isNotLoginSuccessful) {
            console.log('Username or password is invalid.');
            return;
          }

          // If login action success
          const {appKey} = userInfo;
          console.log(appKey);
          dispatch(logIn({isLoggedIn}));
          navigation.navigate('Quick Forms', {screen: 'Dashboard'});
        })
        .catch(err => {
          console.error(err);
        });
        */
    },
  });

  // JSX
  return (
    <View style={styles.logo}>
      <Image source={Logo} style={styles.image} />
      <Text style={styles.header}>Quick Products</Text>
      <View style={styles.wrapper}>
        <CustomTextInput
          color="#0A1551"
          icon="mail"
          placeholder="USERNAME"
          autoCapitalize="none"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onChangeText={handleChange('username')}
          onSubmitEditing={() => passwordInput.current?.focus()}
          onBlur={handleBlur('username')}
          error={errors.username}
          touched={touched.username}
        />
      </View>
      <View style={styles.wrapper}>
        <CustomTextInput
          color="#0A1551"
          icon="key"
          placeholder="PASSWORD"
          secureTextEntry
          autoCompleteType="password"
          autoCapitalize="none"
          keyboardAppearance="dark"
          returnKeyType="go"
          returnKeyLabel="go"
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          error={errors.password}
          touched={touched.password}
          ref={passwordInput}
        />
      </View>
      <View style={styles.singInButton}>
        <CustomButton label="SIGN IN" onPress={() => handleSubmit()} />
      </View>

      <CustomText
        dynamicStyle={{
          backgroundColor: 'transparent',
          color: '#0099FF',
        }}
        dynamicTextStyle={{
          color: '#0099FF',
        }}
        label="Forgot Password?"
        onPress={() => handleSubmit()}
        // TODO: Navigate Forgot Password
      />

      <View style={styles.register}>
        <Text>
          Don't you have an account?
          <CustomText
            dynamicTextStyle={{
              color: '#0099FF',
            }}
            label=" Sign Up"
            onPress={() => handleSubmit()}
            // TODO: Navigate Sign Up / Register
          />
        </Text>
      </View>
    </View>
  );
}

export default Login;
