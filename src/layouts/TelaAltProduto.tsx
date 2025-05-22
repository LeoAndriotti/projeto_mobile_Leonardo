import { useEffect, useState } from "react";
import { Alert, Pressable, Text, TextInput, View, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Produto } from "../types/Produto";
import { AltProdutoProps } from "../navigation/HomeNavigator";
import { styles } from "../styles/styles";

type Categoria = {
  id: string;
  nome: string;
};

const TelaAltProduto = (props: AltProdutoProps) => {
  const produtoParam = props.route.params.produto;

  const [id] = useState(produtoParam.id);
  const [nome, setNome] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [preco, setPreco] = useState('');

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);

  async function carregar() {
    try {
      const resultado = await firestore()
        .collection('produtos')
        .doc(id)
        .get();

      const produto = {
        id: resultado.id,
        ...resultado.data()
      } as Produto;

      setNome(produto.nome);
      setCodigoBarras(produto.codigoBarras);
      setPreco(produto.preco.toFixed(2));

      setCategoriasSelecionadas(produto.categorias || []);

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o produto');
      console.log(error);
    }
  }


  async function carregarCategorias() {
    try {
      const resultado = await firestore()
        .collection('categorias')
        .get();

      const listaCategorias = resultado.docs.map(doc => ({
        id: doc.id,
        nome: doc.data().nome,
      }));

      setCategorias(listaCategorias);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as categorias');
      console.log(error);
    }
  }

  useEffect(() => {
    carregar();
    carregarCategorias();
  }, []);

  function toggleCategoria(id: string) {
    if (categoriasSelecionadas.includes(id)) {
      setCategoriasSelecionadas(categoriasSelecionadas.filter(catId => catId !== id));
    } else {
      setCategoriasSelecionadas([...categoriasSelecionadas, id]);
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
      .collection('produtos')
      .doc(id)
      .update(produto)
      .then(() => {
        Alert.alert("Produto", "Alterado com sucesso");
        props.navigation.goBack();
      })
      .catch((error) => {
        Alert.alert('Erro', 'Não foi possível alterar o produto');
        console.log(error);
      });
  }

  function verificaCampos() {
    if (!nome) {
      Alert.alert("Nome em branco", "Digite um nome");
      return false;
    }
    if (!codigoBarras) {
      Alert.alert("Código de Barras em branco", "Digite um código de barras");
      return false;
    }
    if (!preco) {
      Alert.alert("Preço em branco", "Digite um preço");
      return false;
    }

    const precoNumero = Number.parseFloat(preco);
    if (precoNumero <= 0) {
      Alert.alert("Preço incorreto", "Digite um preço maior do que zero");
      return false;
    }

    return true;
  }

  // Renderiza um item da lista de categorias com checkbox
  function renderItemCategoria({ item }: { item: Categoria }) {
    const selecionada = categoriasSelecionadas.includes(item.id);
    return (
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 5,
        }}
        onPress={() => toggleCategoria(item.id)}
      >
        <View
          style={{
            height: 24,
            width: 24,
            borderWidth: 1,
            borderColor: 'black',
            marginRight: 10,
            backgroundColor: selecionada ? 'green' : 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {selecionada && <Text style={{ color: 'white', fontWeight: 'bold' }}>✓</Text>}
        </View>
        <Text>{item.nome}</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.tituloTela}>Alteração de Produto</Text>

      <Text style={styles.titulo_campos}>Nome</Text>
      <TextInput
        style={styles.caixa_texto}
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.titulo_campos}>Código de Barras</Text>
      <TextInput
        style={[styles.caixa_texto, { width: '60%' }]}
        maxLength={14}
        value={codigoBarras}
        onChangeText={setCodigoBarras}
        keyboardType="numeric"
      />

      <Text style={styles.titulo_campos}>Preço</Text>
      <TextInput
        style={[styles.caixa_texto, { width: '40%' }]}
        maxLength={7}
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />

      <Text style={[styles.titulo_campos, { marginTop: 20 }]}>Categorias</Text>
      <FlatList
        data={categorias}
        keyExtractor={item => item.id}
        renderItem={renderItemCategoria}
        extraData={categoriasSelecionadas}
        style={{ maxHeight: 200, marginBottom: 20 }}
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

export default TelaAltProduto;
