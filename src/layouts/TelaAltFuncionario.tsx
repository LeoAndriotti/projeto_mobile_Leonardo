import { useEffect, useState } from "react";
import { Alert, Pressable, Text, TextInput, View, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Funcionario } from "../types/Funcionario";
import { AltFuncionarioProps } from "../navigation/HomeNavigator";
import { styles } from "../styles/styles";



const TelaAltFuncionario = (props: AltFuncionarioProps) => {
    const funcionarioParam = props.route.params.funcionario;

    const [id] = useState(funcionarioParam.id);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [matricula, setMatricula] = useState('');

    async function carregar() {
        try {
            const resultado = await firestore()
                .collection('funcionarios')
                .doc(id)
                .get();

            const funcionario = {
                id: resultado.id,
                ...resultado.data()
            } as Funcionario;

            setNome(funcionario.nome);
            setEmail(funcionario.email);
            setTelefone(funcionario.telefone);
            setCpf(funcionario.cpf);
            setMatricula(funcionario.matricula);

        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar o funcionario');
            console.log(error);
        }
    }

    useEffect(() => {
        carregar();
    }, []);


    function alterar() {
        if (!verificaCampos()) return;

        const funcionario: Funcionario = {
            id,
            nome,
            email,
            telefone,
            cpf,
            matricula
        };

        firestore()
            .collection('funcionarios')
            .doc(id)
            .update(funcionario)
            .then(() => {
                Alert.alert("Funcionario", "Alterado com sucesso");
                props.navigation.goBack();
            })
            .catch((error) => {
                Alert.alert('Erro', 'Não foi possível alterar o funcionario');
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
        if (!matricula) {
            Alert.alert('Digite um número de matricula!')
            return false;
        }

        return true;
    }

    return (
        <View style={styles.tela}>
            <Text style={styles.tituloTela}>Alteração de Funcionario</Text>

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
            <Text style={styles.titulo3}>Matrícula</Text>
            <TextInput
                value={matricula}
                style={[styles.caixa_texto, styles.largura_70]}
                placeholder='Matricula'
                onChangeText={(text4) => {
                    setMatricula(text4);
                }}
            />

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

export default TelaAltFuncionario;
