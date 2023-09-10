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

export default function LoginScreen({ navigation }: any) {
//const LoginScreen = () => {
    const childRef = useRef();

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [isSelected, setSelection] = useState(false);

    const setEmailData = (val) => setEmail(val);
    const setPwData = (val) => setPw(val);

    const login = () => {

        //console.log(email);
        //console.log(pw);

        if (email === '' || email === null) {
            Alert.alert('이메일이 입력되지 않았습니다.');
        } else if (pw === '' || pw === null) {
            Alert.alert('비밀번호가 입력되지 않았습니다.');
        } else {

            AsyncStorage.setItem('Login', JSON.stringify({
              email: email,
              pw: pw,
            }));

            /*
            SendAll.setProps = {
                "email" : email,
                "pw" : pw,
            };
            */

            childRef.current.LoginSend();
            ///navigation.navigate('SendAll');
        }
        return;
    }

    const rememberId = (val) => {

        setSelection(val);

        if(!isSelected){
            if('' == email || undefined === email){
                alert("Input Email");
                setSelection(false);
                return;
            }
            setSelection(true);

            AsyncStorage.setItem('rememberId',JSON.stringify({'email': email, 'rememberYN': true}), () => {
              console.log('Save Email');
            });
        }else{
            setSelection(false);

            AsyncStorage.setItem('rememberId',JSON.stringify({'email': '', 'rememberYN': false}), () => {
                console.log('UnSave Email');
            });
        }
    }

    const loadRememberId = async () => AsyncStorage.getItem('rememberId', (err, result) => {
        if(result){
            const UserInfo = JSON.parse(result);
            setEmail(UserInfo.email);
            setSelection(UserInfo.rememberYN);
        }
    });

    useEffect(() => {
        loadRememberId();
    }, []);

    return (
        <View style={styles.main}>
            <SendAll ref={childRef}></SendAll>
            <Image
                source={require('../images/folded-ribbon.png')}
                style={styles.mainImage}
            />
            <TextInput
                style={styles.input}
                placeholder={'Email'}
                onChangeText={setEmailData}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder={'Password'}
                secureTextEntry={true}
                onChangeText={setPwData}
            />
            <View style={styles.checkboxContainer}>
                <CheckBox
                  value={isSelected}
                  onValueChange={rememberId}
                  style={styles.checkbox}
                />
                <Text style={styles.label}>Remember me?</Text>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Find")}>
                    <Text style={styles.btnText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.checkboxContainer}>
                <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate("Join")}>
                    <Text style={styles.loginFont}>Join</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnLogin} onPress={login}>
                    <Text style={styles.loginFont}>Login</Text>
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
        marginBottom: 18,
        alignSelf: 'center',
    },

    main: {
        backgroundColor : '#AB8AE4',
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    btn:{
        width : 200,
        padding: 16,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent : "space-between",
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
        marginLeft: 25,
    },
    label: {
        margin: 3,
        alignSelf: 'center',
    },
    checkboxContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },

    loginFont : {
        fontSize : 16,
    },
    mainImage : {
        width : 100,
        height : 100,
        marginBottom : 50
    },
    btnText : {
        marginLeft : 25
    },
})

//export default LoginScreen;