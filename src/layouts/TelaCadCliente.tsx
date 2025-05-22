import React, { useState } from 'react';
import {View,Text,Image,TextInput,Switch,Pressable,StyleSheet,Alert,} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { styles } from '../styles/styles';
import { CadClienteProps } from '../navigation/HomeNavigator';
import { Cliente } from '../types/Cliente';

const TelaCadCliente = (props: CadClienteProps) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [clube, setAtivado] = useState('nao');

  function cadastrar() {
    if (verificaCampos()) {
      let cliente = {
        nome: nome,
        email: email,
        telefone: telefone,
        cpf: cpf,
        clube: clube,
      } as Cliente;

      firestore()
        .collection('clientes')
        .add(cliente)
        .then(() => {
          Alert.alert('Cliente cadastrado com sucesso!');
          props.navigation.goBack();
        })
        .catch((error) => {
          Alert.alert('Erro', String(error));
        });
    }
  }

  function verificaCampos() {
    if (!nome) {
      Alert.alert('Nome em branco! Digite um nome!');
      return false;
    }
    if (!email) {
      Alert.alert('Email em branco! Digite o Email!');
      return false;
    }
    if (!cpf) {
      Alert.alert('Digite um CPF válido!');
      return false;
    }
    if (!telefone) {
      Alert.alert('Digite um número de telefone!');
      return false;
    }
    return true;
  }

  return (
    <View style={[styles.tela, stylesLocal.fundo]}>
      <View style={[styles.centralizar, stylesLocal.container]}>
        <Text style={styles.titulo1}>Cadastro de Cliente</Text>

        <Image
          source={require('../images/user.png')}
          style={[styles.imagem_200, { height: 120, width: 120 }]}
        />

        <Text style={[styles.titulo3, stylesLocal.label]}>Nome:</Text>
        <TextInput
          value={nome}
          style={stylesLocal.caixaTexto}
          placeholder="Nome"
          placeholderTextColor="#aaa"
          onChangeText={setNome}
        />

        <Text style={[styles.titulo3, stylesLocal.label]}>E-mail:</Text>
        <TextInput
          value={email}
          style={stylesLocal.caixaTexto}
          placeholder="E-mail"
          placeholderTextColor="#aaa"
          onChangeText={setEmail}
        />

        <Text style={[styles.titulo3, stylesLocal.label]}>Telefone:</Text>
        <TextInput
          value={telefone}
          style={stylesLocal.caixaTexto}
          placeholder="Telefone"
          placeholderTextColor="#aaa"
          onChangeText={setTelefone}
        />

        <Text style={[styles.titulo3, stylesLocal.label]}>CPF:</Text>
        <TextInput
          value={cpf}
          style={stylesLocal.caixaTexto}
          placeholder="CPF"
          placeholderTextColor="#aaa"
          onChangeText={setCpf}
        />

        <Text style={stylesLocal.tituloRadio}>Faz parte do clube?</Text>
        <View style={stylesLocal.switchContainer}>
          <Switch
            value={clube === 'sim'}
            onValueChange={(value) => setAtivado(value ? 'sim' : 'nao')}
            trackColor={{ false: '#ccc', true: '#2a9d8f' }}
            thumbColor="#ffffff"
          />
        </View>
      </View>

      <View style={stylesLocal.botoes}>
        <Pressable style={stylesLocal.botaoCadastrar} onPress={cadastrar}>
          <Text style={stylesLocal.textoBotao}>Cadastro</Text>
        </Pressable>
        <Pressable
          style={stylesLocal.botaoCancelar}
          onPress={() => props.navigation.goBack()}>
          <Text style={stylesLocal.textoBotao}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TelaCadCliente;

const stylesLocal = StyleSheet.create({
  fundo: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    marginBottom: 16,
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 8,
    marginBottom: 4,
    fontSize: 15,
  },
  caixaTexto: {
    width: '100%',
    height: 42,
    borderWidth: 1.2,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
  },
  switchContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  tituloRadio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 14,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  botaoCadastrar: {
    flex: 1,
    backgroundColor: '#2a9d8f',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: '#e63946',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  textoBotao: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
