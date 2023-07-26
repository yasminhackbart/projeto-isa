import React, { Component } from "react";
import BottomTabNavigator from "./components/BottomTabNavigator";
import {EBGaramond_400Regular} from "@expo-google-fonts/eb-garamond";
import * as Font from "expo-font";

export default class App extends Component {
  // quando o aplicativo está sendo inicializado
  constructor(){
    super()
  // criamos os estados antes do aplicativo ser montado, por isso fica dentro do constructor
  // estados são como variáveis
    this.state = {
      carregoufonte:false
    }
  }
  
  // a fonte vem da internet - demora a ser carregada,por isso usamos async
  async fontecarregada(){
    //await é pra esperar
    await Font.loadAsync({
      EBGaramond_400Regular:EBGaramond_400Regular
    })
    //mudar estado
    this.setState({ 
      caregoufonte:true
    })
  }


  //quando o aplicativo é montado chama o carregamento da fonte
  componentDidMount(){
    this.fontecarregada()
  }

  //função de mostrar na tela
  render() {
      return <BottomTabNavigator/>
  }
}
