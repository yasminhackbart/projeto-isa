import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from "react-native";
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
      oqueescaniou:"",
      produto:"",
      cliente:""
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
      <View style = {styles.container}>
        <Image style = {styles.cigarra} source = {require("../assets/cigarra.png")}/>
          <View style={styles.lowerContainer}>
            <View style={styles.textinputContainer}>
              <TextInput
                style={styles.textinput}
                placeholder={"ID do Produto"}
                placeholderTextColor={"#FFFFFF"}
                value={this.state.produto}
              />
              <TouchableOpacity
                style={styles.scanbutton}
                onPress={() => this.permissao("produto")}
              >
                <Text style={styles.scanbuttonText}>Digitalizar</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.textinputContainer, { marginTop: 25 }]}>
              <TextInput
                style={styles.textinput}
                placeholder={"ID do Cliente"}
                placeholderTextColor={"#FFFFFF"}
                value={this.state.cliente}
              />
              <TouchableOpacity
                style={styles.scanbutton}
                onPress={() => this.permissao("cliente")}
              >
                <Text style={styles.scanbuttonText}>Digitalizar</Text>
              </TouchableOpacity>
            </View>
          </View>
    
      </View>
    );
  }

// quando chama a função de escaneamento
// ela sempre te retorna type, data
// data é o dadod - o produto
// type é o tipo de dado - frase, número
  escaniamentos = async ({type,data}) => {
    const { estadoapp } = this.state;

    if (estadoapp === "produto") {
      this.setState({
        escaniou:true,
        estadoapp:"normal",
        oqueescaniou:data
      })
    } else if (domState === "cliente") {
      this.setState({
        escaniou:true,
        estadoapp:"normal",
        oqueescaniou:data
      })
    }
   
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
    backgroundColor: "#3F493E"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  cigarra: {
    width:300, 
    height:300
  },
  lowerContainer: {
    flex: 0.5,
    alignItems: "center"
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "white"
  },
  textinput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#3F493E",
    fontFamily: "EBGaramond_400Regular",
    color: "#FFFFFF"
  },
  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  scanbuttonText: {
    fontSize: 25,
    color: "#0A0101",
    fontFamily: "EBGaramond_400Regular",
    textAlign:"center",
    marginLeft:30
  }

});
