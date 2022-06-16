import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Constants } from 'expo';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';



export default class App extends Component {
  state = {
    image: null,
    uploading: false,
    user: {},
    token: '',
  };

  async componentDidMount() {
    if (typeof this.props.route.params !== 'undefined') {
      const { toFetch } = this.props.route.params
      if (toFetch) {
        let token = await SecureStore.getItemAsync('token');
        let user = await SecureStore.getItemAsync('user');
        if (token) {
          this.state.token = token
        }
        if(user){
          this.state.user = user
        }
      }
    }
    this.props.route.params.toFetch = false
    console.debug("Component did mount")
  }

  render() {
    let {
      image
    } = this.state;

    return (
      <View style={{ marginTop: 50, flex: 1, flexDirection: 'column', padding: 25 }}>
        <StatusBar barStyle="default" />
        <View>
          <Text style={{fontSize:30, marginBottom : 20, textAlign:'center', fontWeight : 'bold'}}>Edit Profile Picture</Text>
        </View>

        <View style={{ marginBottom : 10}}>
          <Button
            onPress={this._pickImage}
            title="Pick an image from gallery"
          />
        </View>

        <Button onPress={this._takePhoto} title="Take a photo" />
        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
        >
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let {
      image
    } = this.state;

    if (!image) {
      return;
    }

    return (
      <View
      >
        <View
        >
          <Image source={{ uri: image }} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
        >
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [3, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [3, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;


    this.setState({
      uploading: true
    });

    if (!pickerResult.cancelled) {
      // uploadResponse = await uploadImageAsync(pickerResult.uri);

      let apiUrl = 'http://ca.theshineday.com/api/photo-upload';
      let uriParts = pickerResult.uri.split('.');
      let fileType = uriParts[uriParts.length - 1];

      let formData = new FormData();

      let uri = pickerResult.uri
      formData.append('fileToUpload', {
        uri,
        name: `fileToUpload.${fileType}`,
        type: `image/${fileType}`,
      });

      console.debug(uri)

      let token = await SecureStore.getItemAsync('token');


      axios.post(apiUrl, formData, {
        headers: {
          authorization: `Bearer ${token}`,
          'content-type': 'multipart/form-data',
        },
      }).then(({ data }) => {
        console.debug(data)
        axios.get(`http://ca.theshineday.com/api/user`)
        .then( ({data}) => {
          SecureStore.setItemAsync('user', data);
        })
        this.setState({
          uploading: false
        });
        this.props.navigation.navigate('newsFeed', { toFetch: true, fetchUser : true })
      }).catch(err => {
        console.debug(err.response.data.message)
      })

    }
  };
}

async function uploadImageAsync(uri) {
  let apiUrl = 'http://ca.theshineday.com/api/photo-upload';
  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('fileToUpload', {
    uri,
    name: `fileToUpload.${fileType}`,
    type: `image/${fileType}`,
  });

  let token = await SecureStore.getItemAsync('token');

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      authorization: `Bearer ${token}`
    },
  };

  return fetch(apiUrl, options);

  console.debug(formData)
}
