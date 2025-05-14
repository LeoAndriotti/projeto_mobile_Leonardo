import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { styles } from "../styles/styles";
import { TextInput } from "react-native-paper";

type NotasProps = {
    nota1: number;
    nota2: number;
    nome: string;
}


const Notas = (props: NotasProps) => {
    function calcularMedia() {
        return (props.nota1 + props.nota2) / 2;
    }
    return (
        <View style={[styles.tela, stylesLocal.centralizar]}>
            <Text style={styles.titulo1}>Notas</Text>
            <Text style={styles.titulo2}>Nomes: {props.nome}</Text>
            <Text style={styles.titulo2}>Nota 1: {props.nota1}</Text>
            <Text style={styles.titulo2}>Nota 2: {props.nota2}</Text>
            <Text style={styles.titulo2}>Média: {calcularMedia()}</Text>
            {calcularMedia() >= 7 ?(
            <Text style={styles.titulo2}>Aprovado</Text>
            ) : (
                <Text style={styles.titulo2}>Reprovado</Text>
            )}
        </View>
    );
}

export default Notas;

const stylesLocal = StyleSheet.create({
    centralizar: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
