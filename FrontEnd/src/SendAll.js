import React,{ useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import {
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SendAll = forwardRef((props, ref)=> {

    const navigation = useNavigation();

    useImperativeHandle(ref, () => ({
        async LoginSend() {

            let LoginData = JSON.parse(await AsyncStorage.getItem("Login"));
            console.log(LoginData);

            let url = "http://yline.iptime.org:18080/api/v1/auth/authenticate";
            let method = "POST";
            let headers = {
                //Authorization : "",
            };
            let data = {
                email : LoginData.email,
                password : LoginData.pw,
            };

            axiosSend(url,method,headers,data,'Login');
        },

        async JoinSend() {
            let JoinData = JSON.parse(await AsyncStorage.getItem("Join"));
            console.log(JoinData);

            let url = "http://yline.iptime.org:18080/api/v1/auth/register";
            let method = "POST";
            let headers = {
                //Authorization : "",
            };
            let data = {
                email : JoinData.email,
                password : JoinData.pw,
                name : JoinData.name,
                phone : JoinData.phoneNo,
                addressMain : JoinData.addressMain,
                addressDetail : JoinData.addressDetail,
                zoneCode : JoinData.zonecode,
                birthDate : JoinData.birthDate,
            };

            axiosSend(url,method,headers,data,'Join');
        },

        async VerificationCodeSend() {

            let VerificationCodeSendData = JSON.parse(await AsyncStorage.getItem("VerificationCodeSend"));
            console.log(VerificationCodeSendData);

            let url = "http://yline.iptime.org:18080/api/v1/authInfo/sendAuthCode";
            let method = "POST";
            let headers = {
                //Authorization : "",
            };
            let data = {
                email : VerificationCodeSendData.email,
            };

            axiosSend(url,method,headers,data,'VerificationCodeSend');
        },

        async VerificationCodeCheckSend() {

            let VerificationCodeCheckData = JSON.parse(await AsyncStorage.getItem("VerificationCodeCheck"));
            console.log(VerificationCodeCheckData);

            let url = "http://yline.iptime.org:18080/api/v1/authInfo/isValid";
            let method = "POST";
            let headers = {
                //Authorization : "",
            };
            let data = {
                email : VerificationCodeCheckData.email,
                code : VerificationCodeCheckData.verificationCode,
            };

            axiosSend(url,method,headers,data,'VerificationCodeCheck');
        },

        async FindSend(){

            let FindData = JSON.parse(await AsyncStorage.getItem("Find"));
            console.log(FindData);

            let url = "http://yline.iptime.org:18080/api/v1/account/sendPwd";
            let method = "POST";
            let headers = {
                //Authorization : "",
            };
            let data = {
                email : FindData.email,
                //name : FindData.name,
                //phone : FindData.phoneNo,
                //birthDate : FindData.birthDate,
            };

            axiosSend(url,method,headers,data,'Find');
        },

        async SendContractSend() {

            let SendContractSendData = JSON.parse(await AsyncStorage.getItem("SendContract"));
            console.log(SendContractSendData);

            let url = "";
            let method = "POST";
            let headers = {
                Authorization : AsyncStorage.getItem('Token'),
            };
            let data = {
                to : SendContractSendData.to,
                from : SendContractSendData.from,
                subject : SendContractSendData.subject,
                contents : SendContractSendData.contents,
            };

            axiosSend(url,method,headers,data,'SendContract');
        },
    }));

    const axiosSend = (url,method,headers,data,func) => {

        console.log(url);
        console.log(method);
        console.log(headers);
        console.log(data);

        axios({
            url : url,
            method : method,
            headers : headers,
            data : data,
        }).then(function (response) {
            Alert.alert("통신 성공");
            console.log(response);

            switch(func){
            case 'Login' :
                //const obj = JSON.parse(response.data);
                const token = response.data.token;

                AsyncStorage.setItem('Token', token);
                AsyncStorage.setItem('UserId', data.email);

                console.log(token);
                console.log(data.email + "로그인");

                navigation.navigate("SendContract");
                /*
                AsyncStorage.getItem('Token', (err, result) => {
                    console.log(result);
                });
                */
            break;

            case 'Join' :
                Alert.alert('회원가입 완료되었습니다.');
                navigation.navigate("Login");
            break;

            case 'Find' :
                Alert.alert('입력하신 이메일로 새로운 비밀번호를 전송하였습니다.');
                navigation.navigate("Login");
            break;

            case 'VerificationCodeSend' :
                Alert.alert('입력하신 이메일로 인증번호를 전송하였습니다.');
                navigation.navigate("Join",{errorYN : 'N'});
            break;

            case 'VerificationCodeCheck' :
                Alert.alert('인증 성공하였습니다.');
                navigation.navigate("Join",{verificationCodeYN : false});
            break;

            case 'SendContract' :
                Alert.alert('전송하였습니다.');
                //navigation.navigate("Join",{verificationCodeYN : false});
            break;
            }
        })
        .catch(function (error) {
            Alert.alert("통신 오류");
            console.log(error);

            switch(func){
            case 'Login' :
                Alert.alert("로그인 오류");
            break;

            case 'Join' :
                Alert.alert("회원가입 오류");
            break;

            case 'Find' :
                Alert.alert("비밀번호 찾기 오류");
            break;

            case 'VerificationCodeSend' :
                Alert.alert("인증번호 송신 오류");
                navigation.navigate("Join",{errorYN : 'Y'});
            break;

            case 'VerificationCodeCheck' :
                Alert.alert("인증번호 확인 오류");
            break;

            case 'VerificationCodeCheck' :
                Alert.alert("전송 실패");
            break;
            }
        });
    };
});

export default SendAll;