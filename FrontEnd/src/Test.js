import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Alert,
} from 'react-native';

const App = () => {
    const [text, setText] = useState("");
    const sendData = () => {
        Alert.alert(text);
        axios.get('/user?ID=12345')
          .then(function (response) {
            Alert.alert("통신 성공");
            console.log(response);
          })
          .catch(function (error) {
            Alert.alert("통신 오류");
            console.log(error);
          });
    }
    const setData = (val) => setText(val);

    return (
        <View>
            <TextInput style={styles.input} onChangeText={setData}>류요선 바보</TextInput>
            <Button
                onPress={sendData}
                title="send"
            />
        </View>
    );
};

const styles = StyleSheet.create({
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})

export default App;