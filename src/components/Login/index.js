import React, {useRef} from 'react';
import {View, Text} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {useSelector, useDispatch} from 'react-redux';
import {logIn} from '../../redux/login/loginSlice';

import {CustomTextInput, CustomButton} from '../../fields';
import styles from './Login.styles.js';
import MockData from '../../mock/login_data';

// Validations
const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .min(2, 'Too short.')
    .max(32, 'Too long.')
    .required('Password is required'),
});

function Login({navigation}) {
  const {eMail: mockEMail, password: mockPassword} = MockData;
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const dispatch = useDispatch();

  const password = useRef(null);

  // Formik setup
  const {handleChange, handleSubmit, handleBlur, values, errors, touched} =
    useFormik({
      validationSchema: loginSchema,
      initialValues: {email: '', password: ''},
      onSubmit: values => {
        const isMatched =
          mockEMail === values.email && mockPassword === values.password;
        if (dispatch(logIn(isMatched))) {
          navigation.navigate('Quick Forms', {screen: 'Dashboard'});
        }
      },
    });

  // Login Action
  const handleLogin = () => {
    // const {email, password} = loginSchema.clean({
    //   email: email.value,
    //   password: password.value,
    // });
    handleSubmit();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <View style={styles.wrapper}>
        <CustomTextInput
          icon="mail"
          placeholder="Enter your email"
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onChangeText={handleChange('email')}
          onSubmitEditing={() => password.current?.focus()}
          onBlur={handleBlur('email')}
          error={errors.email}
          touched={touched.email}
        />
      </View>
      <View style={styles.wrapper}>
        <CustomTextInput
          icon="key"
          placeholder="Enter your password"
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
      <CustomButton label="Login" onPress={() => handleLogin()} />
    </View>
  );
}

export default Login;
