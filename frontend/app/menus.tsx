import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useDefenseProgram } from '../src/context/DefenseProgramContext';
import { Card } from '../src/components/Card';
import { MealSlot } from '../src/types';

const MEAL_ICONS: Record<MealSlot, string> = {
  breakfast: 'sunny',
  snack: 'cafe',
  lunch: 'restaurant',
  dinner: 'moon'
};

const MEAL_NAMES: Record<MealSlot, string> = {
  breakfast: 'Kahvaltı',
  snack: 'Ara Öğün',
  lunch: 'Öğle Yemeği',
  dinner: 'Akşam Yemeği'
};

export default function MenusScreen() {
  const router = useRouter();
  const { 
    currentDayPlan, 
    currentDayIndex, 
    completedMeals, 
    markMealCompleted 
  } = useDefenseProgram();

  if (!currentDayPlan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.emptyText}>Program başlatılmadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  const todayMeals = completedMeals[currentDayIndex] || [];

  const handleToggleMeal = (slot: MealSlot) => {
    if (!todayMeals.includes(slot)) {
      markMealCompleted(currentDayIndex, slot);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Menüler</Text>
          <Text style={styles.headerSubtitle}>Gün {currentDayIndex}</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {currentDayPlan.meals.map((meal, index) => {
          const isCompleted = todayMeals.includes(meal.slot);
          
          return (
            <Card key={index}>
              <View style={styles.mealCard}>
                <View style={styles.mealHeader}>
                  <View style={styles.mealTitleContainer}>
                    <View style={[styles.mealIcon, isCompleted && styles.mealIconCompleted]}>
                      <Ionicons 
                        name={MEAL_ICONS[meal.slot] as any} 
                        size={24} 
                        color={isCompleted ? '#10B981' : '#6B7280'} 
                      />
                    </View>
                    <View>
                      <Text style={styles.mealSlotName}>{MEAL_NAMES[meal.slot]}</Text>
                      <Text style={styles.mealTitle}>{meal.title}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}
                    onPress={() => handleToggleMeal(meal.slot)}
                  >
                    {isCompleted && (
                      <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                    )}
                  </TouchableOpacity>
                </View>
                
                {meal.description && (
                  <Text style={styles.mealDescription}>{meal.description}</Text>
                )}
              </View>
            </Card>
          );
        })}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  headerContent: {
    flex: 1
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937'
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    padding: 16
  },
  mealCard: {
    width: '100%'
  },
  mealHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  mealTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  mealIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  mealIconCompleted: {
    backgroundColor: '#D1FAE5'
  },
  mealSlotName: {
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600'
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 2
  },
  mealDescription: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981'
  },
  bottomSpacer: {
    height: 32
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280'
  }
});
