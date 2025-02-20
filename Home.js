/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import CustomDateTimePicker from './CustomeDatePicker';
import Toast from 'react-native-toast-message';
import CustomToast from './CustomToast';

const Home = () => {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [toastVisible, setToastVisible] = useState(false); // Loader State

    const handleLogout = async () => {
        Alert.alert(
            'Logout Confirmation',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            setLoading(true); 
                            await AsyncStorage.removeItem('addim_id');
                            await AsyncStorage.removeItem('isLoggedIn');
                            setTimeout(() => {
                                setLoading(false);
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Login' }],
                                });
                            }, 1500);
                        } catch (error) {
                            console.error('Error logging out:', error);
                            setLoading(false);
                        }
                    },
                },
                {
                    text: 'No',
                    onPress: () => console.log('Logout canceled'),
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    };

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000); // Simulate a data refresh delay
    };

    useEffect(() => {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2500);
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{  justifyContent: 'center', alignItems: 'center' }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={{ width: '100%', height: 60, backgroundColor: '#fff', elevation: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ marginLeft: '35%', marginBottom: '3%' }}>
                    <Text style={{ fontSize: 19, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}>Home</Text>
                </View>
                <TouchableOpacity style={{ justifyContent: 'center', marginLeft: '35%' }} onPress={handleLogout}>
                    <Image source={require('../assets/arrow.png')} style={{ width: 20, height: 20 }}></Image>
                </TouchableOpacity>
            </View>

            {/* Loader UI */}
            {loading && (
                <View style={{ marginTop: 20 }}>
                    <ActivityIndicator size="large" color="blue" />
                    <Text style={{ marginTop: 10 }}>Logging out...</Text>
                </View>
            )}

            <CustomDateTimePicker/>

            <View style={{ alignItems: 'center' }}>
                {/* Additional content can be added here */}
            </View>
            <CustomToast message="🎉Welcome to Home!🎉" message2="Its Your Home Page" visible={toastVisible} onHide={() => setToastVisible(false)} />
        </ScrollView>
    );
};

export default Home;
