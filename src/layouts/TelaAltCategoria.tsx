import { useEffect, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Categoria } from "../types/Categorias";
import { AltCategoriaProps } from "../navigation/HomeNavigator";
import { styles } from "../styles/styles";

const TelaAltCategoria = ({ route, navigation }: AltCategoriaProps) => {
    const { categoria: categoriaParam } = route.params;

    const [id] = useState(categoriaParam.id);
    const [nome, setNome] = useState('');

    // Carrega os dados da categoria ao abrir a tela
    useEffect(() => {
        const carregar = async () => {
            try {
                const resultado = await firestore()
                    .collection('categorias')
                    .doc(id)
                    .get();

                const categoria = {
                    id: resultado.id,
                    ...resultado.data(),
                } as Categoria;

                setNome(categoria.nome);
            } catch (error) {
                Alert.alert('Erro ao carregar', 'Não foi possível carregar as informações da categoria.');
                console.error(error);
            }
        };

        carregar();
    }, [id]);

    const alterar = () => {
        if (!verificaCampos()) return;

        const categoriaAtualizada: Categoria = {
            id,
            nome,
        };

        firestore()
            .collection('categorias')
            .doc(id)
            .update(categoriaAtualizada)
            .then(() => {
                Alert.alert("Sucesso", "Categoria atualizada com sucesso!");
                navigation.goBack();
            })
            .catch((error) => {
                Alert.alert('Erro ao salvar', 'Ocorreu um problema ao tentar salvar as alterações.');
                console.error(error);
            });
    };

    const verificaCampos = () => {
        if (!nome.trim()) {
            Alert.alert("Campo obrigatório", "Por favor, preencha o nome da categoria.");
            return false;
        }
        return true;
    };

    return (
        <View style={styles.tela}>
            <Text style={styles.tituloTela}>Editar Categoria</Text>

            <Text style={styles.titulo_campos}>Nome da Categoria</Text>
            <TextInput
                style={styles.caixa_texto}
                placeholder="Digite o novo nome"
                value={nome}
                onChangeText={setNome}
            />

            <View style={styles.centralizar}>
                <Pressable style={styles.botao} onPress={alterar}>
                    <Text style={styles.texto_botao}>Salvar Alterações</Text>
                </Pressable>

                <Pressable style={styles.botao_vermelho} onPress={() => navigation.goBack()}>
                    <Text style={styles.texto_botao}>Cancelar</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default TelaAltCategoria;
