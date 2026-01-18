import React from 'react';
import { Stack } from 'expo-router';
import { DefenseProgramProvider } from '../src/context/DefenseProgramContext';

export default function RootLayout() {
  return (
    <DefenseProgramProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </DefenseProgramProvider>
  );
}
