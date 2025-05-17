import React from 'react';
import { View, Text, Image, Switch, TextInput, Pressable, StyleSheet, Alert, FlatList } from 'react-native';
import { styles } from '../styles/styles';
import { useState } from "react";
import { CadPacienteProps } from '../navigation/HomeNavigator';

const TelaCadPaciente = (props: CadPacienteProps) => {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [grau, setGrau] = useState('');
    const [lista, setLista] = useState(props.route.params.listapaciente);
    const [pacientesselecionados, setListarPacientes] = useState('')


    const CadastrarPaciente = () => {
        if (nome.trim() !== '' && idade.trim() !== '' && descricao.trim() !== '' && grau.trim() !== '') {
            setLista([...lista, ` ${nome},  ${idade},  ${descricao}, Grau: ${grau}`]);
            setNome('');
            setIdade('');
            setDescricao('');
            setGrau('');
        } else {
            Alert.alert('Preencha todos os campos');
        }
    };

    const ListarPacientes = (pacientes: string) => {
        setListarPacientes(pacientes);
    }


    return (
        <View style={styles.tela}>
            <View style={[styles.centralizar, stylesLocal.fundo]}>
                <Text style={styles.titulo1}>Cadastro Paciente</Text>


                <Text style={styles.titulo3}>Nome:</Text>
                <TextInput
                    value={nome}
                    style={[styles.caixa_texto, styles.largura_70]}
                    placeholder='Nome'
                    onChangeText={(text) => {
                        setNome(text);
                    }}
                />
                <Text style={styles.titulo3}>Idade:</Text>
                <TextInput
                    value={idade}
                    style={[styles.caixa_texto, styles.largura_70]}
                    placeholder='Idade'
                    onChangeText={(text1) => {
                        setIdade(text1);
                    }}
                />
                <Text style={styles.titulo3}>Descrição:</Text>
                <TextInput
                    value={descricao}
                    style={[styles.caixa_texto, styles.largura_70]}
                    placeholder='Descrição'
                    onChangeText={(text2) => {
                        setDescricao(text2);
                    }}
                />
                <Text style={styles.titulo3}>Grau:</Text>
                <TextInput
                    value={grau}
                    style={[styles.caixa_texto, styles.largura_70]}
                    placeholder='Grau'
                    onChangeText={(text3) => {
                        setGrau(text3);
                    }}
                />
            </View>
            <View style={stylesLocal.botoes}>
                <Pressable
                    style={stylesLocal.botaoCadastrar}
                    onPress={() => { CadastrarPaciente() }}>
                    <Text style={[styles.titulo2, , stylesLocal.textoCadastCanc]}>Cadastro</Text>
                </Pressable>
                <Pressable
                    style={stylesLocal.botaoCancelar}
                    onPress={() => props.navigation.goBack()}>
                    <Text style={[styles.titulo2, stylesLocal.textoCadastCanc]}>Voltar</Text>
                </Pressable>
            </View>
            <FlatList
                data={lista}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    const grauRegex = /Grau:\s*(\d+)/;
                    const match = item.match(grauRegex);
                    const grauNum = match ? parseInt(match[1]) : 0;

                    let estiloGrau = stylesLocal.grau;
                    if (grauNum === 1) estiloGrau = stylesLocal.grau1;
                    else if (grauNum === 2) estiloGrau = stylesLocal.grau2;
                    else if (grauNum === 3) estiloGrau = stylesLocal.grau3;
                    else if (grauNum === 4) estiloGrau = stylesLocal.grau4;
                    else if (grauNum >= 5) estiloGrau = stylesLocal.grau5;
                    return (
                        <Text style={estiloGrau} onPress={() => ListarPacientes(item)}>
                            {item}
                        </Text>
                    );
                }}
            />
        </View>
    );
}
export default TelaCadPaciente;

const stylesLocal = StyleSheet.create({
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
    grau: {
        padding: 10,
        fontSize: 25,
        color: 'black',
        borderRadius: 10,
        borderWidth: 2,
        margin: 5,
        backgroundColor: 'white',
    },
    grau1: {
        padding: 10,
        fontSize: 25,
        color: 'white',
        borderRadius: 10,
        borderWidth: 2,
        margin: 5,
        backgroundColor: 'blue',
    },
    grau2: {
        padding: 10,
        fontSize: 25,
        color: 'white',
        borderRadius: 10,
        borderWidth: 2,
        margin: 5,
        backgroundColor: 'green',
    },
    grau3: {
        padding: 10,
        fontSize: 25,
        color: 'black',
        borderRadius: 10,
        borderWidth: 2,
        margin: 5,
        backgroundColor: 'yellow',
    },
    grau4: {
        padding: 10,
        fontSize: 25,
        color: 'white',
        borderRadius: 10,
        borderWidth: 2,
        margin: 5,
        backgroundColor: 'orange',
    },
    grau5: {
        padding: 10,
        fontSize: 25,
        color: 'white',
        borderRadius: 10,
        borderWidth: 2,
        margin: 5,
        backgroundColor: 'red',
    }
});

