import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../styles/styles";

type onPressBotao = {
    onClick: (text: string) => void;
}

const Exercicio5 = (props: onPressBotao) => {
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
                onPress={() => props.onClick && props.onClick(text)} // Chama a função passada como prop com o texto atual
            >
                <Text style={{ color: '#FFFFFF' }}>Clique</Text>
            </Pressable>
        </View>
    );
}

export default Exercicio5;