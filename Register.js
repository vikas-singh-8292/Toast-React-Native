/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, ScrollView, RefreshControl } from 'react-native'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const navigation = useNavigation();
    const [loader, setLoader] = useState(false);
    const [refreshing, setRefreshing] = useState();

    useEffect(() => {
        const checkRegisterStatus = async () => {
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            if (isLoggedIn === 'true') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            }
        };
        checkRegisterStatus();
    }, []);

    const register = async () => {

        const url = 'https://crm.linkvision.in/customer_insert.php';

        try {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Contant-Type': 'application/json'
                },
                body: JSON.stringify({
                    customer_name: name,
                    customer_email: email,
                    customer_contact: contact
                })
            })

            const result = await response.json();
            console.log(result);

            if (result.code === 200) {
                await AsyncStorage.setItem('id', result.payload[0].id);
                await AsyncStorage.setItem('isLoggedIn', 'true')
            }

            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }]
            })
        } catch (error) {
            console.log("Api Error");
        }

    }
    const onRefresh =useCallback(()=>{
        setRefreshing(true);
        setName('');
        setEmail('');
        setContact('');
    })

    return (
        
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '90%' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 50 }}>Register</Text>

                    <View style={{ width: '100%', borderRadius: 10, borderWidth: 1, height: 50, justifyContent: 'center', marginBottom: 20 }}>
                        <TextInput placeholder='Enter Your Name' style={{ width: '100%', fontSize: 16 }}
                            value={name}
                            onChange={(text) => {
                                setName(text)
                            }} />
                    </View>
                    <View style={{ width: '100%', borderRadius: 10, borderWidth: 1, height: 50, justifyContent: 'center', marginBottom: 20 }}>
                        <TextInput placeholder='Email' style={{ width: '100%', fontSize: 16 }}
                            value={email}
                            onChange={(text) => {
                                setEmail(text)
                            }}
                        />
                    </View>
                    <View style={{ width: '100%', borderRadius: 10, borderWidth: 1, height: 50, justifyContent: 'center', marginBottom: 20 }}>
                        <TextInput placeholder='Contact' style={{ width: '100%', fontSize: 16 }}
                            value={contact}
                            onChange={(text) => {
                                setContact(text)
                            }} />
                    </View>
                    <TouchableOpacity style={{ backgroundColor: (!name || !email || !contact) ? 'grey' : '#0E469F', width: '100%', alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 10, marginBottom: 10 }}
                        disabled={!name || !email || !contact}  onPress={register}>
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#fff' }}>Register</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        
    )
}

export default Register

const styles = StyleSheet.create({})
