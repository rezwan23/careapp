import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar as SB
} from "react-native";




export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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


      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.loginBtn}>
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
    borderWidth : 5,
    borderColor : '#4999d4',
    borderRadius : 10,
    margin : 10,
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
    marginBottom : 20,
    backgroundColor: "#4999d4",
  },
  loginText: {
    color: '#fff',
    fontWeight : 'bold'
  }
});