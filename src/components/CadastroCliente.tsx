import React from 'react';
import { View, Text, Image, Switch, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { useState } from "react";


const CadastroCliente = () => {
    const [ativado, setAtivado] = useState(false);
    const [checked, setChecked] = React.useState('first');
    return (
        <View style={styles.tela}>
            <View style={[styles.centralizar, stylesLocal.fundo]}>
                <Text style={styles.titulo1}>Cadastro de Cliente</Text>
                <Image
                    source={require('../images/clientecadastro.png')}
                    style={styles.imagem_200}
                />

                <Text style={styles.titulo3}>Nome:</Text>
                <TextInput
                    style={[styles.caixa_texto, styles.largura_70]}
                    placeholder='Nome'
                />
                <Text style={styles.titulo3}>E-mail:</Text>
                <TextInput
                    style={[styles.caixa_texto, styles.largura_70]}
                    placeholder='E-mail'
                />
                <Text style={styles.titulo3}>Telefone:</Text>
                <TextInput
                    style={[styles.caixa_texto, styles.largura_70]}
                    placeholder='Telefone'
                />
                <Text style={stylesLocal.tituloRadio}>Possui Comorbidades?</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#D3D3D3', padding: 20 }}>
                <Switch 
                value={ativado} 
                onValueChange={(value)=>{setAtivado(value)}} 
                />   
                </View>
            </View>
            <View style={stylesLocal.botoes}>
                <Pressable
                    style={stylesLocal.botaoCadastrar}
                    onPress={() => { Alert.alert('Cadastro realizado com sucesso!') }}>
                    <Text style={[styles.titulo2, , stylesLocal.textoCadastCanc]}>Cadastro</Text>
                </Pressable>
                <Pressable
                    style={stylesLocal.botaoCancelar}
                    onPress={() => { Alert.alert('Cadastro cancelado!') }}>
                    <Text style={[styles.titulo2, stylesLocal.textoCadastCanc]}>Cancelar</Text>
                </Pressable>
            </View>

        </View>
    );
}
export default CadastroCliente;
const stylesLocal = StyleSheet.create({
    tituloRadio: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
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
        backgroundColor: '#D3D3D3',
    },
    botoes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#D3D3D3',
        flex: 1,
    },
    botaoCancelar: {
        backgroundColor: 'red',
        alignItems: 'center',
        borderRadius: 5,
        height: 50,
        justifyContent: 'center'
    },
    botaoCadastrar: {
        backgroundColor: 'green',
        alignItems: 'center',
        borderRadius: 5,
        height: 50,
        justifyContent: 'center'
    },
});

