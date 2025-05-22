import React from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { PrincipalProps } from '../navigation/HomeNavigator';
import { styles } from '../styles/styles';

const TelaPrincipal = (props: PrincipalProps) => {
  return (
    <ScrollView contentContainerStyle={[styles.tela, styles.centralizar, styleLocal.container]}>
      <View style={styleLocal.tituloContainer}>
  <Image
    source={require('../images/mercado.png')}
    style={styleLocal.logo}
  />
  <Text style={styleLocal.titulo}>Orion Market</Text>
</View>

      <View style={styleLocal.grupo}>
        <Text style={styleLocal.subtitulo}>Cadastrar</Text>
        <Pressable onPress={() => props.navigation.navigate('TelaCadProduto')}>
          <Text style={[styleLocal.botao, styleLocal.botaoCad]}>Produto</Text>
        </Pressable>
        <Pressable onPress={() => props.navigation.navigate('TelaCadFuncionario')}>
          <Text style={[styleLocal.botao, styleLocal.botaoCad]}>Funcionário</Text>
        </Pressable>
        <Pressable onPress={() => props.navigation.navigate('TelaCadCliente')}>
          <Text style={[styleLocal.botao, styleLocal.botaoCad]}>Cliente</Text>
        </Pressable>
        <Pressable onPress={() => props.navigation.navigate('TelaCadCategoria')}>
          <Text style={[styleLocal.botao, styleLocal.botaoCad]}>Categoria</Text>
        </Pressable>
      </View>

      <View style={styleLocal.grupo}>
        <Text style={styleLocal.subtitulo}>Consultar</Text>
        <Pressable onPress={() => props.navigation.navigate('TelaConsProduto')}>
          <Text style={[styleLocal.botao, styleLocal.botaoCons]}>Produto</Text>
        </Pressable>
        <Pressable onPress={() => props.navigation.navigate('TelaConsFuncionario')}>
          <Text style={[styleLocal.botao, styleLocal.botaoCons]}>Funcionário</Text>
        </Pressable>
        <Pressable onPress={() => props.navigation.navigate('TelaConsCliente')}>
          <Text style={[styleLocal.botao, styleLocal.botaoCons]}>Cliente</Text>
        </Pressable>
        <Pressable onPress={() => props.navigation.navigate('TelaConsCategoria')}>
          <Text style={[styleLocal.botao, styleLocal.botaoCons]}>Categoria</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default TelaPrincipal;

const styleLocal = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  
  subtitulo: {
    fontSize: 18, 
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  grupo: {
    marginVertical: 14,
    padding: 8,
    backgroundColor: '#f0f4f7',
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  botao: {
    fontSize: 16, 
    paddingVertical: 12, 
    paddingHorizontal: 16, 
    borderRadius: 6,
    textAlign: 'center',
    marginVertical: 6,
    color: 'white',
    elevation: 1,
  },
  botaoCad: {
    backgroundColor: '#0077cc',
  },
  botaoCons: {
    backgroundColor: '#cc3300',
  },
  tituloContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 20,
},
titulo: {
  fontSize: 30,
  fontWeight: 'bold',
  color: '#003366',
  marginLeft: 10,
},
logo: {
  width: 80,
  height: 80,
  resizeMode: 'contain',
},

});
