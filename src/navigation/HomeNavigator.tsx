import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaPrincipal from "../layouts/TelaPrincipal";
import TelaLista from "../layouts/TelaLista";
import TelaCadCliente from "../layouts/TelaCadCliente";
import TelaCadFuncionario from "../layouts/TelaCadFuncionario";
import TelaCadProduto from "../layouts/TelaCadProduto";
import TelaCadCategoria from "../layouts/TelaCadCategoria";
import TelaConsProduto from "../layouts/TelaConsProduto";

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

};

//Cria a Stack (tipo de navegação onde as telas estão em uma "pilha")
//com o RootStackParamList definindo as telas da stack
const Stack = createNativeStackNavigator<RootStackParamList>();

//Cria o navegador da pilha
const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TelaPrincipal" //nome da tela inicial
      screenOptions={{ headerShown: false }} //headerShown define se o cabeçalho irá ser exibido
    >

      {/* define uma te la dando um nome(igual ao RootStackParamList) e qual o componente será carregado */}
      <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} />
      <Stack.Screen name="TelaLista" component={TelaLista} />
      <Stack.Screen name="TelaCadCliente" component={TelaCadCliente} />
      <Stack.Screen name="TelaCadFuncionario" component={TelaCadFuncionario} />
      <Stack.Screen name="TelaCadProduto" component={TelaCadProduto} />
      <Stack.Screen name="TelaCadCategoria" component={TelaCadCategoria} />
      <Stack.Screen name="TelaConsProduto" component={TelaConsProduto} />


    </Stack.Navigator>
  );
}

//cria as propriedades da TelaPrincipal, que nesse caso é undefined
//essas propriedades são usadas lá em layouts/TelaPincipal.tsx
type PrincipalProps = NativeStackScreenProps<RootStackParamList,
  'TelaPrincipal'>;

  type Listaprops = NativeStackScreenProps<RootStackParamList,
  'TelaLista'>;

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


//exporta o navegador da pilha para ficar visível para outros arquivos    
export default HomeNavigator;

//exporta os tipos de dados para ficar visível para outros arquivos
export type {
  PrincipalProps,
  Listaprops,
  CadClienteProps,
  CadFuncionarioProps,
  CadProdutoProps,
  CadCategoriaProps,
  ConsProdutoProps,
  ConsClienteProps
};