import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Logo from '../assets/images/logoEducacion.1.webp';
import Input from '../components/Input';
import COLORS from '../components/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /*   useEffect(()=>{
    const auth = AsyncStorage.getItem("user");
    if(auth){
      navigation.navigate('CompleteProfile');
    }
  }) */

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.30:5000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
      });
      if (response.ok) {
        const {token} = await response.json();

        // Guardar el token recibido.
        await AsyncStorage.setItem('token', token);

        // Decode the JWT token.
        const decodedToken = jwtDecode(token);

        //salvar el token de forma local

        navigation.navigate('UserDetails', {token: decodedToken});
      } else {
        const error = await response.json();
        alert(error.error);
      }

      // resetear el formulario
      /* setEmail('');
      setPassword(''); */
    } catch (error) {
      console.error('Login Failed ', error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.safe}>
      <Image source={Logo} />
      <ScrollView style={styles.scroll}>
        <View>
          <Text style={styles.TextTitle}>Entrar</Text>
        </View>
        {/*  Correo */}
        {/*   {errMsg ? <Text style={styles.erromessage}>{errMsg}</Text> : null} */}
        <Input label="Correo" value={email} onChangeText={setEmail} />
        {/* Contraseña */}
        <Input
          label="Contraseña"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.CustomButton} onPress={handleLogin}>
          <Text style={styles.appButtonText}>ENTRAR</Text>
        </TouchableOpacity>

        <View>
          <Text
            onPress={() => navigation.navigate('RegisterScreen')}
            style={styles.TextSubTitle}>
            <Text>No Tiene cuenta? </Text>
            <Text style={styles.TextSucTitle}>Entrar aqui</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
  },
  scroll: {
    paddingTop: 50,
    paddingHorizontal: 15,
    width: '100%',
  },
  TextTitle: {
    color: COLORS.black,
    fontSize: 30,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  TextSubTitle: {
    color: COLORS.black,
    fontSize: 15,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  TextSucTitle: {
    color: COLORS.blue,
    fontSize: 15,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  View: {
    marginVertical: 20,
  },
  CustomButton: {
    marginTop: 15,
    width: '100%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#416DC6',
    borderWidth: 0.4,
    height: 45,
    color: 'white',
    elevation: 4,
  },
  erromessage: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: COLORS.blue,
    padding: 5,
    borderRadius: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default LoginScreen;
