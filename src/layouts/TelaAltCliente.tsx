import { useEffect, useState } from "react";
import { Alert, Pressable, Text, TextInput, View, FlatList, StyleSheet, Switch } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Cliente } from "../types/Cliente";
import { AltClienteProps } from "../navigation/HomeNavigator";
import { styles } from "../styles/styles";
import React from "react";



const TelaAltCliente = (props: AltClienteProps) => {
    const funcionarioParam = props.route.params.cliente;

    const [id] = useState(funcionarioParam.id);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [clube, setAtivado] = useState('nao');
    const [checked, setChecked] = React.useState('first');

    async function carregar() {
        try {
            const resultado = await firestore()
                .collection('clientes')
                .doc(id)
                .get();

            const cliente = {
                id: resultado.id,
                ...resultado.data()
            } as Cliente;

            setNome(cliente.nome);
            setEmail(cliente.email);
            setTelefone(cliente.telefone);
            setCpf(cliente.cpf);
            setAtivado(cliente.clube);

        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar o cliente');
            console.log(error);
        }
    }

    useEffect(() => {
        carregar();
    }, []);


    function alterar() {
        if (!verificaCampos()) return;

        const cliente: Cliente = {
            id,
            nome,
            email,
            telefone,
            cpf,
            clube
        };

        firestore()
            .collection('clientes')
            .doc(id)
            .update(cliente)
            .then(() => {
                Alert.alert("Cliente", "Alterado com sucesso");
                props.navigation.goBack();
            })
            .catch((error) => {
                Alert.alert('Erro', 'Não foi possível alterar o cliente');
                console.log(error);
            });
    }

    function verificaCampos() {
        if (!nome) {
            Alert.alert("Nome em branco", "Digite um nome");
            return false;
        }
        if (!email) {
            Alert.alert('Email em branco! Digite o Email!')
            return false;
        }
        if (!telefone) {
            Alert.alert('Digite um número de telefone!')
            return false;
        }
        if (!cpf) {
            Alert.alert('Digite um cpf válido!')
            return false;
        }


        return true;
    }

    return (
        <View style={styles.tela}>
            <Text style={styles.tituloTela}>Alteração de Cliente</Text>

            <Text style={styles.titulo_campos}>Nome</Text>
            <TextInput
                style={styles.caixa_texto}
                value={nome}
                onChangeText={setNome}
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
            <Text style={stylesLocal.tituloRadio}>Faz parte do clube?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#gray', padding: 20 }}>
                <Switch
                    value={clube === 'sim'}
                    onValueChange={(value) => { setAtivado(value ? 'sim' : 'nao') }}
                />
            </View>

            <View style={styles.centralizar}>
                <Pressable style={styles.botao} onPress={alterar}>
                    <Text style={styles.texto_botao}>Alterar</Text>
                </Pressable>

                <Pressable style={styles.botao_vermelho} onPress={() => props.navigation.goBack()}>
                    <Text style={styles.texto_botao}>Cancelar</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default TelaAltCliente;
const stylesLocal = StyleSheet.create({
    tituloRadio: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 25,
    },
});