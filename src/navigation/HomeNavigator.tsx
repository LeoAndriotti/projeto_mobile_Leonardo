import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaPrincipal from "../layouts/TelaPrincipal";
import TelaCadCliente from "../layouts/TelaCadCliente";
import TelaCadFuncionario from "../layouts/TelaCadFuncionario";
import TelaCadProduto from "../layouts/TelaCadProduto";
import TelaCadCategoria from "../layouts/TelaCadCategoria";
import TelaConsProduto from "../layouts/TelaConsProduto";
import TelaConsFuncionario from "../layouts/TelaConsFuncionario";
import TelaConsCliente from "../layouts/TelaConsCliente";
import TelaConsCategoria from "../layouts/TelaConsCategoria";
import TelaAltProduto from "../layouts/TelaAltProduto";
import { Produto } from "../types/Produto";
import { Funcionario } from "../types/Funcionario";
import TelaAltFuncionario from "../layouts/TelaAltFuncionario";
import { Cliente } from "../types/Cliente";
import TelaAltCliente from "../layouts/TelaAltCliente";
import { Categoria } from "../types/Categorias";
import TelaAltCategoria from "../layouts/TelaAltCategoria";

//Define quais as telas e os parâmetros de cada tela
type RootStackParamList = {
  TelaPrincipal: undefined; 
  TelaLista:{listapessoas : string[]};
  TelaCadCliente: undefined;
  TelaCadFuncionario: undefined;
  TelaCadProduto: undefined;
  TelaCadCategoria: undefined;
  TelaConsProduto: undefined;
  TelaConsCliente: undefined;
  TelaConsFuncionario: undefined;
  TelaConsCategoria: undefined;
  TelaAltProduto: { produto: Produto }
  TelaAltFuncionario: { funcionario: Funcionario }
  TelaAltCliente: { cliente: Cliente }
  TelaAltCategoria: { categoria: Categoria }

};


const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TelaPrincipal" 
      screenOptions={{ headerShown: false }} 
    >

      {/* define uma te la dando um nome(igual ao RootStackParamList) e qual o componente será carregado */}
      <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} />
      <Stack.Screen name="TelaCadCliente" component={TelaCadCliente} />
      <Stack.Screen name="TelaCadFuncionario" component={TelaCadFuncionario} />
      <Stack.Screen name="TelaCadProduto" component={TelaCadProduto} />
      <Stack.Screen name="TelaCadCategoria" component={TelaCadCategoria} />
      <Stack.Screen name="TelaConsProduto" component={TelaConsProduto} />
      <Stack.Screen name="TelaConsFuncionario" component={TelaConsFuncionario} />
      <Stack.Screen name="TelaConsCliente" component={TelaConsCliente} />
      <Stack.Screen name="TelaConsCategoria" component={TelaConsCategoria} />
      <Stack.Screen name="TelaAltProduto" component={TelaAltProduto} />
      <Stack.Screen name="TelaAltFuncionario" component={TelaAltFuncionario} />
      <Stack.Screen name="TelaAltCliente" component={TelaAltCliente} />
      <Stack.Screen name="TelaAltCategoria" component={TelaAltCategoria} />

    </Stack.Navigator>
  );
}

//cria as propriedades da TelaPrincipal, que nesse caso é undefined
//essas propriedades são usadas lá em layouts/TelaPincipal.tsx
type PrincipalProps = NativeStackScreenProps<RootStackParamList,
  'TelaPrincipal'>;

   type CadClienteProps = NativeStackScreenProps<RootStackParamList,
  'TelaCadCliente'>;
  
   type CadFuncionarioProps = NativeStackScreenProps<RootStackParamList,
  'TelaCadFuncionario'>;

    type CadProdutoProps = NativeStackScreenProps<RootStackParamList,
  'TelaCadProduto'>;

  type CadCategoriaProps = NativeStackScreenProps<RootStackParamList,
  'TelaCadCategoria'>;

  type ConsProdutoProps = NativeStackScreenProps<RootStackParamList,
  'TelaConsProduto'>;

  type ConsClienteProps = NativeStackScreenProps<RootStackParamList,
  'TelaConsCliente'>;

  type ConsFuncionarioProps = NativeStackScreenProps<RootStackParamList,
  'TelaConsFuncionario'>;

  type ConsCategoriasProps = NativeStackScreenProps<RootStackParamList,
  'TelaConsCategoria'>;

  type AltProdutoProps = NativeStackScreenProps<RootStackParamList,
  'TelaAltProduto'>;

  type AltFuncionarioProps = NativeStackScreenProps<RootStackParamList,
  'TelaAltFuncionario'>;

  type AltClienteProps = NativeStackScreenProps<RootStackParamList,
  'TelaAltCliente'>;

  type AltCategoriaProps = NativeStackScreenProps<RootStackParamList,
  'TelaAltCategoria'>;

//exporta o navegador da pilha para ficar visível para outros arquivos    
export default HomeNavigator;

//exporta os tipos de dados para ficar visível para outros arquivos
export type {
  PrincipalProps,
  CadClienteProps,
  CadFuncionarioProps,
  CadProdutoProps,
  CadCategoriaProps,
  ConsProdutoProps,
  ConsClienteProps,
  ConsFuncionarioProps,
  ConsCategoriasProps,
  AltProdutoProps,
  AltFuncionarioProps,
  AltClienteProps,
  AltCategoriaProps
};