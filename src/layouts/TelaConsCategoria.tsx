import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { ConsCategoriasProps } from "../navigation/HomeNavigator";
import { styles } from "../styles/styles";
import { Categoria } from "../types/Categorias";

const TelaConsCategoria = (props: ConsCategoriasProps) => {
  const [categorias, setProdutos] = useState<Categoria[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('categorias')
      .onSnapshot(querySnapshot => { 

        const data = querySnapshot.docs.map(doc => {
         
          return {
            id: doc.id,
            ...doc.data() 
          }

        }) as Categoria[];

        setProdutos(data);
      });

    return () => subscribe();
  }, []);

  function deletarCategoria(id: string) {
    firestore()
      .collection('categorias')
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Categoria", "Removido com sucesso")
      })
      .catch((error) => console.log(error));
  }

  function alterarNota(id: string) {
  }

  return (
    <View style={styles.tela}>

      <Text style={styles.tituloTela}>Lista de Categorias</Text>
      <FlatList
        data={categorias}
        renderItem={(info) =>
          <ItemCategoria
            numeroOrdem={info.index + 1}
            cat={info.item}
            onDeletar={deletarCategoria}
            onAlterar={alterarNota} />} />


      <View
        style={styles.centralizar}>
        <Pressable
          style={[styles.botao, { width: '40%' }]}
          onPress={() => { props.navigation.goBack() }}>
          <Text style={styles.texto_botao}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
}

type ItemCategoriasProps = {
  numeroOrdem: number;
  cat: Categoria;
  onDeletar: (id: string) => void;
  onAlterar: (id: string) => void;
}

const ItemCategoria = (props: ItemCategoriasProps) => {

  return (
    <View style={styles.card}>
      <View style={styles_local.dados_card}>
        <Text style={{ fontSize: 30, color: 'black' }}>
          {props.numeroOrdem + ' - ' + props.cat.nome}
        </Text>
        <Text style={{ fontSize: 20 }}>
          Id:{props.cat.id}
        </Text>
      </View>

      <View
        style={styles_local.botoes_card}>
        <View style={styles_local.botao_deletar}>
          <Pressable
            onPress={() => props.onDeletar(props.cat.id)}>
            <Text style={styles_local.texto_botao_card}>
              X
            </Text>
          </Pressable>
        </View>

        <View style={styles_local.botao_alterar}>
          <Pressable
            onPress={() => props.onAlterar(props.cat.id)}>
            <Text style={styles_local.texto_botao_card}>
              A
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default TelaConsCategoria;

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
    backgroundColor: 'yellow',
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
