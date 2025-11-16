import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { DefiAnimation } from '../src/components/DefiAnimation';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Splash screen - 2 saniye sonra ana ekrana geç
    const timer = setTimeout(() => {
      router.replace('/(tabs)/today');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <DefiAnimation mood="happy" size={200} />
      <Text style={styles.title}>DiaDefense</Text>
      <Text style={styles.subtitle}>Diyabet Savunma Sistemi</Text>
      <ActivityIndicator size="large" color="#10B981" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center'
  },
  loader: {
    marginTop: 32
  }
});
