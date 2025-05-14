import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { PrincipalProps } from '../navigation/HomeNavigator';
import { styles } from '../styles/styles';
import Exemplo01 from '../components/Exemplo01';
import Exemplo1 from '../components/Exemplo1';
import Exemplo05_Text from '../components/Exemplo05_Text';
import Exemplo06_TextInput from '../components/Exemplo06_TextInput';
import Exemplo07_Image from '../components/Exemplo07_Image';
import Notas from '../components/Notas1';
import Lista from '../components/Lista';
//Componente chamado TelaPrincipal que recebe 
//PrincipalProps 
//como parametro e constrói uma View com o componente 
//HelloWorld e Exemplo1 dentro

const TelaPrincipal = (props: PrincipalProps) => {

    return (
        <View style = { [styles.tela, styles.centralizar]} >
        <Text style={styles.titulo1}>Tela Principal</Text>

        <Pressable onPress={() => { props.navigation.navigate('TelaNotas', {nota1: 10, nota2: 8, nome: 'Leonardo' }) }}>
            <Text style={styleLocal.botaoNav}>Tela Notas</Text>
        </Pressable>

        <Pressable onPress={() => { props.navigation.navigate('TelaLista', {listapessoas: ['Leonardo'] }) }}>
            <Text style={styleLocal.botaoNav}>Tela Lista</Text>
        </Pressable>

        <Pressable onPress={() => { 
            const text = "Default Alert Text"; 
            props.navigation.navigate('TelaExercicio5', {onClick: (text) => Alert.alert(text)}) 
        }}>
            <Text style={styleLocal.botaoNav}>Tela Exercicio 5</Text>
        </Pressable>
    </View >
  );
}


//exportando o componente TelaPrincipal para ficar visível para outros arquivos
export default TelaPrincipal;

const styleLocal = StyleSheet.create({
    botaoNav: {
        color: "white",
        justifyContent: 'center',
        alignItems:'center',
        width: 'auto',
        backgroundColor: 'green',
        paddingVertical: 20,
        paddingHorizontal: 90,
        marginTop: 20,
        borderRadius: 10,
        textAlign: 'center'
    }
});
