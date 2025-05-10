import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { styles } from '../styles/styles';

type ListaProps = {
    listaObjetos: string[]
}

const Lista = (props : ListaProps) =>{
    return (
        <FlatList
            data={props.listaObjetos}   
            renderItem={(itemLista) => {
                return (
                    <View>
                        <Text style={stylesLocal.item}>
                            Item: {itemLista.item}
                        </Text>
                    </View>
                )
            }}
            />
    )
}

type ObejtoProps={
    item: string   
}

const Objeto = (props: ObejtoProps) => {
    return (
        <View>
            <Text style={stylesLocal.item2}>
                {props.item}
            </Text>
        </View>
    );
}

export default Lista;

const stylesLocal = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 25,
        color: 'red',
        borderWidth: 2,
        borderColor: 'green', 
        borderRadius: 10,
        margin: 5
    },
    item2: {
        padding: 10,
        fontSize: 25,
        color: 'green',
        borderWidth: 2,
        borderColor: 'blue', 
        borderRadius: 10,
        margin: 5
    },
});

