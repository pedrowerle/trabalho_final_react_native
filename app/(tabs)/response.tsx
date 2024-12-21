import React, { useState, useEffect } from 'react';
import { useGlobalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ResponseScreen() {
  const { mood } = useGlobalSearchParams();
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const res = await axios.post(
          'https://api.openai.com/v1/completions',
          {
            prompt: `Baseado no humor: "${mood}", sugira uma música ou mensagem motivacional.`,
            max_tokens: 50,
            model: 'text-davinci-003',
          },
          {
            headers: {
              'Authorization': `Bearer YOUR_API_KEY`,
              'Content-Type': 'application/json',
            },
          }
        );

        setResponse(res.data.choices[0].text.trim());
      } catch (error) {
        setResponse('Erro ao obter resposta da IA.');
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, [mood]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.response}>{response}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  response: { fontSize: 18, textAlign: 'center', marginTop: 20 },
});
