/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import ListScreen from './ListScreen';
import CustomDrawer from './CustomDrawer';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName='Home'
            drawerContent={(props) => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="List" component={ListScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
    );
}