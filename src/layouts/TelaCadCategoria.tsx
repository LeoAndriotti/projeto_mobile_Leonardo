import React, { useState } from 'react';
import { View, Text, Image, TextInput, Pressable, StyleSheet, Alert, } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { CadCategoriaProps } from '../navigation/HomeNavigator';
import { Categoria } from '../types/Categorias';
import { styles } from '../styles/styles';

const TelaCadCategoria = (props: CadCategoriaProps) => {
  const [nome, setNome] = useState('');

  function cadastrar() {
    if (verificaCampos()) {
      let categoria = {
        nome: nome,
      } as Categoria;

      firestore()
        .collection('categorias')
        .add(categoria)
        .then(() => {
          Alert.alert('Categoria cadastrada com sucesso!');
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
    return true;
  }

  return (
    <View style={[styles.tela, stylesLocal.fundo]}>
      <View style={[styles.centralizar, stylesLocal.container]}>
        <Text style={styles.titulo1}>Cadastro de Categoria</Text>

        <Image
          source={require('../images/ctegoria.png')}
          style={styles.imagem_200}
        />

        <Text style={[styles.titulo3, stylesLocal.label]}>Nome:</Text>
        <TextInput
          value={nome}
          style={[stylesLocal.caixaTexto]}
          placeholder="Nome"
          placeholderTextColor="#aaa"
          onChangeText={(text) => {
            setNome(text);
          }}
        />
      </View>

      <View style={stylesLocal.botoes}>
        <Pressable
          style={stylesLocal.botaoCadastrar}
          onPress={() => {
            cadastrar();
          }}>
          <Text style={[styles.titulo2, stylesLocal.textoBotao]}>Cadastro</Text>
        </Pressable>

        <Pressable
          style={stylesLocal.botaoCancelar}
          onPress={() => props.navigation.goBack()}>
          <Text style={[styles.titulo2, stylesLocal.textoBotao]}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TelaCadCategoria;

const stylesLocal = StyleSheet.create({
  fundo: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  container: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 5,
  },
  caixaTexto: {
    width: '100%',
    height: 48,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  botaoCadastrar: {
    flex: 1,
    backgroundColor: '#2a9d8f',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: '#e63946',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
