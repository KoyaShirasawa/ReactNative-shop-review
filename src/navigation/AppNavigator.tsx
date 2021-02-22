import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
// Navigator
import { MainTabNavigator } from "./MainTabNavigator";
// screen
import {AuthScreen} from "../screens/AuthScreen";
//context
import {UserContext} from "../contexts/userContext";


export const AppNavigator = () => {
    const {user} = useContext(UserContext);
    return (
        <NavigationContainer>
            {!user ? <AuthScreen /> : <MainTabNavigator />}
        </NavigationContainer>
    );
};