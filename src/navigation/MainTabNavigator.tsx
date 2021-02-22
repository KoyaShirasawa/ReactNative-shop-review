import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"; 

// screen
import {HomeStackNavigator} from './HomeStackNavigator';
import {UserScreen} from '../screens/UserScreen';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#900",
        inactiveTintColor: "#999",
        style: { backgroundColor: "#F1F0E4" },
      }}
    >
      <Tab.Screen
        name="らーめん"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "らーめん",
          tabBarIcon: ({ color, size }) => (
            // <Feather name="home" color={color} size={size} />
            <MaterialCommunityIcons name="noodles" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="カフェ"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "カフェ",
          tabBarIcon: ({ color, size }) => (
            <Feather name="coffee" color={color} size={size} />
            // <FontAwesome name={"coffee"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: "アカウント",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};