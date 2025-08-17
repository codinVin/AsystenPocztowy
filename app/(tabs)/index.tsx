import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

// Nazwa komponentu może być dowolna, ale Expo Router oczekuje, że będzie to domyślny eksport.
export default function HomeScreen() {
  // Stan do przechowywania tekstu wyświetlanego na ekranie
  // Odpowiednik @State w SwiftUI
  const [statusText, setStatusText] = useState('Czekam na polecenie...');

  // Efekt, który uruchamia się tylko raz, gdy ekran się załaduje
  // Odpowiednik .onAppear w SwiftUI
  useEffect(() => {
    const greeting = "Dzień dobry! Co dzisiaj robimy?";
    
    // Używamy biblioteki expo-speech do wypowiedzenia tekstu
    Speech.speak(greeting, { language: 'pl-PL' }); // Używamy 'pl-PL' dla lepszej kompatybilności
  }, []); // Pusta tablica [] oznacza, że efekt uruchomi się tylko raz

  // Funkcja obsługująca naciśnięcie przycisku
  const handlePress = () => {
    setStatusText('Teraz bym Cię słuchał...');
    // Prosta symulacja resetowania statusu po 2 sekundach
    setTimeout(() => {
      setStatusText('Czekam na polecenie...');
    }, 2000);
  };

  // To jest to, co renderuje się na ekranie (odpowiednik funkcji render() w React lub body w SwiftUI)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{statusText}</Text>
        <Button 
          title="Naciśnij i mów" 
          onPress={handlePress} 
        />
      </View>
    </SafeAreaView>
  );
}

// Definicja stylów, odpowiednik CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
});