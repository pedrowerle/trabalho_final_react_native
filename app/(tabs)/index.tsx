import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [mood, setMood] = useState('');

  const handleSubmit = () => {
    router.push({
      pathname: '/response',
      params: { mood },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Como você está se sentindo hoje?</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite aqui..."
        value={mood}
        onChangeText={setMood}
      />
      <Button title="Gerar Sugestão" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 20 },
});
