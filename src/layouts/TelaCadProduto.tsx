import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { styles } from '../styles/styles';
import firestore from '@react-native-firebase/firestore';
import { CadProdutoProps } from '../navigation/HomeNavigator';
import { Produto } from '../types/Produto';

const TelaCadProduto = (props: CadProdutoProps) => {
  const [nome, setNome] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [preco, setPreco] = useState('');
  const [categorias, setCategorias] = useState<string[]>([]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('categorias')
      .onSnapshot(snapshot => {
        const lista = snapshot.docs.map(doc => doc.data().nome);
        setCategorias(lista);
      });

    return () => unsubscribe();
  }, []);

  function toggleCategoria(categoria: string) {
    setCategoriasSelecionadas((prev) =>
      prev.includes(categoria)
        ? prev.filter((c) => c !== categoria)
        : [...prev, categoria]
    );
  }

  function cadastrar() {
    if (verificaCampos()) {
      let produto = {
        nome,
        codigoBarras,
        preco: Number(preco),
        categorias: categoriasSelecionadas
      } as Produto;

      firestore()
        .collection('produtos')
        .add(produto)
        .then(() => {
          Alert.alert("Produto cadastrado com sucesso!");
          props.navigation.goBack();
        })
        .catch((error) => {
          Alert.alert("Erro", String(error));
        });
    }
  }

  function verificaCampos() {
    if (!nome) {
      Alert.alert('Nome em branco! Digite um nome!');
      return false;
    }
    if (!codigoBarras) {
      Alert.alert('Sem código de barras!');
      return false;
    }
    if (!preco) {
      Alert.alert('Não foi definido valor!');
      return false;
    }
    return true;
  }

  return (
    <View style={styles.tela}>
      <View style={[styles.centralizar, stylesLocal.fundo]}>
        <Text style={styles.titulo1}>Cadastro de Produtos</Text>
        <Image
          source={require('../images/produto.png')}
          style={styles.imagem_200}
        />

        <Text style={styles.titulo3}>Nome:</Text>
        <TextInput
          value={nome}
          style={[styles.caixa_texto, styles.largura_70]}
          placeholder='Nome'
          onChangeText={setNome}
        />
        <Text style={styles.titulo3}>Código de Barras:</Text>
        <TextInput
          value={codigoBarras}
          style={[styles.caixa_texto, styles.largura_70]}
          placeholder='Código de Barras'
          onChangeText={setCodigoBarras}
        />
        <Text style={styles.titulo3}>Preço:</Text>
        <TextInput
          value={preco}
          style={[styles.caixa_texto, styles.largura_70]}
          placeholder='Preço'
          keyboardType='numeric'
          onChangeText={setPreco}
        />

        <Text style={styles.titulo3}>Categorias:</Text>
        <View style={{ width: '70%' }}>
          {categorias.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => toggleCategoria(cat)}
              style={stylesLocal.categoriaItem}
            >
              <View style={[
                stylesLocal.checkbox,
                categoriasSelecionadas.includes(cat) && stylesLocal.checkboxSelecionado
              ]} />
              <Text style={{ color: 'white' }}>{cat}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={stylesLocal.botoes}>
        <Pressable style={stylesLocal.botaoCadastrar} onPress={cadastrar}>
          <Text style={[styles.titulo2, stylesLocal.textoCadastCanc]}>Cadastrar</Text>
        </Pressable>
        <Pressable style={stylesLocal.botaoCancelar} onPress={() => props.navigation.goBack()}>
          <Text style={[styles.titulo2, stylesLocal.textoCadastCanc]}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TelaCadProduto;

const stylesLocal = StyleSheet.create({
  tituloRadio: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 25,
  },
  textoCadastCanc: {
    color: 'white',
    fontSize: 25,
    marginTop: 5,
    width: 150,
    textAlign: 'center',
  },
  fundo: {
    backgroundColor: '#808080',
    paddingBottom: 20,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#808080',
    flex: 1,
    paddingTop: 20,
  },
  botaoCancelar: {
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  botaoCadastrar: {
    backgroundColor: 'green',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  categoriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  checkboxSelecionado: {
    backgroundColor: '#00cc00',
  }
});
