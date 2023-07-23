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
        axios({
         url : 'http://yline.ddns.net:8080/test/new',
         method : 'post',
         data : {
           text : "text입니다5"
         }
        }).then(function (response) {
            Alert.alert("통신 성공");
            console.log(response.data.id);
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