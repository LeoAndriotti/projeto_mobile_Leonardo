import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { ConsClienteProps } from "../navigation/HomeNavigator";
import { styles } from "../styles/styles";
import { Cliente } from "../types/Cliente";

const TelaConsCliente = (props: ConsClienteProps) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('clientes')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          } as Cliente;
        });

        setClientes(data);
      });

    return () => subscribe();
  }, []);

  function deletarCliente(id: string) {
    firestore()
      .collection('clientes')
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Cliente", "Removido com sucesso");
      })
      .catch((error) => console.log(error));
  }

  function alterarCliente(cli: Cliente) {
    props.navigation.navigate('TelaAltCliente', { cliente: cli });
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.tituloTela}>Lista de Clientes</Text>

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ItemCliente
            numeroOrdem={index + 1}
            cli={item}
            onDeletar={deletarCliente}
            onAlterar={alterarCliente}
          />
        )}
      />

      <View style={styles.centralizar}>
        <Pressable
          style={[styles.botao, { width: '40%' }]}
          onPress={() => props.navigation.goBack()}>
          <Text style={styles.texto_botao}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
};

type ItemClienteProps = {
  numeroOrdem: number;
  cli: Cliente;
  onDeletar: (id: string) => void;
  onAlterar: (cli: Cliente) => void;
};

const ItemCliente = ({ numeroOrdem, cli, onDeletar, onAlterar }: ItemClienteProps) => {
  return (
    <View style={stylesLocal.card}>
      <View style={stylesLocal.dados_card}>
        <Text style={stylesLocal.nome_cliente}>
          {numeroOrdem + ' - ' + cli.nome}
        </Text>
        <Text style={stylesLocal.info}>ID: {cli.id}</Text>
        <Text style={stylesLocal.info}>E-mail: {cli.email}</Text>
        <Text style={stylesLocal.info}>Telefone: {cli.telefone}</Text>
        <Text style={stylesLocal.info}>CPF: {cli.cpf}</Text>
        <Text style={stylesLocal.info}>Clube: {cli.clube}</Text>
      </View>

      <View style={stylesLocal.botoes_card}>
        <Pressable
          style={[stylesLocal.botao_card, { backgroundColor: '#e63946' }]}
          onPress={() => onDeletar(cli.id)}>
          <Text style={stylesLocal.texto_botao_card}>✖</Text>
        </Pressable>

        <Pressable
          style={[stylesLocal.botao_card, { backgroundColor: '#2a9d8f' }]}
          onPress={() => onAlterar(cli)}>
          <Text style={stylesLocal.texto_botao_card}>✎</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TelaConsCliente;

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
  nome_cliente: {
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
