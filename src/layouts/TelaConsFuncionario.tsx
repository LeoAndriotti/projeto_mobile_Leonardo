import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { ConsFuncionarioProps } from "../navigation/HomeNavigator";
import { styles } from "../styles/styles";
import { Funcionario } from "../types/Funcionario";

const TelaConsFuncionario = (props: ConsFuncionarioProps) => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('funcionarios')
      .onSnapshot(querySnapshot => { 

        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          } as Funcionario;
        });

        setFuncionarios(data);
      });

    return () => subscribe();
  }, []);

  function deletarFuncionario(id: string) {
    firestore()
      .collection('funcionarios')
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Funcionário", "Removido com sucesso");
      })
      .catch((error) => console.log(error));
  }

  function alterarFuncionario(func: Funcionario) {
    // Navega para a tela de alteração, enviando o objeto func
    props.navigation.navigate('TelaAltFuncionario', { funcionario: func });
  }

  return (
    <View style={styles.tela}>

      <Text style={styles.tituloTela}>Lista de Funcionários</Text>
      <FlatList
        data={funcionarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) =>
          <ItemFuncionario
            numeroOrdem={index + 1}
            func={item}
            onDeletar={deletarFuncionario}
            onAlterar={alterarFuncionario} />}
      />

      <View style={styles.centralizar}>
        <Pressable
          style={[styles.botao, { width: '40%' }]}
          onPress={() => { props.navigation.goBack() }}>
          <Text style={styles.texto_botao}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
}

type ItemFuncionarioProps = {
  numeroOrdem: number;
  func: Funcionario;
  onDeletar: (id: string) => void;
  onAlterar: (func: Funcionario) => void;
}

const ItemFuncionario = (props: ItemFuncionarioProps) => {

  return (
    <View style={styles.card}>
      <View style={styles_local.dados_card}>
        <Text style={{ fontSize: 30, color: 'black' }}>
          {props.numeroOrdem + ' - ' + props.func.nome}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Id: {props.func.id}
        </Text>
        <Text style={{ fontSize: 20 }}>
          E-mail: {props.func.email}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Telefone: {props.func.telefone}
        </Text>
        <Text style={{ fontSize: 20 }}>
          CPF: {props.func.cpf}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Matrícula: {props.func.matricula}
        </Text>
      </View>

      <View style={styles_local.botoes_card}>
        <View style={styles_local.botao_deletar}>
          <Pressable
            onPress={() => props.onDeletar(props.func.id)}>
            <Text style={styles_local.texto_botao_card}>X</Text>
          </Pressable>
        </View>

        <View style={styles_local.botao_alterar}>
          <Pressable
            onPress={() => props.onAlterar(props.func)}>
            <Text style={styles_local.texto_botao_card}>A</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default TelaConsFuncionario;

const styles_local = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: 'grey',
    margin: 5,
    borderRadius: 10,
    padding: 3,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  dados_card: {
    flex: 1
  },
  botoes_card: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  botao_deletar: {
    backgroundColor: 'red',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao_alterar: {
    backgroundColor: 'green',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto_botao_card: {
    fontWeight: "bold",
    fontSize: 40,
    color: 'black'
  }
});
