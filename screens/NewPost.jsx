import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'

import * as SecureStore from 'expo-secure-store';


const App = ({route, navigation }) => {

  const [user, setUser] = useState({})
  const [post, setPost] = useState('')


  useEffect(() => {
    if(typeof route.params !== 'undefined'){
      const { toFetch } = route.params
      if(toFetch){
        getUser();
      }
    }
  })

  async function getUser() {
    let user = await SecureStore.getItemAsync('user');
    setUser(JSON.parse(user))
    route.params.toFetch = false
  }

  async function createPost() {
    let token = await SecureStore.getItemAsync('token');
    if (token) {
      axios.get(`http://ca.theshineday.com/api/create-post?post=${post}`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
        .then(res => {
          console.debug(res.data)
          navigation.navigate('newsFeed', {toFetch : true})
        }).catch(err => {
          console.debug(err)
          alert(err.response.status == 422 ? err.response.data.message : err.response.data.message)
        })
    }

  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: StatusBar.currentHeight || 0 }}>
        <View style={styles.singleItemWrapper}>
          <View style={styles.itemWrapperTop}>
            {user.photo 
            ? <Image style={styles.userImage} source={{uri:`http://ca.theshineday.com/uploads/${user.photo}`}}></Image>
            : <Image style={styles.userImage} source={require('../assets/user1.png')}></Image>
            }
            <View style={styles.userText}>
              <Text style={styles.itemWrapperTopText}>{user.name}</Text>
            </View>
          </View>
        </View>
        <View
          style={{ paddingLeft: 25, paddingRight: 25, alignItems: 'center' }}
        >
          <TextInput
            multiline={true}
            style={styles.TextInput}
            placeholder="What are you feeling..?"
            placeholderTextColor="#000"
            onChangeText={(post) => setPost(post)}
          />
          <TouchableOpacity onPress={createPost} style={styles.loginBtn}>
            <Text style={styles.loginText}>CREATE POST</Text>
          </TouchableOpacity>
        </View>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  singleItemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 25
  },
  itemWrapperTop: {
    flexDirection: 'row',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 2,
    borderColor: '#4999d4'
  },
  itemWrapperTopText: {
    fontWeight: 'bold'
  },
  userText: {
    marginTop: 3,
    marginLeft: 6
  },
  itemWrapperBottomText: {
    color: '#82878c',
    marginTop: 4
  },
  TextInput: {
    paddingLeft: 6,
    borderWidth: 3,
    borderColor: '#4999d4',
    width: 300,
    minHeight: 100
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#4999d4",
    marginTop: 30
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default App;