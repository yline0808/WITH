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

export default function FindAddress({ navigation }: any) {

    getAddressData = (data) => {

        console.log(data);
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

        const params = {
            zonecode:data.zonecode,
            address:data.address,
            defaultAddress:defaultAddress
        };

        navigation.navigate('Join', params);

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

//export default FindAddress;