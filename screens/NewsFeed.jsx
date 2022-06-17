import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import axios from 'axios';

import * as SecureStore from 'expo-secure-store';


const App = ({route, navigation }) => {

  const [data, setData] = useState([])


  function comment(postId){
    navigation.navigate('comment', {postId : postId});
  }


  useEffect(() => {
    if (typeof route.params !== 'undefined') {
      const { toFetch } = route.params
      if (toFetch) {
        getPosts()
      }
    }
  })

  async function getPosts() {
    let token = await SecureStore.getItemAsync('token');
    axios.get(`http://ca.theshineday.com/api/posts`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setData(res.data)
      }).catch(err => {
        alert('Opps Error!')
        console.debug(err.response.data.message)
      })
    // setFetch(false)
    route.params = false
  }

  

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginTop: StatusBar.currentHeight || 0 }}>
        <View style={styles.singleItemWrapper}>
          <View style={styles.itemWrapperTop}>
            <Image style={styles.userImage} source={{uri:`http://ca.theshineday.com/uploads/${item.user.photo}`}}></Image>
            <View style={styles.userText}>
              <Text style={styles.itemWrapperTopText}>{item.user.name} - ({item.user.type})</Text>
              <Text style={styles.itemWrapperBottomText}>{item.created_at}</Text>
            </View>
          </View>
        </View>
        <View style={styles.singleItemMiddle}>
          <Text style={styles.singleItemMiddleText}>{item.post}</Text>
        </View>
        <View style={[styles.singleItemBottom]}>
          <TouchableOpacity onPress={() => {
            comment(item.id)
          }}>
            <FontAwesome5
              name={'comments'}
              size={23}
              color={'#cacccf'}
            />
          </TouchableOpacity>
          <Text style={{ marginLeft: 10, color: '#3e4e6b' }}>{item.comments.length} Comments</Text>
          {
            item.type == 'Threat' ?
              <Text style={styles.postPredictionWarning}>Threat</Text>
              : null
          }
          {
            item.type == 'Normal'  ?
              <Text style={styles.postPredictionNormal}>Normal</Text>
              : null
          }
          {
            item.type == 'Warning'  ?
              <Text style={styles.postPredictionWarning}>Warning</Text>
              : null
          }
        </View>
      </View>
    )
  } 

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
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
    padding: 25,
    borderTopColor: '#ededed',
    borderTopWidth: 2,
    flex: 1,
    flexDirection: 'row'
  },
  itemWrapperTop: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
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
    flex: 1,
    marginTop: 2,
    marginLeft: 10,
    flexDirection: 'column'
  },
  itemWrapperBottomText: {
    color: '#82878c',
    marginTop: 4
  },
  singleItemMiddle: {
    marginLeft: 25,
    marginRight: 25
  },
  singleItemMiddleText: {
    fontSize: 30,
    borderColor: '#cacccf',
    borderWidth: 2,
    borderRadius: 10,
    color: '#3e4e6b',
    padding: 30
  },
  singleItemBottom: {
    margin: 25,
    marginBottom: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  postPredictionWarning: {
    marginLeft: 10,
    color: '#EF7C8E',
    borderRadius: 5,
    padding: 4,
    borderWidth: 1,
    borderColor: '#EF7C8E'
  },
  postPredictionNormal: {
    marginLeft: 10,
    color: '#5eba7d',
    borderRadius: 5,
    padding: 4,
    borderWidth: 1,
    borderColor: '#5eba7d'
  }
});

export default App;