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
    Pressable,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';
import SendAll from "./SendAll";
import {launchImageLibrary} from 'react-native-image-picker';

export default function ContractSendScreen({ navigation, route }: any) {
    const childRef = useRef();
    const [responseFile, setResponseFile] = useState([]);
    const [imageFile, setImageFile] = useState([]);

    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [contents, setContents] = useState("");

    const setToData = (val) => setTo(val);
    const setSubjectData = (val) => setSubject(val);
    const setContentsData = (val) => setContents(val);

    let contractId = '';
    if(route.params !== undefined) {
        if(route.params.contractId !== undefined){
            contractId = route.params.contractId;
        }
    }
    //첫페이지 호출시 실행 안되게
    useEffect(() =>{
       AsyncStorage.setItem('FileSend', JSON.stringify({
          imageFile : imageFile,
          contractId : contractId,
        }));

        childRef.current.FileSend();

        contractId = '';
    }, [contractId]);

    const send = () => {

        if (to === '' || to === null) {
            Alert.alert('받는사람이 입력되지 않았습니다.');
        } else if (subject === '' || subject === null) {
            Alert.alert('제목이 입력되지 않았습니다.');
        } else {
            AsyncStorage.setItem('ContractSend', JSON.stringify({
              to : to,
              subject : subject,
              contents : contents,
            }));

            childRef.current.ContractSend();
        }
        return;
    };

    const onSelectImage = () => {

        launchImageLibrary(
            {
                mediaType : 'photo',
                maxWidth : 512,
                maxHeight : 512,
                includeBase64 : true
            },
            (response) => {
                //console.log(response);

                if(response.didCancel){
                    console.log("Image Error : " + response.errorCode);
                }else{
                    setResponseFile([...responseFile,response]);
                    setImageFile([response.assets[0].base64,...imageFile]);
                }
            }
        )
    }

    const onRemoveImage = (uri) => {
        setResponseFile(responseFile.filter(responseFile => responseFile.assets[0] !== uri));
        setImageFile(imageFile.filter(imageFile => imageFile != uri.base64));
    }

    return (
        <View style={styles.main}>
            <SendAll ref={childRef}></SendAll>
            <Text style={styles.TextStyle}>To</Text>
            <TextInput
                style={styles.input}
                placeholder={'To'}
                onChangeText={setToData}
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
            <View style={{
                    flexDirection:'row',
                    marginLeft : '40%' ,
                    marginRight : '8%' ,
                    marginBottom : '3%' ,
                    alignSelf : 'center' ,
                    justifyContent : 'center',
                }}>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btnLogin} onPress={()=>onSelectImage()}>
                        <Text style={styles.loginFont}>이미지 추가</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btnLogin} onPress={send}>
                        <Text style={styles.loginFont}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
            responseFile.map(responseFile =>(
                <View style={styles.imageArea}>
                    <Image
                        style={{
                            width : '40%',
                            height : 70,
                            borderWidth : 1,
                        }}
                        resizeMode="contain"
                        source={responseFile ? {uri : responseFile.assets[0].uri} : 0}
                        key={responseFile.index}
                    />
                    <TouchableOpacity onPress={()=>onRemoveImage( responseFile.assets[0] )} style={styles.removeImage}>
                        <Text style={{fontSize:12}}>이미지 삭제</Text>
                    </TouchableOpacity>
                </View>
            ))}
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

    imageArea : {
        alignSelf: 'center',
        justifyContent: "center",
        width : '80%',
        height : '10%',
        //flex : 1,
        flexDirection : 'row',
    },

    removeImage:{
        backgroundColor: 'white',
        width : '30%',
        height : '27%',
        margin : '6%',
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },

    BtnAll : {
        alignSelf: 'center',
        justifyContent: "center",
        width : '80%',
        height : '10%',
        flex : 1,
        flexDirection : 'row',
    },
})

//export default LoginScreen;