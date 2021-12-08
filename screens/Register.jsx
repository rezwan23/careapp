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

import {Picker} from '@react-native-picker/picker';



export default function Register({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [userType, setUserType] = useState("patient");

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>CARE APP</Text>
      <Image style={styles.image} source={require("../assets/logo2.png")} />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name."
          placeholderTextColor="#000"
          onChangeText={(name) => setName(name)}
        />
      </View>
      
      <View style={styles.inputView}>
        <View style={styles.picker}>
          <Picker
            selectedValue={gender}
            style={styles.TextInput}
            placeholder="Gender."
            placeholderTextColor="#000"
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Age."
          placeholderTextColor="#000"
          onChangeText={(age) => setAge(age)}
          keyboardType='number-pad'
        />
      </View>
      <View style={styles.inputView}>
        <View style={styles.picker}>
          <Picker
            selectedValue={userType}
            style={styles.TextInput}
            placeholder="Patient/Counselor."
            placeholderTextColor="#000"
            onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
          >
            <Picker.Item label="Patient" value="patient" />
            <Picker.Item label="Counselor" value="counselor" />
          </Picker>
        </View>
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
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password Confirm."
          placeholderTextColor="#000"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginBtn}>
        <Text style={styles.loginText}>ALREADY HAVING ACCOUNT? LOGIN</Text>
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
  },
  picker : {
    borderWidth: 3,
    borderColor: '#4999d4',
    borderRadius: 100,
    height: 50,
  }
});