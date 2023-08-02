import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TransactionScreen from "../screens/Transaction.js";
import Pesquisa from "../screens/Search.js";
import Ionicons from "react-native-vector-icons/Ionicons";
const Tab = createBottomTabNavigator()

export default class BottomTabNavigator extends Component {
// screeOptions - opções de mudanças que gostariamos de fazer
// route - rota para chegar no nome das telas
//route.name -> chega no nome da tela
//icones podem ter 3 propriedades que podemos mexer - cor do icone, tamanho e quando ele está clicado
//tabBarOptions -> estilo da tab
  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route})=>({
              tabBarIcon:({focused, color, size})=>{
                var icone 
              
                if(route.name == "Pesquisa"){
                icone = "search"
                }
                if(route.name == "Transação"){
                icone = "card-outline"
                }
                return(
                  <Ionicons name = {icone} size = {size} color = {color}/>
                )
              
              }
          })}
          
            tabBarOptions={{
              activeTintColor: "#a4ad8e",
              inactiveTintColor: "black",
              style: {
                height: 130,
                borderTopWidth: 0,
              },
              labelStyle: {
                fontSize: 20,
                fontFamily: "EBGaramond_400Regular"
              },
              labelPosition: "beside-icon",
              tabStyle: {
                marginTop: 15,
                marginLeft: 10,
                marginRight: 10,
                alignItems: "center",
                justifyContent: "center",
              }
            }}>
            <Tab.Screen name = "Pesquisa" component = {Pesquisa} ></Tab.Screen> 
            <Tab.Screen name = "Transação" component = {TransactionScreen} ></Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
