import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Button 
} from 'react-native';

export default function App() {

  const buttonChangeName = () => {
    if(name == 'Istiak'){
      setName('Ghani')
    }else{
      setName('Istiak')
    }
    setCounter(counter + 1)
  }

  const [name, setName] = useState('Mash')

  const [counter, setCounter] = useState(0)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{counter}</Text>
      <Button 
      onPress={() => buttonChangeName()}
        title="Change Name"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text : {
    fontSize : 70,
    color : '#fff'
  }
});
