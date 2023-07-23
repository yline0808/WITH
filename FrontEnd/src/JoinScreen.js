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
    ScrollView,
    TurboModuleRegistry,
} from 'react-native';
import Mailer from "react-native-smtp-mailer";
import AsyncStorage from '@react-native-community/async-storage';
import SendAll from "./SendAll";
//import Postcode from "@actbase/react-daum-postcode";

export default function LoginScreen({ navigation }: any) {
//const JoinScreen = () => {
    const childRef = useRef();

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [pwChk, setPwChk] = useState("");
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const setEmailData = (val) => setEmail(val);
    const setPwData = (val) => setPw(val);
    const setPwChkData = (val) => setPwChk(val);
    const setNameData = (val) => setName(val);
    const setPhoneNoData = (val) => setPhoneNo(val);
    const setAddressData = (val) => setAddress(val);
    const setBirthDateData = (val) => setBirthDate(val);

    const FindPostal = async() => {

    };

    const SendEmail = () => {
        /*
        reactNative 메일발송
        Mailer.sendMail({
            mailhost: "smtp.gmail.com",
            port: "465",
            ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
            username: "cowithus74@gmail.com",
            password: "withus1995!@",
            fromName: "WITH", // optional
            replyTo: "cowithus74@gmail.com", // optional
            recipients: "wake4545@gmail.com",
            bcc: [], // optional
            subject: "Code",
            htmlBody: "<h1>Verification Code</h1><p>[111111]</p>",
            attachmentPaths: [], // optional
            attachmentNames: [],
        });
        */

        if (email === '' || email === null) {
            Alert.alert('이메일이 입력되지 않았습니다.');
        } else {

            AsyncStorage.setItem('VerificationCodeSend', JSON.stringify({
              email: email,
            }));

            /*
            SendAll.setProps = {
                "email" : email,
                "pw" : pw,
            };
            */

            childRef.current.VerificationCodeSend();
            ///navigation.navigate('SendAll');
        }
        return;
    }

    const join = () => {
        //console.log(email);
        //console.log(pw);

        //인증번호 확인 체크 추가 필요
        if (email === '' || email === null) {
            Alert.alert('이메일이 입력되지 않았습니다.');
        } else if (pw === '' || pw === null) {
            Alert.alert('비밀번호가 입력되지 않았습니다.');
        } else if (pwChk === '' || pwChk === null) {
            Alert.alert('비밀번호 확인이 입력되지 않았습니다.');
        } else if (pw != pwChk){
            console.log(pw);
            console.log(pwChk);
            Alert.alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        } else if (name === '' || name === null) {
            Alert.alert('이름이 입력되지 않았습니다.');
        } else if (phoneNo === '' || phoneNo === null) {
            Alert.alert('전화번호가 입력되지 않았습니다.');
        } else if (Address === '' || Address === null) {
            Alert.alert('주소가 입력되지 않았습니다.');
        } else if (birthDate === '' || birthDate === null) {
            Alert.alert('생년월일이 입력되지 않았습니다.');
        } else {

            AsyncStorage.setItem('Join', JSON.stringify({
              email: email,
              pw: pw,
              name: name,
              phoneNo : phoneNo,
              address : Address,
              birthDate : birthDate,
            }));

            /*
            SendAll.setProps = {
                "email" : email,
                "pw" : pw,
            };
            */

            childRef.current.JoinSend();
            ///navigation.navigate('SendAll');

            //후처리
            //200번째만 성공
        }
        return;
     }

    return (
        <View style={styles.main}>
            <ScrollView>
            <SendAll ref={childRef}></SendAll>
            <Text style={styles.TextStyle}>Email</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputEmail}
                    placeholder={'Email'}
                    onChangeText={setEmailData}
                />
                <TouchableOpacity style={styles.btnSend} onPress={SendEmail}>
                    <Text style={styles.loginFont}>Send Code</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.TextStyle}>Verification Code</Text>
            <TextInput
                style={styles.input}
                placeholder={'Verification Code'}
                onChangeText={setPwData}
            />
            <Text style={styles.TextStyle}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder={'Password'}
                onChangeText={setPwData}
            />
            <Text style={styles.TextStyle}>Confirm Password</Text>
            <TextInput
                style={styles.input}
                placeholder={'Confirm Password'}
                onChangeText={setPwChkData}
            />
            <Text style={styles.TextStyle}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder={'Name'}
                onChangeText={setNameData}
            />
            <Text style={styles.TextStyle}>Birth date</Text>
            <TextInput
                style={styles.input}
                placeholder={'Birth date'}
                onChangeText={setBirthDateData}
            />
            <Text style={styles.TextStyle}>Phone Number</Text>
            <TextInput
                style={styles.input}
                placeholder={'Phone No'}
                onChangeText={setPhoneNoData}
            />
            <Text style={styles.TextStyle}>Address</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputEmail}
                    placeholder={'Address'}
                    onChangeText={setAddressData}
                />
                <TouchableOpacity style={styles.btnSend} onPress={FindPostal}>
                    <Text style={styles.loginFont}>Postal Code</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.loginFont}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnLogin} onPress={join}>
                    <Text style={styles.loginFont}>Join</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
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

    inputEmail: {
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
    }
})

//export default JoinScreen;