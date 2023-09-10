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
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';
import SendAll from "./SendAll";

export default function SendContractScreen({ navigation }: any) {
    const childRef = useRef();

    let UserId = AsyncStorage.getItem('UserId');

    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [from, setFrom] = useState("");
    const [contents, setContents] = useState("");

    const setToData = (val) => setTo(val);
    const setSubjectData = (val) => setSubject(val);
    const setFromData = (val) => setFrom(val);
    const setContentsData = (val) => setContents(val);

    if(UserId !== undefined && UserId != ''){
        setFromData(UserId);
    }

    const send = () => {

        if (to === '' || to === null) {
            Alert.alert('받는사람이 입력되지 않았습니다.');
        } else if (subject === '' || subject === null) {
            Alert.alert('제목이 입력되지 않았습니다.');
        } else {
            AsyncStorage.setItem('SendContract', JSON.stringify({
              to : to,
              from : from,
              subject : subject,
              content : content,
            }));

            childRef.current.SendContractSend();
        }
        return;
    };

    return (
        <View style={styles.main}>
            <Text style={styles.TextStyle}>To</Text>
            <TextInput
                style={styles.input}
                placeholder={'To'}
                onChangeText={setToData}
            />
            <Text style={styles.TextStyle}>From</Text>
            <TextInput
                style={styles.input}
                placeholder={'From'}
                onChangeText={setFromData}
                editable={false}
            />
            <Text style={styles.TextStyle}>Subject</Text>
            <TextInput
                style={styles.input}
                placeholder={'Subject'}
                onChangeText={setSubjectData}
            />
            <Text style={styles.TextStyle}>Contents</Text>
            <TextInput
                style={styles.inputContents}
                placeholder={'Please enter the contents'}
                onChangeText={setContentsData}
                multiline={true}
                textAlignVertical="top"
            />
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnLogin} onPress={send}>
                    <Text style={styles.loginFont}>Send</Text>
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

  inputContents: {
        backgroundColor: '#FFFFFF',
        width: '83%',
        height: 200,
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

    DoubleShortInput: {
        backgroundColor: '#FFFFFF',
        width: '36%',
        height: 48,
        paddingLeft: 15,
        borderRadius: 5,
        marginBottom: 12,
        alignSelf: 'center',
    },

    main: {
        backgroundColor : '#AB8AE4',
        flex : 1,
        justifyContent: 'center',
    },

    btnLogin:{
        backgroundColor: 'white',
        width : 100,
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
      alignItems:'flex-end',
      marginTop : 10,
      marginRight : 30,
    },
    inputContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
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
    },

    timerView:{
        backgroundColor: '#FFFFFF',
        width: '18%',
        height: 48,
        borderRadius: 5,
        marginBottom: 12,
        alignSelf: 'center',
        marginLeft : 5,
        justifyContent: "center"
    },

    timer: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign:'center',
        alignItems:'center',
    },
})

//export default LoginScreen;