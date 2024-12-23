import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/HapticTab'; // Componente customizado para tabs com feedback tátil.
import { IconSymbol } from '@/components/ui/IconSymbol'; // Componente para renderizar ícones na tab bar.
import TabBarBackground from '@/components/ui/TabBarBackground'; // Componente para o fundo customizado da tab bar.
import { Colors } from '@/constants/Colors'; // Constantes de cores para temas.
import { useColorScheme } from '@/hooks/useColorScheme'; // Hook para detectar o esquema de cores do sistema (claro/escuro).

export default function TabLayout() {
  // Detecta o tema do sistema (claro ou escuro)
  const colorScheme = useColorScheme(); 

  return (
    <Tabs
      // Opções de estilização e confiugração das tela
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint, // Define a cor ativa com base no tema.
        headerShown: false, // Remove o cabeçalho padrão das telas.
        tabBarButton: HapticTab, // Adiciona feedback tátil aos botões da tab bar.
        tabBarBackground: TabBarBackground, // Aplica o fundo customizado à tab bar.
        tabBarStyle: Platform.select({
          ios: {
            // Em iOS, posiciona a tab bar de forma flutuante.
            position: 'absolute', 
          },
          // Em outras plataformas, usa o estilo padrão.
          default: {}, 
        }),
      }}
    >
      
      // CONFIGURAÇÕES DOS BOTÕES INFERIORES DA TELA

      <Tabs.Screen
        name="index"
        options={{
          title: 'Início', 
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="response"
        options={{
          title: 'Receita', 
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="book.fill" color={color} />
          ), 
        }}
      />
    </Tabs>
  );
}
