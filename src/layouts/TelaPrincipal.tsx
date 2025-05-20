import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { PrincipalProps } from '../navigation/HomeNavigator';
import { styles } from '../styles/styles';


const TelaPrincipal = (props: PrincipalProps) => {

    return (
        <View style = { [styles.tela, styles.centralizar]} >
        <Text style={styleLocal.titulo1}>Orion Market</Text>

        <Pressable onPress={() => { props.navigation.navigate('TelaCadProduto')}}>
            <Text style={[styleLocal.botaoNav, styleLocal.botaoTelaCad]}>Cadastrar Produto</Text>
        </Pressable>    

        <Pressable onPress={() => { props.navigation.navigate('TelaCadFuncionario') }}>
            <Text style={[styleLocal.botaoNav, styleLocal.botaoTelaCad]}>Cadastrar Funcionário</Text>
        </Pressable>
        <Pressable onPress={() => { props.navigation.navigate('TelaCadCliente')}}>
            <Text style={[styleLocal.botaoNav, styleLocal.botaoTelaCad]}>Cadastrar Cliente</Text>
        </Pressable>
        <Pressable onPress={() => { props.navigation.navigate('TelaCadCategoria') }}>
            <Text style={[styleLocal.botaoNav, styleLocal.botaoTelaCad]}>Cadastrar Categoria</Text>
        </Pressable>
        
        <Pressable onPress={() => { props.navigation.navigate('TelaConsProduto')}}>
            <Text style={[styleLocal.botaoNav, styleLocal.botaoTelaCons]}>Consultar Produto</Text>
        </Pressable>    

        <Pressable onPress={() => { props.navigation.navigate('TelaCadFuncionario') }}>
            <Text style={[styleLocal.botaoNav, styleLocal.botaoTelaCons]}>Consultar Funcionário</Text>
        </Pressable>
        <Pressable onPress={() => { props.navigation.navigate('TelaCadCliente')}}>
            <Text style={[styleLocal.botaoNav, styleLocal.botaoTelaCons]}>Consultar Cliente</Text>
        </Pressable>
        <Pressable onPress={() => { props.navigation.navigate('TelaCadCategoria') }}>
            <Text style={[styleLocal.botaoNav, styleLocal.botaoTelaCons]}>Consultar Categoria</Text>
        </Pressable>
    </View >
  );
}


export default TelaPrincipal;

const styleLocal = StyleSheet.create({
    titulo1: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 20,
        textAlign: 'center',
    },
    botaoNav: {
        color: "white",
        justifyContent: 'center',
        alignItems:'center',
        width: 'auto',
        paddingVertical: 20,
        paddingHorizontal: 90,
        marginTop: 20,
        borderRadius: 10,
        textAlign: 'center',
    },
    botaoTelaCad:{
        backgroundColor: '#0047ab',
        fontSize: 20
    },
    botaoTelaCons:{
        backgroundColor: '#9b111e',
        fontSize: 20
    },
});
