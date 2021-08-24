import React, {useRef} from 'react';
import {View, Text, Image} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {useSelector, useDispatch} from 'react-redux';
import {logIn} from '../../redux/login/loginSlice';

import {API_KEY} from '../../../.env';
console.log('API: ' + API_KEY);

import {CustomTextInput, CustomButton, CustomText} from '../../fields';
import styles from './Login.styles.js';
import Logo from '../../assets/logo.png';
import axios from 'axios';

// Mock
import LoginResult from '../../mock/login_data';

// Validations
const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(2, 'Too short.')
    .max(32, 'Too long.')
    .required('Password is required'),
});

// Login Component
function Login({navigation}) {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const dispatch = useDispatch();

  const password = useRef(null);

  // Formik setup
  const {handleChange, handleSubmit, handleBlur, values, errors, touched} =
    useFormik({
      validationSchema: loginSchema,
      initialValues: {username: '', password: ''},
      onSubmit: values => {
        console.log(values);

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

        // Handle Login With Real Data
        /*
        axios
          .post(`https://api.jotform.com/user/login`, {
            // .post(`https://m-baydogan.jotform.dev/intern-api/user/login`, {
            username: values.username.trim(),
            password: values.password.trim(),
            appName: 'Quick Forms',
            access: 'full',
          })
          .then(({data}) => {
            console.log(data);
            // const {message, responseCode} = data;
            // if (message == 'success' && responseCode == 200) {
            //   dispatch(logIn({isLoggedIn}));
            //   navigation.navigate('Quick Forms', {screen: 'Dashboard'});
            // }
          })
          .catch(err => {
            console.error(err);
            console.log(err);
            // console.log(err.message);
            // console.log(err.request);
            console.log('============ ERROR DATA ============');
            console.log(err.response.data);
            console.log('============ ERROR STATUS ============');
            console.log(err.response.status);
            console.log('============ ERROR HEADERS ============');
            console.log(err.response.headers);
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
          onSubmitEditing={() => password.current?.focus()}
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
          ref={password}
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
        label="Forget Password ?"
        onPress={() => handleSubmit()}
      />

      <View style={styles.register}>
        <Text>
          Don't you have an account?
          <CustomText
            dynamicTextStyle={{
              color: '#0099FF',
            }}
            label=" Sign In"
            onPress={() => handleSubmit()}
          />
        </Text>
      </View>
    </View>
  );
}

export default Login;
