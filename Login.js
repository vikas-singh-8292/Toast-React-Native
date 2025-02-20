/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';


const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [securetextEntry, setSecureTextEntry] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        const checkLoginStatus = async () => {
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            if (isLoggedIn === 'true') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
                });
            }
        };
        checkLoginStatus();
    }, []);
    const validateInputs = () => {
        let isValid = true;
        if (!email) {
            setEmailError('*Email is required.');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('*Invalid email format.');
            isValid = false;
        }
        if (!password) {
            setPasswordError('*Password is required.');
            isValid = false;
        }

        return isValid;
    };

    const getdata = async () => {
        if (!validateInputs()) return;
        setLoading(true);

        try {
            const response = await fetch('https://crm.linkvision.in/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    admin_email: email,
                    admin_password: password,
                }),
            });
            const result = await response.json();
            console.log(result);
            if (result.code === 200) {
                await AsyncStorage.setItem('admin_id', result.payload[0].admin_id);
                await AsyncStorage.setItem('isLoggedIn', 'true');

                Toast.show({
                    type: 'success',
                    text1: 'Login Succesfully!',
                    text2: 'Welcome Back!',
                    text1Style:{color:'green'},
                    visibilityTime: 1000,
                    autoHide: true,
                    position: 'top',
                })
                setTimeout(() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    });
                },[1000])
            } else {
                if (result.message === "Invalid Email") {
                    setLoginError('Invalid Email. Please check your email address.');
                } else if (result.message === "Invalid Password") {
                    setLoginError('Incorrect Password. Please try again.');
                } else {
                    setLoginError('An error occurred during login. Please try again.');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginError('An error occurred during login. Please try again.');
        } finally {
            setLoading(false)
        }
    };
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setEmail('');
        setPassword('');
        setEmailError('');
        setPasswordError('');
        setLoginError('');
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#fff' }}>

                <View
                    style={{
                        width: '90%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        marginBottom: '10%',
                    }}
                >
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000' }}>LOGIN</Text>
                    <View style={{ width: '100%', marginTop: '20%' }}>

                        <View
                            style={{
                                borderWidth: 1,
                                marginBottom: 5,
                                marginTop: 10,
                                height: 50,
                                borderColor: 'grey',
                                borderRadius: 10,
                                flexDirection: 'row',
                            }}
                        >
                            <TextInput
                                placeholder="Enter your Email"
                                placeholderTextColor={'grey'}
                                style={{
                                    width: '90%',
                                    height: '100%',
                                    fontSize: 15,
                                    fontFamily: 'InterMedium',
                                    color: '#000',
                                }}
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    if (!text) {
                                        setEmailError('*Email is required.');
                                    } else {
                                        setEmailError('');
                                    }
                                }}
                            />
                            <Image source={require('../assets/Email.png')} style={{ width: 22, height: 22, marginTop: 15 }} />
                        </View>
                        {emailError ? <Text style={{ fontSize: 12, color: 'red', marginBottom: 10 }}>{emailError}</Text> : null}
                        <View
                            style={{
                                borderWidth: 1,
                                marginBottom: 5,
                                marginTop: 10,
                                height: 50,
                                borderColor: 'grey',
                                borderRadius: 10,
                                flexDirection: 'row',
                            }}
                        >
                            <TextInput
                                secureTextEntry={securetextEntry}
                                placeholder="Enter your Password"
                                placeholderTextColor={'grey'}
                                style={{
                                    width: '90%',
                                    height: '100%',
                                    fontSize: 15,
                                    fontFamily: 'InterMedium',
                                    color: '#000',
                                }}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (!text) {
                                        setPasswordError('*Password is required.');
                                    } else {
                                        setPasswordError('');
                                    }
                                }}
                            />
                            {securetextEntry ? (
                                <TouchableOpacity onPress={() => setSecureTextEntry(false)}>
                                    <Image source={require('../assets/hide.png')} style={{ width: 22, height: 22, marginTop: 17 }} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => setSecureTextEntry(true)}>
                                    <Image source={require('../assets/visible.png')} style={{ width: 22, height: 22, marginTop: 17 }} />
                                </TouchableOpacity>
                            )}
                        </View>
                        {passwordError ? <Text style={{ fontSize: 12, color: 'red', marginBottom: 10 }}>{passwordError}</Text> : null}
                        {loginError ? <Text style={{ fontSize: 12, color: 'red', marginBottom: 10, textAlign: 'center' }}>{loginError}</Text> : null}
                        <TouchableOpacity
                            onPress={getdata}
                            disabled={!email || !password}
                            style={{
                                borderRadius: 10,
                                marginTop: 10,
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: (!email || !password) ? 'grey' : '#0E469F',
                                elevation: 5,
                            }}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#fff' }}>LOGIN</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 5, alignItems: 'flex-end', justifyContent: 'flex-end' }} onPress={() => navigation.navigate('Register')}>
                            <Text style={{ color: '#000' }} >Register here..?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Toast/>
        </ScrollView>
    );
};

export default Login;