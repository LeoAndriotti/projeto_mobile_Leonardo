 <FlatList
             data={lista}
             keyExtractor={(item, index) => index.toString()}
             renderItem={({ item }) => {
                const grauRegex = /Grau:\s*(\d+)/;
                const match = item.match(grauRegex);
                const grauNum = match ? parseInt(match[1]) : 0;

                let estiloGrau = stylesLocal.grau; 
                if (grauNum === 1) estiloGrau = stylesLocal.grau1;
                else if (grauNum === 2) estiloGrau = stylesLocal.grau2;
                else if (grauNum === 3) estiloGrau = stylesLocal.grau3;
                else if (grauNum === 4) estiloGrau = stylesLocal.grau4;
                else if (grauNum >= 5) estiloGrau = stylesLocal.grau5;

                return (
                    <Text style={estiloGrau} onPress={() => ListarPacientes(item)}>
                        {item}
                    </Text>
                );
            }}
     />