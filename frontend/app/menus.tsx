import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useDefenseProgram } from '../src/context/DefenseProgramContext';
import { Card } from '../src/components/Card';
import { MealSlot, DayPlan } from '../src/types';
import { getCurrentProgramDay } from '../src/utils/programDay';

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
    program,
    currentDayPlan, 
    currentDayIndex,
    startISO,
    completedMeals, 
    markMealCompleted 
  } = useDefenseProgram();

  if (!currentDayPlan || !program || program.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.emptyText}>Program başlatılmadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Calculate current program day using the utility function
  const currentDay = getCurrentProgramDay(startISO);
  
  // Get today's program day plan (find by dayIndex matching currentDay)
  const todayDayPlan = program.find(day => day.dayIndex === currentDay) || currentDayPlan;
  const todayDayIndex = currentDay;
  
  // Split program into today's day and other days
  const otherDays = program.filter(day => day.dayIndex !== currentDay);

  const handleToggleMeal = (dayIndex: number, slot: MealSlot) => {
    const dayMeals = completedMeals[dayIndex] || [];
    if (!dayMeals.includes(slot)) {
      markMealCompleted(dayIndex, slot);
    }
  };

  // Reusable function to render meals for a given day
  const renderMealsForDay = (dayPlan: DayPlan, dayIndex: number, showCheckbox: boolean = false) => {
    const dayMeals = completedMeals[dayIndex] || [];
    
    return dayPlan.meals.map((meal, index) => {
      const isCompleted = dayMeals.includes(meal.slot);
      
      return (
        <Card key={`${dayIndex}-${index}`}>
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
              {showCheckbox && (
                <TouchableOpacity
                  style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}
                  onPress={() => handleToggleMeal(dayIndex, meal.slot)}
                >
                  {isCompleted && (
                    <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              )}
            </View>
            
            {meal.description && (
              <Text style={styles.mealDescription}>{meal.description}</Text>
            )}
          </View>
        </Card>
      );
    });
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
          <Text style={styles.headerSubtitle}>Gün {currentDay}</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Bugünün Menüsü - Today's Meal Plan */}
        <Text style={styles.sectionTitle}>Bugünün Menüsü</Text>
        {renderMealsForDay(todayDayPlan, todayDayIndex, true)}

        {/* Diğer Günler - Other Days */}
        {otherDays.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, styles.otherDaysTitle]}>Diğer Günler</Text>
            {otherDays.map((dayPlan) => (
              <View key={dayPlan.dayIndex} style={styles.daySection}>
                <Text style={styles.dayLabel}>{dayPlan.label}</Text>
                {renderMealsForDay(dayPlan, dayPlan.dayIndex, false)}
              </View>
            ))}
          </>
        )}

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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 16
  },
  otherDaysTitle: {
    marginTop: 32
  },
  daySection: {
    marginBottom: 24
  },
  dayLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5
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
