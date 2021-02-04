/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {WebView} from 'react-native-webview';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [uri, setUri] = useState(
    'http://192.168.100.17:3000/?pId=414e3b20-f977-11ea-98e7-db6123d0c0f9&appId=aff49610-3536-11eb-9f69-b1a5cc3b1c10&auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhZmY0OTYxMC0zNTM2LTExZWItOWY2OS1iMWE1Y2MzYjFjMTAiLCJzdWIiOiJjYjBiZjhlMC00OGRlLTExZWItYmYzOS1mMzRhMjI2MDk3ZGYifQ.WdlsrAWe0CqnDbwwIC3KhkT08U2qz8-AcniGXdmYaLs',
  );
  const [loading, setLoading] = useState(false);
  const [startWebView, setStartWebView] = useState(false);

  const onNavigationStateChange = (state) => {
    console.log(state);
    if (state.loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  const onMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log('onMessage', event, data);

    if (data.event === 'prixa-close-app') {
      setStartWebView(false);
      Alert.alert('Berhasil', 'Selamat anda sudah bisa keluar dari prixa.');
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.body}>
        {!startWebView || !uri ? (
          <View style={{padding: 10}}>
            <TextInput
              style={{height: 40}}
              placeholder="Masukkan alamat url webview gan."
              onChangeText={(text) => setUri(text)}
              defaultValue={uri}
            />
            <TouchableOpacity
              onPress={() => {
                if (uri) {
                  setLoading(true);
                  setStartWebView(true);
                }
              }}
              disabled={!uri}>
              <Text
                style={{
                  backgroundColor: '#4695EA',
                  color: '#FFF',
                  fontSize: 16,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  opacity: uri ? 1 : 0.7,
                }}>
                Open Webview
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <React.Fragment>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#4695EA"
                style={{flex: 1}}
              />
            )}
            <WebView
              onNavigationStateChange={onNavigationStateChange}
              source={{uri}}
              style={{flex: 1}}
              originWhitelist={['http://*', 'https://*']}
              onMessage={(e) => onMessage(e)}
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
            />
          </React.Fragment>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
