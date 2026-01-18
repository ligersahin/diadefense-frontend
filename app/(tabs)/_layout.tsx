import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Theme } from '../../src/config/theme';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      initialRouteName="today"
      screenOptions={{
        tabBarActiveTintColor: Theme.primary,
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          backgroundColor: Theme.surface,
          borderTopWidth: 1,
          borderTopColor: Theme.border,
          height: 92,
          paddingTop: 12,
          paddingBottom: 20,
          elevation: 0,
          shadowOpacity: 0
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600'
        },
        tabBarItemStyle: {
          paddingHorizontal: 4,
          flex: 1
        },
        headerStyle: {
          backgroundColor: Theme.primary
        },
        headerTintColor: Theme.surface,
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => router.push('/settings')}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="settings-outline" size={24} color={Theme.surface} />
          </TouchableOpacity>
        )
      }}
    >
      <Tabs.Screen
        name="today"
        options={{
          title: 'Bugün',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="program"
        options={{
          title: 'Program',
          tabBarIcon: ({ color }) => (
            <Ionicons name="clipboard-outline" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="defense"
        options={{
          title: 'Savunma',
          tabBarIcon: ({ color }) => (
            <Ionicons name="shield-checkmark-outline" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="tracking"
        options={{
          title: 'Verilerim',
          tabBarIcon: ({ color }) => (
            <Ionicons name="pulse-outline" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: 'Eğitim',
          tabBarIcon: ({ color }) => (
            <Ionicons name="book-outline" size={24} color={color} />
          )
        }}
      />
    </Tabs>
  );
}
