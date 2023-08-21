import React,{ useEffect, useState, useRef } from 'react';
import axios from 'axios';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Alert,
    TouchableOpacity,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SendAll from "./SendAll";

export default function FindScreen({ navigation }: any) {
//const JoinScreen = () => {
    const childRef = useRef();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const setEmailData = (val) => setEmail(val);
    const setNameData = (val) => setName(val);
    const setPhoneNoData = (val) => setPhoneNo(val);
    const setBirthDateData = (val) => setBirthDate(val);

    const send = () => {
        //console.log(email);
        //console.log(pw);

        //인증번호 확인 체크 추가 필요
        if (email === '' || email === null) {
            Alert.alert('이메일이 입력되지 않았습니다.');
        } else if (name === '' || name === null) {
            Alert.alert('이름이 입력되지 않았습니다.');
        } else if (phoneNo === '' || phoneNo === null) {
            Alert.alert('전화번호가 입력되지 않았습니다.');
        } else {

            AsyncStorage.setItem('Find', JSON.stringify({
              email: email,
              name: name,
              phoneNo : phoneNo,
            }));

            /*
            SendAll.setProps = {
                "email" : email,
                "pw" : pw,
            };
            */

            childRef.current.FindSend();
            ///navigation.navigate('SendAll');

            //후처리
            //200번째만 성공
        }
        return;
     }

    return (
        <View style={styles.main}>
            <SendAll ref={childRef}></SendAll>
            <Text style={styles.TextStyle}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder={'Email'}
                onChangeText={setEmailData}
            />
            <Text style={styles.TextStyle}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder={'Name'}
                onChangeText={setNameData}
            />
            <Text style={styles.TextStyle}>Birth Date</Text>
            <TextInput
                style={styles.input}
                placeholder={'Birth Date'}
                onChangeText={setBirthDateData}
            />
            <Text style={styles.TextStyle}>Phone Number</Text>
            <TextInput
                style={styles.input}
                placeholder={'Phone No'}
                onChangeText={setPhoneNoData}
            />
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.loginFont}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnLogin} onPress={send}>
                    <Text style={styles.loginFont}>Send Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#FFFFFF',
        width: '83%',
        height: 48,
        paddingLeft: 15,
        borderRadius: 5,
        marginBottom: 12,
        alignSelf: 'center',
    },

    ShortInput: {
        backgroundColor: '#FFFFFF',
        width: '55%',
        height: 48,
        paddingLeft: 15,
        borderRadius: 5,
        marginBottom: 12,
        alignSelf: 'center',
    },

    main: {
        backgroundColor : '#AB8AE4',
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    btnLogin:{
        backgroundColor: 'white',
        width : 150,
        padding: 10,
        margin : 5,
        borderRadius: 8,
        alignItems: "center",
    },

    checkbox: {
        alignSelf: 'center',
        marginLeft: 20,
    },
    label: {
        margin: 5,
        alignSelf: 'center',
    },
    btnContainer: {
      flexDirection: 'row',
      marginTop : 10,
    },
    inputContainer: {
      flexDirection: 'row',
    },

    btnSend:{
        backgroundColor: '#CCCCCC',
        width: '25%',
        marginLeft : '2%',
        height: 48,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    TextStyle:{
        marginVertical: 13,
        marginHorizontal: 23,
        fontSize: 13,
        color: '#FFFFFF',
        fontWeight: '300',
        alignSelf: 'flex-start',
        marginLeft : '9%',
        marginTop : 0,
        marginBottom : '1%',
    }
})

//export default JoinScreen;