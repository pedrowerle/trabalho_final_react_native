import React, { useState, useEffect } from 'react';
import { useGlobalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import axios, { AxiosError } from 'axios';

export default function ResponseScreen() {
  const { mood } = useGlobalSearchParams();
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(true);

  // Detecta o tema do sistema (claro ou escuro)
  const colorScheme = useColorScheme(); 

  useEffect(() => {
    // Verifica se foi preenchido a pergunta
    if (!mood) return; 

    const fetchResponse = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            model: 'llama3-8b-8192', // Modelo da API no GROQ
            messages: [
              {
                role: 'user',
                content: `Baseado no humor: "${mood}", sugira em português brasileiro, uma receita que corresponda com o humor dele.`,
              },
            ],
          },
          {
            headers: {
              // Como o GROQ é grátis foi deixado a chave da API aqui mesmo, não é uma boa prática mas será deletado a chave logo logo
              // sendo utilizada apenas para o trabalho
              'Authorization': `Bearer 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`,
              'Content-Type': 'application/json',
            },
          }
        );

        setResponse(res.data.choices[0].message.content.trim());
      } catch (error) {
        let errorMessage = 'Erro ao obter resposta da IA.';
        if (axios.isAxiosError(error)) {
          errorMessage = error.response
            ? `Erro: ${error.response.status} - ${error.response.data.message || 'Detalhes não disponíveis.'}`
            : 'Erro de conexão com a API.';
        } else if (error instanceof Error) {
          errorMessage = `Erro: ${error.message}`;
        }

        console.error('Erro capturado:', error);
        setResponse(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, [mood]);

  // Verifica se o tema é escuro
  const isDarkMode = colorScheme === 'dark'; 

  return (
    <View
      style={[
        styles.container,
        // Muda o fundo dependendo do tema
        { backgroundColor: isDarkMode ? '#000' : '#fff' }, 
      ]}
    >
      {loading ? (
        <ActivityIndicator size="large" color={isDarkMode ? '#fff' : '#000'} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text
            style={[
              styles.response,
              // Muda a cor do texto dependendo do tema
              { color: isDarkMode ? '#fff' : '#000' }, 
            ]}
          >
            {response}
          </Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  response: {
    fontSize: 18,
    textAlign: 'center',
  },
});
