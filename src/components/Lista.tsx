import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { styles } from '../styles/styles';

type ListaProps = {
    listaPessoas: string[]
}   
const Lista = (props: ListaProps) => {
    const [pessoa, setPessoa] = useState('');
    const [lista, setLista] = useState(props.listaPessoas);
    const [fraseSelecionada, setFraseSelecionada] = useState('')

    const adicionarPessoa = () => {
        if (pessoa.trim() !== '') {
            setLista([...lista, pessoa]);
            setPessoa('');
        }
    };
    const selecionaFrase = (frase : string) => {
        setFraseSelecionada(frase);
    }

    return (
        <View style={[styles.tela, styles.margem]}>
            <TextInput
                style={styles.caixa_texto}
                value={pessoa}
                onChangeText={setPessoa}
                placeholder="Digite o nome"
            />
            <Button title="Adicionar" onPress={adicionarPessoa} />
            <FlatList
                data={lista}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.item}
                    onPress={() => selecionaFrase(item)}>{item}
                    
                    </Text>
                )}
            />
            <Text style ={[styles.titulo1]}>Nome: {fraseSelecionada}</Text>
        </View>
    );
};
export default Lista;