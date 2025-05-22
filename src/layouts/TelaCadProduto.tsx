import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
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
    setCategoriasSelecionadas(prev =>
      prev.includes(categoria)
        ? prev.filter(c => c !== categoria)
        : [...prev, categoria]
    );
  }

  function cadastrar() {
    if (verificaCampos()) {
      const produto = {
        nome,
        codigoBarras,
        preco: Number(preco),
        categorias: categoriasSelecionadas,
      } as Produto;

      firestore()
        .collection('produtos')
        .add(produto)
        .then(() => {
          Alert.alert('Produto cadastrado com sucesso!');
          props.navigation.goBack();
        })
        .catch(error => {
          Alert.alert('Erro', String(error));
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
    <View style={stylesLocal.fundo}>
      <View style={stylesLocal.container}>
        <Text style={stylesLocal.titulo}>Cadastro de Produtos</Text>
        <Image
          source={require('../images/produto.png')}
          style={stylesLocal.imagem}
        />

        <Text style={stylesLocal.label}>Nome:</Text>
        <TextInput
          value={nome}
          style={stylesLocal.caixaTexto}
          placeholder="Nome"
          onChangeText={setNome}
        />

        <Text style={stylesLocal.label}>Código de Barras:</Text>
        <TextInput
          value={codigoBarras}
          style={stylesLocal.caixaTexto}
          placeholder="Código de Barras"
          onChangeText={setCodigoBarras}
        />

        <Text style={stylesLocal.label}>Preço:</Text>
        <TextInput
          value={preco}
          style={stylesLocal.caixaTexto}
          placeholder="Preço"
          keyboardType="numeric"
          onChangeText={setPreco}
        />

        <Text style={stylesLocal.label}>Categorias:</Text>
        <View style={stylesLocal.categoriasContainer}>
          {categorias.map(cat => (
            <Pressable
              key={cat}
              onPress={() => toggleCategoria(cat)}
              style={stylesLocal.categoriaItem}
            >
              <View
                style={[
                  stylesLocal.checkbox,
                  categoriasSelecionadas.includes(cat) && stylesLocal.checkboxSelecionado,
                ]}
              />
              <Text style={stylesLocal.categoriaTexto}>{cat}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={stylesLocal.botoes}>
        <Pressable style={stylesLocal.botaoCadastrar} onPress={cadastrar}>
          <Text style={stylesLocal.textoBotao}>Cadastrar</Text>
        </Pressable>
        <Pressable style={stylesLocal.botaoCancelar} onPress={() => props.navigation.goBack()}>
          <Text style={stylesLocal.textoBotao}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TelaCadProduto;

const stylesLocal = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    marginBottom: 12,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  imagem: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    marginBottom: 4,
    color: '#333',
  },
  caixaTexto: {
    width: '100%',
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    fontSize: 13,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
  },
  categoriasContainer: {
    width: '100%',
    marginTop: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',           
    justifyContent: 'flex-start',
  },
  categoriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',              
    marginBottom: 8,
  },
  categoriaTexto: {
    fontSize: 12,
    color: '#000',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#555',
    marginRight: 8,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  checkboxSelecionado: {
    backgroundColor: '#2a9d8f',
    borderColor: '#2a9d8f',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  botaoCadastrar: {
    flex: 1,
    backgroundColor: '#2a9d8f',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 8,
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: '#e63946',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginLeft: 8,
  },
  textoBotao: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
