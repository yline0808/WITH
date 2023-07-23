import React,{ useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import {
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const SendAll = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        async LoginSend() {

            let LoginData = JSON.parse(await AsyncStorage.getItem("Login"));
            console.log(LoginData);

            let url = "http://yline.ddns.net:8080/api/v1/auth/authenticate";
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

            let url = "http://yline.ddns.net:8080/api/v1/auth/register";
            let method = "POST";
            let headers = {
                //Authorization : "",
            };
            let data = {
                email : JoinData.email,
                password : JoinData.pw,
                name : JoinData.name,
                phone : JoinData.phoneNo,
                address : JoinData.address,
                birthDate : JoinData.birthDate,
            };

            axiosSend(url,method,headers,data,'Join');
        },

        async VerificationCodeSend() {

            let VerificationCodeSendData = JSON.parse(await AsyncStorage.getItem("VerificationCodeSend"));
            console.log(VerificationCodeSendData);

            let url = "";
            let method = "";
            let headers = {
                Authorization : "",
            };
            let data = {
                email : VerificationCodeSendData.email,
            };

            axiosSend(url,method,headers,data,'VerificationCodeSend');
        },

        async FindSend(){

            let FindData = JSON.parse(await AsyncStorage.getItem("Find"));
            console.log(FindData);

            let url = "http://yline.ddns.net:8080/api/v1/auth/register";
            let method = "POST";
            let headers = {
                //Authorization : "",
            };
            let data = {
                email : FindData.email,
                name : FindData.name,
                phone : FindData.phoneNo,
            };

            axiosSend(url,method,headers,data,'Find');
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

            const obj = JSON.parse(response);

            AsyncStorage.setItem('Token', obj.token);

            AsyncStorage.getItem('Token', (err, result) => {
                console.log(result);
            });

            switch(func){
            case 'Login' :

            break;

            case 'Join' :
                navigation.navigate("Login");
            break;

            case 'Find' :
                navigation.navigate("Login");
            break;
            }
        })
        .catch(function (error) {
            Alert.alert("통신 오류");
            console.log(error);
        });
    };
});

export default SendAll;