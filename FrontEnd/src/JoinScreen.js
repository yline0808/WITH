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

export default function LoginScreen({ navigation, route }: any) {
//const JoinScreen = () => {
    const childRef = useRef();
    //console.log( "route.params : "+ route.params);
    let zonecode = '';
    let addressMain = '';
    let defaultAddress = '';
    let showCodeChange = '';
    let errorYN = '';
    let verificationCodeYN = true;
    if(route.params !== undefined) {
        zonecode = route.params.zonecode;
        addressMain = route.params.address;
        defaultAddress = route.params.defaultAddress;
        errorYN = route.params.errorYN;
        route.params.errorYN = '';
        verificationCodeYN = route.params.verificationCodeYN;
        console.log(verificationCodeYN);
    }
    /*
    if(route.ErrorData !== undefined){
        showCodeChange = route.ErrorData.Error;
        console.log("error" + showCodeChange);
    }*/

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [pwChk, setPwChk] = useState("");
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    //const [addressMain, setAddressMain] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [showCode, setShowCode] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [minutes, setMinutes] = useState(3)
    const [seconds, setSeconds] = useState(0);
    const [sendMailYN, setSendMailYN] = useState(true);
    //const [zonecode, setZoneCode] = useState("");

    const setEmailData = (val) => setEmail(val);
    const setPwData = (val) => setPw(val);
    const setPwChkData = (val) => setPwChk(val);
    const setNameData = (val) => setName(val);
    const setPhoneNoData = (val) => setPhoneNo(val);
    const setAddressData = (val) => setAddress(val);
    const setBirthDateData = (val) => setBirthDate(val);
    const setZoneCodeData = (val) => setZoneCode(val);
    const setAddressDetailData = (val) => setAddressDetail(val);
    const setShowCodeData = (val) => setShowCode(val);
    const setVerificationCodeData = (val) => setVerificationCode(val);

    if(errorYN == 'N'){
        Alert.alert("성공!!");
        setShowCodeData(true);
        setMinutes(3);
        setSeconds(0);
        setSendMailYNData(false);
        errorYN = '';
    }else if(errorYN == 'Y'){
        Alert.alert('오류!!');
        errorYN = '';
    }

    if(!verificationCodeYN){
        setShowCodeData(false); //시간 안가게 하는 용도
        setSendMailYN(false); //이메일 창 잠그는 용도
    }

    useEffect(() =>{
        const interval = setInterval(() => {
            if(showCode){
                if(minutes >= 0 && seconds >= 0) setSeconds(prevSeconds => prevSeconds-1);
                if(seconds === 0){
                    if(minutes === 0  && seconds === 0){
                        setShowCodeData(false);
                        setSendMailYN(true);
                        Alert.alert('시간이 초과되었습니다.\n재전송 하시기 바랍니다.');
                    }else{
                        setMinutes((prevMinutes) => prevMinutes - 1);
                        setSeconds(59);
                    }
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [seconds,showCode]);

    const SendEmail = () => {

        if(!sendMailYN){
            Alert.alert((minutes != 0 ? minutes + '분 ' : '') + seconds.toString().padStart(2,'0') + '초 후에 다시 요청할 수 있습니다.');
            return;
        }

        if (email === '' || email === null) {
            Alert.alert('이메일이 입력되지 않았습니다.');
        } else {

            AsyncStorage.setItem('VerificationCodeSend', JSON.stringify({
              email: email,
            }));

            childRef.current.VerificationCodeSend();

            //setShowCode(true);
            //setMinutes(3);
            //setSeconds(0);
            //setSendMailYN(false);
            //navigation.navigate('SendAll');
        }
        return;
    }

    const join = () => {
        //console.log(email);
        //console.log(pw);

        //인증번호 확인 체크 추가 필요
        if (email === '' || email === null) {
            Alert.alert('이메일이 입력되지 않았습니다.');
        } else if (verificationCodeYN) {
            Alert.alert('인증번호 전송 후 확인이 필요합니다.');
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
        } else if (addressMain === '' || addressMain === null) {
            console.log(addressMain);
            Alert.alert('주소가 입력되지 않았습니다.');
        }  else if (addressDetail === '' || addressDetail === null) {
            Alert.alert('상세주소가 입력되지 않았습니다.');
        } /*else if (zonecode === '' || zonecode === null) {
            Alert.alert('우편번호가 입력되지 않았습니다.');
        } */else if (birthDate === '' || birthDate === null) {
            Alert.alert('생년월일이 입력되지 않았습니다.');
        }/* else if ( defaultAddress === '' || defaultAddress === null) {
            Alert.alert('주소가 입력되지 않았습니다.');
        }*/ else {
            AsyncStorage.setItem('Join', JSON.stringify({
              email: email,
              pw: pw,
              name: name,
              phoneNo : phoneNo,
              addressMain : addressMain,
              addressDetail : addressDetail,
              zonecode : zonecode,
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

    const CheckCode = () => {
        //console.log(email);

        //인증번호 확인 체크 추가 필요
        if (email === '' || email === null) {
            Alert.alert('이메일이 입력되지 않았습니다.');
        } else if (verificationCode === '' || verificationCode === null) {
            Alert.alert('인증번호가 입력되지 않았습니다.');
        } else {

            AsyncStorage.setItem('VerificationCodeCheck', JSON.stringify({
              email: email,
              verificationCode : verificationCode,
            }));

            /*
            SendAll.setProps = {
                "email" : email,
                "pw" : pw,
            };
            */

            childRef.current.VerificationCodeCheckSend();
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
                    style={styles.ShortInput}
                    placeholder={'Email'}
                    onChangeText={setEmailData}
                    editable={sendMailYN}
                    selectTextOnFocus={sendMailYN}
                />
                <TouchableOpacity style={styles.btnSend} onPress={SendEmail} >
                    <Text style={styles.loginFont}>Send Code</Text>
                </TouchableOpacity>
            </View>
            {showCode && <View style={styles.inputContainer}>
                <TextInput
                    style={styles.DoubleShortInput}
                    placeholder={'Verification Code'}
                    onChangeText={setVerificationCodeData}
                    editable={verificationCodeYN}
                />
                <View style={styles.timerView}>
                    <Text style={styles.timer}>{minutes.toString().padStart(2,'0')}:{seconds.toString().padStart(2,'0')}</Text>
                </View>
                <TouchableOpacity style={styles.btnSend} onPress={CheckCode}>
                    <Text style={styles.loginFont}>Check Code</Text>
                </TouchableOpacity>
            </View>}
            <Text style={styles.TextStyle}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder={'Password'}
                secureTextEntry={true}
                onChangeText={setPwData}
            />
            <Text style={styles.TextStyle}>Confirm Password</Text>
            <TextInput
                style={styles.input}
                placeholder={'Confirm Password'}
                secureTextEntry={true}
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
            <View style={styles.inputContainer}>
                {false && <TextInput
                    style={styles.ShortInput}
                    placeholder={'ZoneCode'}
                    onChangeText={setZoneCodeData}
                    value={zonecode}
                />}
            </View>
            <Text style={styles.TextStyle}>Address</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.ShortInput}
                    placeholder={'Address'}
                    //onChangeText={setAddressData}
                    editable={false}
                    value={addressMain}
                />
                <TouchableOpacity style={styles.btnSend} onPress={() => navigation.navigate("FindAddress")}>
                    <Text style={styles.loginFont}>Postal Code</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder={'Address Detail'}
                    onChangeText={setAddressDetailData}
                    value={addressDetail}
                />
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

//export default JoinScreen;