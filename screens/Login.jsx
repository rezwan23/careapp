import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar as SB
} from "react-native";

import * as SecureStore from 'expo-secure-store';
import axios from "axios";



async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}





export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getUser()
  })

  async function login() {
    axios.get(`http://ca.theshineday.com/api/login?email=${email}&password=${password}`)
      .then(res => {
        save('user', JSON.stringify(res.data.user))
        save('user', res.data.token)
        if (Object.keys(res.data.user).length) {
          navigation.navigate('Home')
        }
      }).catch(err => {
        alert(err.response.status == 422 ? err.response.data.message : 'Ops! Error')
      })

  }

  async function getUser() {
    let token = await SecureStore.getItemAsync('token');
    if (token) {
      axios.get('http://ca.theshineday.com/api/user', { headers: { "Authorization": `Bearer ${token}` } })
        .then(res => {
          save('user', JSON.stringify(res.data))
          if (Object.keys(res.data).length) {
            navigation.navigate('Home')
          }
        }).catch(err => {
          if(err.response.status == 422){
            alert(err.response.data.message)
          }
        })
    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>CARE APP</Text>
      <Image style={styles.image} source={require("../assets/logo2.png")} />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#000"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#000"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>


      <TouchableOpacity onPress={() => login} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.loginBtn}>
        <Text style={styles.loginText}>NOT HAVING ACCOUNT? REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: '#4999d4',
    borderRadius: 10,
    margin: 10,
    marginTop: SB.currentHeight || 0,
  },
  headerText: {
    fontSize: 40,
    color: '#4999d4',
    fontWeight: 'bold',
    padding: 20
  },

  image: {
    marginBottom: 40,
    width: 100,
    height: 100,
    resizeMode: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },

  inputView: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    borderWidth: 3,
    borderColor: '#4999d4',
    borderRadius: 100,
    width: 250,
    textAlign: 'center'
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#4999d4",
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});