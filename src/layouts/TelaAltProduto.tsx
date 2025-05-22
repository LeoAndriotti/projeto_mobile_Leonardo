import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { AltProdutoProps } from "../navigation/HomeNavigator";
import { Produto } from "../types/Produto";

type Categoria = {
  id: string;
  nome: string;
};

const TelaAltProduto = (props: AltProdutoProps) => {
  const produtoParam = props.route.params.produto;

  const [id] = useState(produtoParam.id);
  const [nome, setNome] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  const [preco, setPreco] = useState("");

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);

  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [loadingProduto, setLoadingProduto] = useState(true);

  useEffect(() => {
    carregarCategorias();
    carregarProduto();
  }, []);

  async function carregarProduto() {
    try {
      const resultado = await firestore().collection("produtos").doc(id).get();

      if (!resultado.exists) {
        Alert.alert("Erro", "Produto não encontrado");
        props.navigation.goBack();
        return;
      }

      const produto = { id: resultado.id, ...resultado.data() } as Produto;

      setNome(produto.nome || "");
      setCodigoBarras(produto.codigoBarras || "");
      setPreco(produto.preco !== undefined ? produto.preco.toFixed(2) : "");

      setCategoriasSelecionadas(produto.categorias || []);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar o produto");
      console.log(error);
    } finally {
      setLoadingProduto(false);
    }
  }

  async function carregarCategorias() {
    try {
      const resultado = await firestore().collection("categorias").get();

      const listaCategorias = resultado.docs.map((doc) => ({
        id: doc.id,
        nome: doc.data().nome,
      }));

      setCategorias(listaCategorias);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as categorias");
      console.log(error);
    } finally {
      setLoadingCategorias(false);
    }
  }

  function toggleCategoria(id: string) {
    if (categoriasSelecionadas.includes(id)) {
      setCategoriasSelecionadas((prev) => prev.filter((catId) => catId !== id));
    } else {
      setCategoriasSelecionadas((prev) => [...prev, id]);
    }
  }

  function alterar() {
    if (!verificaCampos()) return;

    if (categoriasSelecionadas.length === 0) {
      Alert.alert("Categorias", "Selecione pelo menos uma categoria.");
      return;
    }

    const produto: Produto = {
      id,
      nome,
      codigoBarras,
      preco: Number.parseFloat(preco),
      categorias: categoriasSelecionadas,
    };

    firestore()
      .collection("produtos")
      .doc(id)
      .update(produto)
      .then(() => {
        Alert.alert("Produto", "Alterado com sucesso");
        props.navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Erro", "Não foi possível alterar o produto");
        console.log(error);
      });
  }

  function verificaCampos() {
    if (!nome.trim()) {
      Alert.alert("Nome em branco", "Digite um nome");
      return false;
    }
    if (!codigoBarras.trim()) {
      Alert.alert("Código de Barras em branco", "Digite um código de barras");
      return false;
    }
    if (!preco.trim()) {
      Alert.alert("Preço em branco", "Digite um preço");
      return false;
    }

    const precoNumero = Number.parseFloat(preco);
    if (isNaN(precoNumero) || precoNumero <= 0) {
      Alert.alert("Preço incorreto", "Digite um preço maior do que zero");
      return false;
    }

    return true;
  }

  function renderItemCategoria({ item }: { item: Categoria }) {
    const selecionada = categoriasSelecionadas.includes(item.id);
    return (
      <Pressable
        style={stylesLocal.categoriaItem}
        onPress={() => toggleCategoria(item.id)}
      >
        <View
          style={[
            stylesLocal.checkbox,
            selecionada && stylesLocal.checkboxSelecionado,
          ]}
        />
        <Text style={stylesLocal.categoriaTexto}>{item.nome}</Text>
      </Pressable>
    );
  }

  if (loadingCategorias || loadingProduto) {
    return (
      <View style={[stylesLocal.tela, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#2a9d8f" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={stylesLocal.tela}>
      <Text style={stylesLocal.tituloTela}>Alteração de Produto</Text>

      <Text style={stylesLocal.label}>Nome</Text>
      <TextInput style={stylesLocal.caixaTexto} value={nome} onChangeText={setNome} />

      <Text style={stylesLocal.label}>Código de Barras</Text>
      <TextInput
        style={[stylesLocal.caixaTexto, { width: "60%" }]}
        maxLength={14}
        value={codigoBarras}
        onChangeText={setCodigoBarras}
        keyboardType="numeric"
      />

      <Text style={stylesLocal.label}>Preço</Text>
      <TextInput
        style={[stylesLocal.caixaTexto, { width: "40%" }]}
        maxLength={7}
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />

      <Text style={[stylesLocal.label, { marginTop: 20 }]}>Categorias</Text>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        renderItem={renderItemCategoria}
        extraData={categoriasSelecionadas}
        style={{ maxHeight: 200, marginBottom: 20 }}
      />

      <View style={stylesLocal.botoes}>
        <Pressable style={stylesLocal.botaoSalvar} onPress={alterar}>
          <Text style={stylesLocal.textoBotao}>Alterar</Text>
        </Pressable>
        <Pressable
          style={stylesLocal.botaoCancelar}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={stylesLocal.textoBotao}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TelaAltProduto;

const stylesLocal = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 12,
    paddingTop: 10,
    justifyContent: "flex-start",
  },
  tituloTela: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    marginBottom: 4,
    color: "#333",
  },
  caixaTexto: {
    width: "100%",
    height: 36,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 8,
    fontSize: 13,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  categoriasContainer: {
    width: "100%",
    marginTop: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  categoriaItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
    marginBottom: 8,
  },
  categoriaTexto: {
    fontSize: 12,
    color: "#000",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: "#555",
    marginRight: 8,
    backgroundColor: "#fff",
    borderRadius: 3,
  },
  checkboxSelecionado: {
    backgroundColor: "#2a9d8f",
    borderColor: "#2a9d8f",
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  botaoSalvar: {
    flex: 1,
    backgroundColor: "#2a9d8f",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    marginRight: 8,
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: "#e63946",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    marginLeft: 8,
  },
  textoBotao: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
