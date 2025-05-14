import { Text } from "react-native-paper";
import { NovaProps } from "../navigation/HomeNavigator";
import { styles } from "../styles/styles";
import { Pressable, StyleSheet, View } from "react-native";

const TelaNova = (props: NovaProps) => {
    return (
        <View style={[styles.tela, styles.centralizar]}>
        <Text style={styles.titulo1}>Tela Nova</Text>
        
                <Pressable onPress={() => { props.navigation.navigate('TelaPrincipal') }}>
                    <Text style={[styleLocal.botaoNav]}>Botao Navegar</Text>
                </Pressable>
            </View >
    )
}

export default TelaNova;

const styleLocal = StyleSheet.create({
    botaoNav: {
        color: "green"
    }
});