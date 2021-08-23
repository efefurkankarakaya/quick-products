import React, {useRef} from 'react';
import {View, Text, Image} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {useSelector, useDispatch} from 'react-redux';
import {logIn} from '../../redux/login/loginSlice';

import {CustomTextInput, CustomButton} from '../../fields';

import styles from './Login.styles.js';
import Logo from "../../assets/logo.png"




// Validations
const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .min(2, 'Too short.')
    .max(32, 'Too long.')
    .required('Password is required'),
});

function Login() {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const dispatch = useDispatch();

  const password = useRef(null);

  // Formik setup
  const {handleChange, handleSubmit, handleBlur, values, errors, touched} =
    useFormik({
      validationSchema: loginSchema,
      initialValues: {email: '', password: ''},
      onSubmit: values =>
        alert(
          `Email: ${values.email}, Password: ${values.password}: Status: ${isLoggedIn}`,
        ),
    });

  // Login Action
  const handleLogin = () => {
    // const {email, password} = loginSchema.clean({
    //   email: email.value,
    //   password: password.value,
    // });
    dispatch(logIn());
    handleSubmit();
  };

  return (


    <View style={styles.container}>
     <Image source={Logo} style={styles.image} />
      <Text style={styles.header}>Fast Product</Text>
      <View style={styles.wrapper}>
        <CustomTextInput
          textAlign='center'
           color="#0A1551"
          icon="mail"
          placeholder="USERNAME"
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
          color="#0A1551"
          textAlign='center'
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
      <CustomButton label="SIGN IN" onPress={() => handleLogin()} />
    </View>

  

   
  );
}



export default Login;
