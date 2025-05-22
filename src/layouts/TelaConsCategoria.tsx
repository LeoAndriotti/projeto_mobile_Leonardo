import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { ConsCategoriasProps } from "../navigation/HomeNavigator";
import { styles } from "../styles/styles";
import { Categoria } from "../types/Categorias";

const TelaConsCategoria = (props: ConsCategoriasProps) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('categorias')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Categoria[];

        setCategorias(data);
      });

    return () => subscribe();
  }, []);

  function deletarCategoria(id: string) {
    firestore()
      .collection('categorias')
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Categoria", "Removida com sucesso");
      })
      .catch((error) => {
        Alert.alert("Erro", "Não foi possível remover a categoria");
        console.log(error);
      });
  }

  function alterarCategoria(cat: Categoria) {
    props.navigation.navigate('TelaAltCategoria', { categoria: cat });
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.tituloTela}>Lista de Categorias</Text>

      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ItemCategoria
            numeroOrdem={index + 1}
            cat={item}
            onDeletar={deletarCategoria}
            onAlterar={alterarCategoria}
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

type ItemCategoriasProps = {
  numeroOrdem: number;
  cat: Categoria;
  onDeletar: (id: string) => void;
  onAlterar: (cat: Categoria) => void;
};

const ItemCategoria = ({ numeroOrdem, cat, onDeletar, onAlterar }: ItemCategoriasProps) => {
  return (
    <View style={stylesLocal.card}>
      <View style={stylesLocal.dados_card}>
        <Text style={stylesLocal.nome_categoria}>
          {numeroOrdem + ' - ' + cat.nome}
        </Text>
        <Text style={stylesLocal.info}>ID: {cat.id}</Text>
      </View>

      <View style={stylesLocal.botoes_card}>
        <Pressable
          style={[stylesLocal.botao_card, { backgroundColor: '#e63946' }]}
          onPress={() => onDeletar(cat.id)}>
          <Text style={stylesLocal.texto_botao_card}>✖</Text>
        </Pressable>

        <Pressable
          style={[stylesLocal.botao_card, { backgroundColor: '#2a9d8f' }]}
          onPress={() => onAlterar(cat)}>
          <Text style={stylesLocal.texto_botao_card}>✎</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TelaConsCategoria;

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
  nome_categoria: {
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
