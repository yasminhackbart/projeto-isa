import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Camera,Permissions} from "expo-camera";
import {BarCodeScanner} from "expo-barcode-scanner";

export default class TransactionScreen extends Component {
  constructor(){
    super()
    //estados da câmera
    // estadoapp - normal - pedindo permissao - câmera ligada e escaneando
    // permissao - usuário deu permissão ? granted se sim e ungranted se não
    // escaniou? quando estamos no modo de câmera ligada, já escaneou o que foi preciso?
    // o que escaniou - conteudo escaneado - qual o produto?
    this.state = {
      estadoapp:"normal",
      permissão:null,
      escaniou:false,
      oqueescaniou:""
    }
  }

  render() {
    //se o estado estiver em qualquer modo diferende do normal
    //ele irá testar o escaneamento - BarCodeScanner
    //o BarCodeScanner possui uma propriedade - onBarCodeScanned
    // onBarCodeScanned - já escaneou? se sim, fecha a câmera, se não chama a função de escaneamento
    if(this.state.estadoapp!="normal"){
      return(
        <BarCodeScanner 
        onBarCodeScanned = {this.state.escaniou?undefined:this.escaniamentos} 
        style = {StyleSheet.absoluteFillObject}
        />
      )
    }
    // depois ele retorna a tela principal
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{this.permissao("modopermissao")}}>
          <Text style = {{fontFamily:"EBGaramond_400Regular"}}>
            Permitir acesso a câmera
          </Text>
        </TouchableOpacity>
        <Text>Olá</Text>
      </View>
    );
  }

// quando chama a função de escaneamento
// ela sempre te retorna type, data
// data é o dadod - o produto
// type é o tipo de dado - frase, número
  escaniamentos = async ({type,data}) => {
    this.setState({
      escaniou:true,
      estadoapp:"normal",
      oqueescaniou:data
    })
  }

//perdir permissao da câmera
  permissao = async estadoapp => {
    // dentro da função de request tem a var status
    // ela quem retorna se demos permissão ou não
    var {status} = await Camera.requestCameraPermissionsAsync()
    this.setState({
      // status sempre sera granted ou ungrated
      // status == "granted" - status:true
      // status == "ungranted" - status:false
      // true - dei permissão
      //false - não dei permissão
      permissao:status == "granted",
      escaniou:false,
      estadoapp:estadoapp
    })
  }


}

//criação de estilo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  }
});
