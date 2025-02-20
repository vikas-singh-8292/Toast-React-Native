/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';

const CustomToast = ({ message, visible, onHide ,message2}) => {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();

            setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => onHide());
            }, 2000);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Animated.View
            style={{
                
                backgroundColor: 'green',
                borderRadius: 10,
                opacity: fadeAnim,
                height:60,
                bottom:120,
                width:'90%',
                alignItems:'center',
                justifyContent:'center',
                elevation:5,
                shadowColor:'green',
                
            }}
        >
        <View style={{width:'98%',backgroundColor:'#fff',height:'100%',marginLeft:'2%',borderRadius:10}}>
            <Text style={{ color: '#000',marginTop:5,marginLeft:10 ,fontSize:15}}>{message}</Text>
            <Text style={{ color: 'grey', marginTop: 5, marginLeft: 10, fontSize: 12 }}>{message2}</Text>
            </View>
        </Animated.View>
    );
};

export default CustomToast;
