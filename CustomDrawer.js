import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';

export default function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Custom Header</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#f59153',
        borderWidth:0,
        borderRadius:10
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});