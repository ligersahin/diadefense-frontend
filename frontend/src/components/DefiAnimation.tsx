import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { DefiMood } from '../types';

type Props = {
  mood: DefiMood;
  size?: number;
};

const ANIMATION_FILES = {
  idle: require('../../assets/animations/defi_idle.json'),
  happy: require('../../assets/animations/defi_happy.json'),
  concerned: require('../../assets/animations/defi_concerned.json'),
  warning: require('../../assets/animations/defi_warning.json')
};

export function DefiAnimation({ mood, size = 150 }: Props) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <LottieView
        source={ANIMATION_FILES[mood]}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  animation: {
    width: '100%',
    height: '100%'
  }
});
