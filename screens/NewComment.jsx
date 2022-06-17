import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet, Text, StatusBar, Image, TouchableOpacity, SafeAreaView, FlatList, ScrollView } from 'react-native';

import axios from 'axios'

import * as SecureStore from 'expo-secure-store';



const App = ({ route, navigation }) => {

  const [user, setUser] = useState({})
  const [post, setPost] = useState({})
  const [comment, setComment] = useState("")



  useEffect(() => {
    if (typeof route.params !== 'undefined') {
      const { toFetch } = route.params
      if (toFetch) {
        getUser();
        if (route.params.hasOwnProperty('postId')) {
          getPost(route.params.postId)
        }
      }
    }
  })

  async function getUser() {
    let user = await SecureStore.getItemAsync('user');

    setUser(JSON.parse(user))

    route.params.toFetch = false
  }

  async function getPost(postId) {
    let tokenn = await SecureStore.getItemAsync('token');
    if (postId) {
      axios.get(`http://ca.theshineday.com/api/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${tokenn}`
        }
      })
        .then(({ data }) => {
          console.debug(data)
          setPost(data)
        }).catch(err => {
          alert(err)
        })
    }

  }

  async function createComment() {
    let token = await SecureStore.getItemAsync('token');
    if (token) {
      axios.get(`http://ca.theshineday.com/api/comment/${post.id}?comment=${comment}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          getPost(post.id)
          // navigation.navigate('newsFeed', { toFetch: true })
        }).catch(err => {
          console.debug(err)
          alert(err.response.status == 422 ? err.response.data.message : 'Opss! error')
        })
    }

  }



  const renderItem = ({ item }) => {
    return (
      <View style={{
        borderBottomWidth: 2,
        borderColor: '#ededed'
      }}>
        <View style={styles.singleItemWrapper1}>
          <View style={styles.itemWrapperTop}>
            <View style={styles.userText}>
              <Text style={styles.itemWrapperTopText}>{item.user.name} - ({item.user.type})</Text>
              <Text style={styles.itemWrapperBottomText}>{item.created_at}</Text>
            </View>
          </View>
        </View>
        <View style={styles.singleItemMiddle}>
          <Text style={styles.singleItemMiddleText}>{item.comment}</Text>
        </View>
      </View>
    )
  }



  return (
    <SafeAreaView style={styles.container}>
      {Object.keys(post).length > 0
        ?
        <View style={styles.listView}>
          <View style={{ marginTop: StatusBar.currentHeight || 0 }}>
            <View style={styles.singleItemWrapper}>
              <View style={styles.itemWrapperTop}>
                {post.user.photo
                  ? <Image style={styles.userImage} source={{ uri: `http://ca.theshineday.com/uploads/${post.user.photo}` }}></Image>
                  : <Image style={styles.userImage} source={require('../assets/user1.png')}></Image>
                }
                <View style={styles.userText}>
                  <Text style={styles.itemWrapperTopText}>{user.name}</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.PostText}> {post.post}</Text>
            </View>
            <View
              style={{ paddingLeft: 25, paddingRight: 25, alignItems: 'center' }}
            >
              <TextInput
                multiline={true}
                style={styles.TextInput}
                placeholder=".."
                placeholderTextColor="#000"
                onChangeText={(comment) => setComment(comment)}
              />
              <TouchableOpacity onPress={createComment} style={styles.loginBtn}>
                <Text style={styles.loginText}>COMMENT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :
        <View style={styles.listView}>
          <View style={{ marginTop: StatusBar.currentHeight || 0 }}>
            <View style={styles.singleItemWrapper}>
              <View style={styles.itemWrapperTop}>
                <View style={styles.userText1}>
                  <Text style={{ color: '#EF7C8E', fontWeight: 'bold', marginTop: 200, fontSize: 24 }}>Please Select Post</Text>
                  <TouchableOpacity onPress={() => {navigation.navigate('newsFeed', {toFetch : true})}} style={styles.loginBtn}>
                    <Text style={styles.loginText}>Back</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      }
      <FlatList
        data={post.comments}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

    </SafeAreaView>
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
    paddingLeft: 25,
    paddingTop: 25
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
    marginLeft: 6,
  },
  itemWrapperBottomText: {
    color: '#82878c',
    marginTop: 4
  },
  TextInput: {
    paddingLeft: 6,
    borderWidth: 3,
    borderColor: '#4999d4',
    width: "100%",
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
  },
  PostText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 25,
    borderBottomWidth: 2,
    marginBottom: 10,
    borderColor: "#ededed",
  },
  singleItemWrapper1: {
    paddingLeft: 25,
  },
  singleItemMiddle: {
    paddingLeft: 30
  },
  userText1: {
    marginTop: 3,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default App;