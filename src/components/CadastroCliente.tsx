import React from 'react';
import { View, Text, Image, Switch, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { styles } from '../styles/styles';
import { useState } from "react";


const CadastroCliente = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [ativado, setAtivado] = useState('nao');
    const [checked, setChecked] = React.useState('first');

    function exibirMensagem() {
        Alert.alert(
          'Cadastro realizado com sucesso!'+
          'Cliente',
          'Nome::' + nome +
          '\nE-mail:' + email + 
          '\nTelefone:' + telefone +
        '\nComorbidade:' + ativado
        )
      }
      function limparcampos() {
          setNome('');
          setEmail('');
          setTelefone('');
          setAtivado('nao');
      }

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
                <Text style={stylesLocal.tituloRadio}>Possui Comorbidades?</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#D3D3D3', padding: 20 }}>
                <Switch 
                value={ativado === 'sim'} 
                onValueChange={(value)=>{setAtivado(value ? 'sim' : 'nao') }} 
                />   
                </View>
            </View>
            <View style={stylesLocal.botoes}>
                <Pressable
                    style={stylesLocal.botaoCadastrar}
                    onPress={() => {exibirMensagem()} }>
                    <Text style={[styles.titulo2, , stylesLocal.textoCadastCanc]}>Cadastro</Text>
                </Pressable>
                <Pressable
                    style={stylesLocal.botaoCancelar}
                    onPress={() => {limparcampos()}}>
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

