import { Text } from "react-native-paper";
import { styles } from "../styles/styles";
import { Pressable, StyleSheet, View } from "react-native";
import { Notasprops } from "../navigation/HomeNavigator";




const TelaNotas = (props: Notasprops) => {
    function calcularMedia() {
        return (props.route.params.nota1 + props.route.params.nota2) / 2;
    }
    return (
        <><View style={[styles.tela, stylesLocal.centralizar]}>
            <Text style={styles.titulo1}>Notas</Text>
            <Text style={styles.titulo2}>Nomes: {props.route.params.nome}</Text>
            <Text style={styles.titulo2}>Nota 1: {props.route.params.nota1}</Text>
            <Text style={styles.titulo2}>Nota 2: {props.route.params.nota2}</Text>
            <Text style={styles.titulo2}>Média: {calcularMedia()}</Text>
            {calcularMedia() >= 7 ? (
                <Text style={styles.titulo2}>Aprovado</Text>
            ) : (
                <Text style={styles.titulo2}>Reprovado</Text>
            )}
        </View>
        <View>
                <Pressable onPress={() => { props.navigation.goBack(); } }>
                    <Text style={[stylesLocal.botaoNav]}>Voltar</Text>
                </Pressable>
            </View></>
        
    );
}

export default TelaNotas;

const stylesLocal = StyleSheet.create({
    centralizar: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoNav: {
        color: "white",
        justifyContent: 'center',
        alignItems:'center',
        width: 'auto',
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 10,
        textAlign: 'center'
    }

});