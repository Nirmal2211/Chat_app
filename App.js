import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login';
import ChatRoom from './Screens/Chatroom';
import register from './Screens/Register';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login' >
        <Stack.Screen name='login' component={Login} options={{headerShown:false}} />
        <Stack.Screen name='ragister' component={register} />
        <Stack.Screen name='chat' component={ChatRoom} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#123',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt:{
    color:"white",
    fontWeight:"900"
  }
});
