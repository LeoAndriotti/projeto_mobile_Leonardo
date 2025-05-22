import React from 'react';
import { View, Text, Image, Switch, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { useState } from "react";
import  firestore  from '@react-native-firebase/firestore';
import { CadFuncionarioProps } from '../navigation/HomeNavigator';
import { Funcionario } from '../types/Funcionario';

const TelaCadFuncionario = (props: CadFuncionarioProps) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [matricula, setMatricula] = useState('');
   

  function cadastrar() {
    if (verificaCampos()) {
      let funcionario = {
          nome: nome,
          email: email,
          telefone: telefone,
          cpf: cpf,
          matricula: matricula
      } as Funcionario;


      firestore()
        .collection('funcionarios')
        .add(funcionario)
        .then(() => {
          Alert.alert("Funcionário cadastrado com sucesso!");
          props.navigation.goBack();
        })
        .catch((error) => {
          Alert.alert("Erro", String(error));
        });
    }
  }

    function verificaCampos(){
        if(!nome){
            Alert.alert('Nome em branco! Digite um nome!')
            return false;
        }   
        if(!email){
            Alert.alert('Email em branco! Digite o Email!')
            return false;
        }   
        if(!telefone){
            Alert.alert('Digite um número de telefone!')
            return false;
        }  
        if(!cpf){
            Alert.alert('Digite um cpf válido!')
            return false;
        }  
         if(!matricula){
            Alert.alert('Digite um número de matricula!')
            return false;
        }  
        return true;      
    }

    return (
        <View style={styles.tela}>
            <View style={[styles.centralizar, stylesLocal.tela1]}>
                <Text style={styles.titulo1}>Cadastro de Funcionário</Text>
                <Image
                    source={require('../images/clientecadastro.png')}
                    style={styles.imagem_200}
                />

                <Text style={styles.titulo3}>Nome:</Text>
                <TextInput
                    value={nome}
                    style={[styles.caixa_texto, styles.largura_70]}
                    placeholder='Nome'
                    onChangeText={(text) => { 
                        setNome(text);
                    }}
                />
                <Text style={styles.titulo3}>E-mail:</Text>
                <TextInput
                    value={email}
                    style={[styles.caixa_texto, styles.largura_70]}
                    placeholder='E-mail'
                    onChangeText={(text1) => { 
                        setEmail(text1);
                    }}
                />
                <Text style={styles.titulo3}>Telefone:</Text>
                <TextInput
                    value={telefone}
                    style={[styles.caixa_texto, styles.largura_70]}
                    placeholder='Telefone'
                    onChangeText={(text2) => { 
                        setTelefone(text2);
                    }}
                />
                <Text style={styles.titulo3}>CPF</Text>
                <TextInput
                    value={cpf}
                    style={[styles.caixa_texto, styles.largura_70]}
                    placeholder='CPF'
                    onChangeText={(text3) => { 
                        setCpf(text3);
                    }}
                />
                 <Text style={styles.titulo3}>Matrícula</Text>
                <TextInput
                    value={matricula}
                    style={[styles.caixa_texto, styles.largura_70]}
                    placeholder='Matricula'
                    onChangeText={(text4) => { 
                        setMatricula(text4);
                    }}
                />
            </View>
            <View style={stylesLocal.botoes}>
                <Pressable
                    style={stylesLocal.botaoCadastrar}
                    onPress={() => {cadastrar()}}>
                    <Text style={[styles.titulo2, , stylesLocal.textoCadastCanc]}>Cadastro</Text>
                </Pressable>
                <Pressable
                    style={stylesLocal.botaoCancelar}
                    onPress={() => props.navigation.goBack()}>
                    <Text style={[styles.titulo2, stylesLocal.textoCadastCanc]}>Voltar</Text>
                </Pressable>
            </View>

        </View>
    );
}
export default TelaCadFuncionario;

const stylesLocal = StyleSheet.create({
    tela1: {
        backgroundColor: '#f2f2f2',
        flex: 4,
    },
    tituloRadio: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 25,
    },
   
    textoCadastCanc: {
        color: 'white',
        fontSize: 25,
        marginTop: 5,
        width: 150,
        textAlign: 'center',
    },
    fundo: {
        backgroundColor: '#f2f2f2',
    },
    botoes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#f2f2f2',
        flex: 1,
    },
    botaoCancelar: {
        backgroundColor: '#e63946',
        alignItems: 'center',
        borderRadius: 5,
        height: 50,
        justifyContent: 'center'
    },
    botaoCadastrar: {
        backgroundColor: '#2a9d8f',
        alignItems: 'center',
        borderRadius: 5,
        height: 50,
        justifyContent: 'center'
    },
    botaoNav: {
        color: "white",
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 10,
        textAlign: 'center',
    }
});

