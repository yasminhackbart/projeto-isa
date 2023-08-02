import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from "react-native";
import {Camera,Permissions} from "expo-camera";
import {BarCodeScanner} from "expo-barcode-scanner";
import { collection,addDoc, getDocs, doc, query,where,
  updateDoc, serverTimestamp,increment, limit } 
  from "firebase/firestore";
import db from "../bancodedados.js"

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
      cliente:"",
      nomeproduto:"",
      nomecliente:""

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
                onChangeText = {texto => this.setState ({produto:texto})} 
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
                onChangeText = {texto => this.setState ({cliente:texto})}
              />
              <TouchableOpacity
                style={styles.scanbutton}
                onPress={() => this.permissao("cliente")}
              >
                <Text style={styles.scanbuttonText}>Digitalizar</Text>
              </TouchableOpacity>
            </View>
          </View>
              <TouchableOpacity
              onPress = {this.clicarbotao}
              style={styles.botaoenviar}>
                <Text
                style={styles.textoenviar}>Enviar</Text>
              </TouchableOpacity>
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
  clicarbotao = async () => {
 
    var {produto, cliente} = this.state

    //await this.pegarNomeProduto(produto)
    //await this.pegarNomeCliente(cliente)
  
    var produtodisponivel = await this.checarProdutoDisponivel(produto)
    var estoquedisponivel = await this.checarProdutoDisponivelEstoque(produto)

    if (!estoquedisponivel){
      this.atualizarEstoque(produto)
    }
    else {
      if(produtodisponivel){
        var{nomecliente,nomeproduto} = this.state;
        this.atualizarBd(produto,cliente,nomeproduto,nomecliente);
      }
    }

  }


  checarProdutoDisponivel = async(produto)=> {
    
    const procurar = query(collection(db,"Mercadorias"),where("id","==",produto.trim()))
    const resposta = await(getDocs(procurar));
  
    var produtodisp = "";

    if (resposta.empty){
      produtodisp = false
      alert("Esse id não existe no banco de dados")
    }
    else {
       resposta.forEach((doc) => {
          if(doc.data().disponível){
            produtodisp = true
            alert("Transação concluída")
          }
          else{
            produtodisp = false
            alert("Transação não concluída")
          }
        });
    }
    return produtodisp;
  }


  atualizarBd = async (produto,cliente, nomeproduto, nomecliente) => {

    const prodRef = doc(db, "Mercadorias",produto.trim());
         await updateDoc(prodRef,{
             estoque:increment(-1)
         });

         this.setState({
          produto:"",
          cliente:""
         });

         
  }
    
 checarProdutoDisponivelEstoque = async (produto) => {
  var estoque =""
  const procurar = query(collection(db,"Mercadorias"),where("id","==",produto.trim()))
         const resposta = await(getDocs(procurar));

         resposta.forEach((doc) => {
          if(doc.data().estoque <= 0 ){
            estoque = false;
            alert("Acabou Estoque")
          }
          else {
            estoque = true;
          }
        })
  return estoque;
 }

 atualizarEstoque = async(produto) =>{

    const prodRef = doc(db, "Mercadorias",produto.trim());
    await updateDoc(prodRef,{
        disponível:false
    });

    this.setState({
    produto:"",
    cliente:""
    });

 }
  
  

  pegarNomeProduto = async (produto) =>{
    const procurar = query(collection(db,"Mercadorias"),where("id","==",produto.trim()))
    const resposta = await(getDocs(q));

    if(!resposta.empty){
        resposta.forEach((doc) => {
            this.setState({
                nomeproduto: doc.data().nome
            });
        });
    }else{
        Alert.alert("Produto não encontrado!");
    }
  }

  pegarNomeCliente = async (cliente) =>{
    const procurar = query(collection(db,"Mercadorias"),where("id","==",cliente.trim()))
    const resposta = await(getDocs(q));

    if(!resposta.empty){
        resposta.forEach((doc) => {
            this.setState({
                nomecliente: doc.data().nome
            });
        });
    }else{
        Alert.alert("Cliente não encontrado!");
    }
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
  },
  botaoenviar: {
    backgroundColor: "white",
    marginTop: 90,
    width: 70,
    height: 35,
    borderRadius: 5,
    borderWidth: 2

  },
  textoenviar: {
    fontFamily: "EBGaramond_400Regular",
    fontSize: 25,
  }
   

});
