import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import JoinScreen from '../src/JoinScreen';
import LoginScreen from '../src/LoginScreen';
import SendAll from '../src/SendAll';
import FindScreen from '../src/FindScreen';
import test from '../src/Test';
import FindAddress from '../src/FindAddress';
import SendContractScreen from '../src/SendContractScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="FindAddress" component={FindAddress} />
        <Stack.Screen name="Join" component={JoinScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SendAll" component={SendAll} />
        <Stack.Screen name="Find" component={FindScreen} />
        <Stack.Screen name="SendContract" component={SendContractScreen} />
        <Stack.Screen name="test" component={test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
