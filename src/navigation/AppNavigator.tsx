import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// Navigator
import { HomeStackNavigator } from "./HomeStackNavigator";
import { MainTabNavigator } from "./MainTabNavigator";
// screen
import {AuthScreen} from "../screens/AuthScreen"

export const AppNavigator = () => {
    const user = {id: "123"};
    return (
        <NavigationContainer>
            {!user ? <AuthScreen /> : <MainTabNavigator />}
        </NavigationContainer>
    );
};