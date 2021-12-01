import React from 'react';

import {
    Button,
    Pressable,
    StyleSheet,
    Text,
    View,
  } from 'react-native';


  const screenB = ({ navigation }) => {

    const onPressHandler = () => {
      navigation.navigate('Screen_A')
    }
  
    return (
      <View style={ styles.body }>
        <Text style={ styles.text }>Screen B</Text>
        <Pressable 
          onPress={ onPressHandler }
          style={({ pressed }) => [{ backgroundColor : pressed ? '#ddd' : '#0f0' }]}
        >
          <Text style={ styles.screenAText }>Go To Screen A</Text>
        </Pressable>
      </View>
    )
  }

  const styles = StyleSheet.create({
    body : {
      flex : 1,
      alignItems : 'center',
      justifyContent : 'center'
    },
    text : {
      fontSize : 25,
      fontWeight : 'bold'
    },
    screenAText : {
      padding : 10
    }
  });

  export default screenB