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
            onAlterar={alterarFuncionario}
          />}
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
};

type ItemFuncionarioProps = {
  numeroOrdem: number;
  func: Funcionario;
  onDeletar: (id: string) => void;
  onAlterar: (func: Funcionario) => void;
};

const ItemFuncionario = ({ numeroOrdem, func, onDeletar, onAlterar }: ItemFuncionarioProps) => {
  return (
    <View style={stylesLocal.card}>
      <View style={stylesLocal.dados_card}>
        <Text style={stylesLocal.nome_funcionario}>
          {numeroOrdem + ' - ' + func.nome}
        </Text>
        <Text style={stylesLocal.info}>ID: {func.id}</Text>
        <Text style={stylesLocal.info}>E-mail: {func.email}</Text>
        <Text style={stylesLocal.info}>Telefone: {func.telefone}</Text>
        <Text style={stylesLocal.info}>CPF: {func.cpf}</Text>
        <Text style={stylesLocal.info}>Matrícula: {func.matricula}</Text>
      </View>

      <View style={stylesLocal.botoes_card}>
        <Pressable
          style={[stylesLocal.botao_card, { backgroundColor: '#e63946' }]}
          onPress={() => onDeletar(func.id)}>
          <Text style={stylesLocal.texto_botao_card}>✖</Text>
        </Pressable>

        <Pressable
          style={[stylesLocal.botao_card, { backgroundColor: '#2a9d8f' }]}
          onPress={() => onAlterar(func)}>
          <Text style={stylesLocal.texto_botao_card}>✎</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TelaConsFuncionario;

const stylesLocal = StyleSheet.create({
  card: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 10,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  dados_card: {
    marginBottom: 10,
  },
  nome_funcionario: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1d3557',
    marginBottom: 6,
  },
  info: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  botoes_card: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  botao_card: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto_botao_card: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
