import { StyleSheet } from "react-native";

//o StyleSheet é a folha de estilo, equivalente ao css
const styles = StyleSheet.create({
    tela: {
        flex: 4, 
       backgroundColor: '#gray' 
    },
    margem: {
        margin: 10
    },
    item: {
        padding: 10,
        fontSize: 25,
        color: 'black',
        borderWidth: 2,
        borderColor: 'blue', 
        borderRadius: 10,
        margin: 5
    },
    tituloTela: {
      fontSize: 35, 
      textAlign: 'center',
      color: 'black' 
    },
    titulo1: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
        textAlign: 'center',
    },
    titulo2: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
    titulo3: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    botao: {
        justifyContent: 'center',
        alignItems:'center',
        width: 'auto',
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 10
    },
    botao_vermelho: {
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor: 'red',
      paddingVertical: 10,
      paddingHorizontal: 30,
      marginTop: 20,
      borderRadius: 10
    },
    texto_botao: {
        fontSize: 20,
        color: 'white'
    },
    titulo_campos: {
      fontSize: 20,
      color: 'black'
    },
    caixa_texto: {
        color: 'black',
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 10,
        margin: 3,
        backgroundColor: 'white',
    },

    largura_70: {
        width: '70%',
        marginLeft: 60,
    },

    imagem_200: {
        width: 100,
        height: 100,
        marginLeft: 150,
    },

    card:{
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 15,
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: 'white'
    },
    click: {
        opacity: 0.5
    },
    centralizar: {
    }
});

export {styles};