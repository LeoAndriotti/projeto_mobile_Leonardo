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

const ItemProduto = ({ numeroOrdem, prod, onDeletar, navigation }: ItemProdutoProps) => {
  return (
    <View style={stylesLocal.card}>
      <View style={stylesLocal.dados_card}>
        <Text style={stylesLocal.nome_produto}>
          {numeroOrdem + ' - ' + prod.nome}
        </Text>
        <Text style={stylesLocal.info}>ID: {prod.id}</Text>
        <Text style={stylesLocal.info}>Código de Barras: {prod.codigoBarras}</Text>
        <Text style={stylesLocal.info}>Preço: R$ {prod.preco.toFixed(2)}</Text>
        <Text style={stylesLocal.info}>Categoria: {prod.categorias.join(" / ")}</Text>
      </View>

      <View style={stylesLocal.botoes_card}>
        <Pressable
          style={[stylesLocal.botao_card, { backgroundColor: '#e63946' }]}
          onPress={() => onDeletar(prod.id)}>
          <Text style={stylesLocal.texto_botao_card}>✖</Text>
        </Pressable>

        <Pressable
          style={[stylesLocal.botao_card, { backgroundColor: '#2a9d8f' }]}
          onPress={() => navigation.navigate('TelaAltProduto', { produto: prod })}>
          <Text style={stylesLocal.texto_botao_card}>✎</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TelaConsProduto;

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
  nome_produto: {
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
