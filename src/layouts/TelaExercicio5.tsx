// Removed duplicate import of Text
import { styles } from "../styles/styles";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Exe5props, Notasprops } from "../navigation/HomeNavigator";
import { useState } from "react";



const TelaExercicio5 = (props: Exe5props) => {
    const [text, setText] = useState(''); // Estado para armazenar o texto do campo de entrada

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', paddingHorizontal: 10 }}
                placeholder="Digite algo"
                value={text}
                onChangeText={setText} // Atualiza o estado com o texto digitado
            />
            <Pressable
                style={styles.botao}
                onPress={() => props.route.params.onClick && props.route.params.onClick(text)} // Chama a função passada como prop com o texto atual
            >
                <Text style={{ color: '#FFFFFF' }}>Clique</Text>
            </Pressable>
             <Pressable onPress={() => { props.navigation.goBack(); } }>
                    <Text style={[stylesLocal.botaoNav]}>Voltar</Text>
                </Pressable>
        </View>
    );
}

export default TelaExercicio5;


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