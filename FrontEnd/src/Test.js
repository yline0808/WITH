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
import Postcode from '@actbase/react-daum-postcode';
//--legacy-peer-deps

const Test = () => {
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

        getAddressData=(data)=>{
            let defaultAddress='';

            if(data.buildingName==='')
            {
                defaultAddress='';
            }
            else if(data.buildingName==='N')
            {
                defaultAddress="("+data.apartment+")";
            }
            else{
                defaultAddress="("+data.buildingName+")";
            }
            this.props.navigation.navigate('Drawers',{screen:'Deliver', params:{zonecode:data.zonecode, address:data.address, defaultAddress:defaultAddress}});

        }

    return (
            <Postcode
                style={{ width: '100%', height: '100%' }}
                jsOptions={{ animation: true }}
                onSelected={(data)=>this.getAddressData(data)}
            />
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

export default Test;