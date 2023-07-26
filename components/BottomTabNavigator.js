import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TransactionScreen from "../screens/Transaction.js";
import Pesquisa from "../screens/Search.js";
const Tab = createBottomTabNavigator()

export default class BottomTabNavigator extends Component {
  render() {
    return (
      <SafeAreaProvider>
      <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name = "Pesquisa" component = {Pesquisa} ></Tab.Screen> 
      <Tab.Screen name = "Transação" component = {TransactionScreen} ></Tab.Screen>
      </Tab.Navigator>
      </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
