import React, {useRef} from 'react';
import {View, Text, Image} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {useSelector, useDispatch} from 'react-redux';
import {logIn} from '../../redux/reducers/loginReducer';
import {setItem} from '../../utils/databaseHelpers';

import {sendLoginRequest} from '../../controllers/';

import {CustomTextInput, CustomButton, CustomText} from '../../components';
import styles from './Login.styles.js';
import Logo from '../../assets/Logo1.png';
// import {API_KEY} from '../../../.env.js';

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
      // The data to be sent with login request
      const data = {
        username: values.username,
        password: values.password,
      };

      sendLoginRequest(data).then(({appKey, isLoggedIn}) => {
        if (isLoggedIn) {
          console.log(appKey);
          // appKey = API_KEY; // if appKey limit is exceeded.
          setItem('user', {isLoggedIn, appKey});
          dispatch(logIn({isLoggedIn}));
          navigation.navigate('Quick Forms', {screen: 'Dashboard'});
        }
      });
    },
  });

  // JSX
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.image} />
      <Text style={styles.header}>Quick Products</Text>
      <View style={styles.wrapper}>
        <CustomTextInput
          dynamicTextInputStyle={{borderColor: 'lightgrey', borderWidth: 2}}
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
          textAlign="left"
        />
      </View>
      <View style={styles.wrapper}>
        <CustomTextInput
          dynamicTextInputStyle={{borderColor: 'lightgrey', borderWidth: 2}}
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
          textAlign="left"
        />
      </View>
      <View style={styles.singInButton}>
        <CustomButton
          dynamicStyle={{width: 279, left: 2}}
          label="SIGN IN"
          onPress={() => handleSubmit()}
        />
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
