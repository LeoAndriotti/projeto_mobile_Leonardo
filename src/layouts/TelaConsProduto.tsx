import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, Text, View, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { ConsProdutoProps } from "../navigation/HomeNavigator";
import { Produto } from "../types/Produto";
import { styles } from "../styles/styles";

const TelaConsProduto = (props: ConsProdutoProps) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('produtos')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Produto[];
        setProdutos(data);
      });

    return () => subscribe();
  }, []);

  function deletarProduto(id: string) {
    firestore()
      .collection('produtos')
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Produto", "Removido com sucesso");
      })
      .catch((error) => {
        Alert.alert("Erro", "Não foi possível remover o produto");
        console.log(error);
      });
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.tituloTela}>Lista de Produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <ItemProduto
            numeroOrdem={index + 1}
            prod={item}
            onDeletar={deletarProduto}
            navigation={props.navigation}
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

type ItemProdutoProps = {
  numeroOrdem: number;
  prod: Produto;
  onDeletar: (id: string) => void;
  navigation: ConsProdutoProps['navigation'];
};

const ItemProduto = (props: ItemProdutoProps) => {
  return (
    <View style={styles_local.card}>
      <View style={styles_local.dados_card}>
        <Text style={{ fontSize: 30, color: 'black' }}>
          {props.numeroOrdem + ' - ' + props.prod.nome}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Id: {props.prod.id}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Código de Barras: {props.prod.codigoBarras}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Preço: R${props.prod.preco.toFixed(2)}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Categoria: {props.prod.categorias.join(" / ")}
        </Text>
      </View>

      <View style={styles_local.botoes_card}>
        <View style={styles_local.botao_deletar}>
          <Pressable onPress={() => props.onDeletar(props.prod.id)}>
            <Text style={styles_local.texto_botao_card}>X</Text>
          </Pressable>
        </View>

        <View style={styles_local.botao_alterar}>
          <Pressable
            onPress={() => props.navigation.navigate('TelaAltProduto', { produto: props.prod })}>
            <Text style={styles_local.texto_botao_card}>A</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TelaConsProduto;

const styles_local = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: 'grey',
    margin: 5,
    borderRadius: 10,
    padding: 3,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  dados_card: {
    flex: 1,
  },
  botoes_card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: 'black',
  },
});
