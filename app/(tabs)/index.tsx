import Voice from '@react-native-voice/voice';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [statusText, setStatusText] = useState('Naciśnij przycisk i mów');
  const [recognizedText, setRecognizedText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');

  // --- Funkcje obsługujące zdarzenia z biblioteki Voice ---
  const onSpeechStart = (e: any) => {
    console.log('Rozpoczęto nasłuchiwanie...', e);
    setStatusText('Słucham...');
    setIsListening(true);
  };

  const onSpeechEnd = (e: any) => {
    console.log('Zakończono nasłuchiwanie.', e);
    setStatusText('Naciśnij przycisk i mów');
    setIsListening(false);
  };

  const onSpeechError = (e: any) => {
    console.log('Błąd rozpoznawania mowy!', e);
    setError(JSON.stringify(e.error));
    setIsListening(false);
  };

  const onSpeechResults = (e: any) => {
    console.log('Otrzymano wyniki:', e);
    if (e.value && e.value.length > 0) {
      setRecognizedText(e.value[0]);
    }
  };
  // ---------------------------------------------------------

  useEffect(() => {
    // Ustawienie nasłuchiwania na zdarzenia z biblioteki Voice
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    // Powitanie głosowe przy starcie
    const greeting = "Dzień dobry! Co dzisiaj robimy?";
    Speech.speak(greeting, { language: 'pl-PL' });

    // Funkcja czyszcząca - usuwa nasłuchiwacze, gdy komponent jest niszczony
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    // Resetujemy stany przed rozpoczęciem
    setRecognizedText('');
    setError('');
    try {
      await Voice.start('pl-PL'); // Rozpocznij nasłuchiwanie w języku polskim
    } catch (e) {
      console.error('Błąd podczas startu nasłuchiwania', e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error('Błąd podczas zatrzymywania nasłuchiwania', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{statusText}</Text>
        
        {isListening && <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 20 }} />}
        
        <Text style={styles.recognizedText}>{recognizedText}</Text>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button 
          title={isListening ? "Zatrzymaj słuchanie" : "Naciśnij i mów"} 
          onPress={isListening ? stopListening : startListening}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  recognizedText: { fontSize: 18, marginVertical: 20, color: '#333', textAlign: 'center' },
  errorText: { color: 'red', marginBottom: 20, textAlign: 'center' },
});