import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  // Estado para armazenar o texto inserido pelo usuário no response verifica se foi preenchido o mood
  const [mood, setMood] = useState('');

  // Hook para navegação entre telas.
  const router = useRouter(); 

  // Detecta o tema do sistema (claro ou escuro)
  const colorScheme = useColorScheme(); 

  // Função para validar e navegar para a próxima tela com o humor como parâmetro.
  const handleGenerateResponse = () => {
    if (mood.trim() === '') { 
      alert('Por favor, insira um humor antes de continuar.'); 
      return; 
    }

    // Navega para a tela "response" com o parâmetro "mood".
    router.push({ pathname: '/response', params: { mood } });
  };

  // Verifica se o tema é escuro
  const isDarkMode = colorScheme === 'dark'; 

  return (
    <View
      style={[
        // Define o layout básico.
        styles.container, 
        // cor do fundo baseado no tema
        { backgroundColor: isDarkMode ? '#000' : '#fff' }, 
      ]}
    >
      <TextInput
        style={[
          styles.input, 
          {
            // ajustes de layout baseado no tema
            backgroundColor: isDarkMode ? '#333' : '#fff', 
            color: isDarkMode ? '#fff' : '#000', 
            borderColor: isDarkMode ? '#555' : '#ccc', 
          },
        ]}
        placeholder="Digite o seu humor e veja qual receita combina..." 
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        // Vincula o valor do campo ao estado.
        value={mood} 
        onChangeText={setMood} 
      />
      <Button title="Gerar Receita" onPress={handleGenerateResponse} />
    </View>
  );
}

// Estilos básicos da tela e elementos
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
  },
  input: {
    width: '100%', 
    height: 50, 
    borderWidth: 1, 
    borderRadius: 8,
    paddingHorizontal: 10, 
    marginBottom: 20, 
    fontSize: 16,
  },
});
