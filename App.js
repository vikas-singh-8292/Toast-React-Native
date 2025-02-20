/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigater from './Component/DrawerNavigator';
import React, { useEffect, useState } from 'react'
import { View, Text, useWindowDimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Stack = createNativeStackNavigator();
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedIn === 'true');
      } catch (error) {
        console.error('Error checking login status', error);
        setIsLoggedIn(false); // Default to false if there is an error
      }
    };

    checkLoginStatus();
  }, []);

  // Show a loading screen while checking login status
  if (isLoggedIn === null) {
    return null; // You can return a loading screen here if needed
  }
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Home" :"Login"}>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>

  )
}
enableScreens();

export default App;

