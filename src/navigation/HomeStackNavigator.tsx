import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
// screens
import { HomeScreen } from "../screens/HomeScreen";
import { ShopScreen } from "../screens/ShopScreen";
import {CreateReviewScreen} from "../screens/CreateReviewScreen"
// type
import {RootStackParamList} from "../types/navigation"

const Stack = createStackNavigator<RootStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#000",
        headerStyle: { backgroundColor: "#F1F0E4" }
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Shop" component={ShopScreen} />
    </Stack.Navigator>
  );
};

export const HomeStackNavigator = () => (
  <RootStack.Navigator
    mode="modal"
    screenOptions={{
      headerTintColor: "#000",
      headerStyle: { backgroundColor: "#F1F0E4" },
    }}
  >
    <RootStack.Screen
      name="Main"
      component={MainStack}
      options={{ headerShown: false }}
    />
    <RootStack.Screen name="CreateReview" component={CreateReviewScreen} />
  </RootStack.Navigator>
);
