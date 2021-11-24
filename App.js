import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Button 
} from 'react-native';

export default function App() {


  return (
    <View style={{
      flex : 1,
      backgroundColor: '#000'
    }}>
      <View style={styles.container1}>
        <View style={styles.view1}>
          <Text style={styles.text1}>1</Text>
        </View>
        <View style={styles.view2}>
          <Text style={styles.text1}>2</Text>
        </View>
        <View style={styles.view3}>
          <Text style={styles.text1}>3</Text>
        </View>
        <View style={styles.view4}>
          <Text style={styles.text1}>4</Text>
        </View>
      </View>
    </View>
      
  );
}

const styles = StyleSheet.create({
  container1: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    flexDirection : 'row',
  },
  text1 : {
    fontSize : 70,
    color : '#fff'
  },
  view1 :{
    flex : 1,
    backgroundColor : 'red',
    alignItems : 'center',
    justifyContent : 'center'
  },
  view2 :{
    flex : 2,
    backgroundColor : 'green',
    alignItems : 'center',
    justifyContent : 'center'
  },
  view3 :{
    flex: 3,
    backgroundColor : 'blue',
    alignItems : 'center',
    justifyContent : 'center'
  },
  view4 :{
    flex : 1,
    backgroundColor : '#000',
    alignItems : 'center',
    justifyContent : 'center'
  }
});
