import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDefenseProgram } from '../../src/context/DefenseProgramContext';
import { MonsterAnimation } from '../../src/components/MonsterAnimation';
import { DefiAnimation } from '../../src/components/DefiAnimation';
import { Card } from '../../src/components/Card';
import { useRouter } from 'expo-router';

export default function TodayScreen() {
  const {
    currentDayPlan,
    currentDayIndex,
    defenseScore,
    monsterState,
    defiMood,
    defiMessage,
    mealRatio,
    supplementRatio,
    waterRatio,
    activityRatio,
    sleepRatio,
    completedMeals,
    completedSupplements
  } = useDefenseProgram();

  const router = useRouter();

  if (!currentDayPlan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.title}>Program Başlatılmadı</Text>
          <Text style={styles.subtitle}>Ayarlar'dan programı başlatın</Text>
          <TouchableOpacity 
            style={styles.startButton}
            onPress={() => router.push('/settings')}
          >
            <Text style={styles.startButtonText}>Ayarlara Git</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const todayMeals = completedMeals[currentDayIndex] || [];
  const todaySupps = completedSupplements[currentDayIndex] || [];
  const totalMeals = currentDayPlan.meals.length;
  const totalSupps = currentDayPlan.supplements.length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.dayLabel}>Gün {currentDayIndex}</Text>
          <Text style={styles.dayTitle}>{currentDayPlan.label}</Text>
        </View>

        {/* Canavar ve Savunma Skoru */}
        <Card>
          <View style={styles.monsterSection}>
            <MonsterAnimation state={monsterState} size={180} />
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreLabel}>Savunma Gücü</Text>
              <Text style={[
                styles.scoreValue,
                { color: defenseScore >= 70 ? '#10B981' : defenseScore >= 40 ? '#F59E0B' : '#EF4444' }
              ]}>
                {Math.round(defenseScore)}
              </Text>
              <View style={styles.scoreBar}>
                <View style={[
                  styles.scoreBarFill,
                  { 
                    width: `${defenseScore}%`,
                    backgroundColor: defenseScore >= 70 ? '#10B981' : defenseScore >= 40 ? '#F59E0B' : '#EF4444'
                  }
                ]} />
              </View>
            </View>
          </View>
        </Card>

        {/* Defi Mesajı */}
        <Card style={styles.defiCard}>
          <View style={styles.defiSection}>
            <DefiAnimation mood={defiMood} size={120} />
            <View style={styles.speechBubble}>
              <Text style={styles.defiMessage}>{defiMessage}</Text>
            </View>
          </View>
        </Card>

        {/* Günlük Görevler */}
        <Text style={styles.sectionTitle}>Günlük Görevler</Text>

        {/* Menüler */}
        <TouchableOpacity 
          style={styles.taskCard}
          onPress={() => router.push('/menus')}
        >
          <View style={styles.taskIcon}>
            <Ionicons name="restaurant" size={28} color="#10B981" />
          </View>
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>Menüler</Text>
            <Text style={styles.taskSubtitle}>
              {todayMeals.length} / {totalMeals} öğün tamamlandı
            </Text>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressBarFill,
                { width: `${mealRatio * 100}%` }
              ]} />
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Supplementler */}
        <TouchableOpacity 
          style={styles.taskCard}
          onPress={() => router.push('/supplements')}
        >
          <View style={styles.taskIcon}>
            <Ionicons name="medical" size={28} color="#8B5CF6" />
          </View>
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>Supplementler</Text>
            <Text style={styles.taskSubtitle}>
              {todaySupps.length} / {totalSupps} alındı
            </Text>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressBarFill,
                { width: `${supplementRatio * 100}%`, backgroundColor: '#8B5CF6' }
              ]} />
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Su */}
        <TouchableOpacity 
          style={styles.taskCard}
          onPress={() => router.push('/(tabs)/tracking')}
        >
          <View style={styles.taskIcon}>
            <Ionicons name="water" size={28} color="#3B82F6" />
          </View>
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>Su İçme</Text>
            <Text style={styles.taskSubtitle}>
              {Math.round(waterRatio * 100)}% tamamlandı
            </Text>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressBarFill,
                { width: `${waterRatio * 100}%`, backgroundColor: '#3B82F6' }
              ]} />
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Spor/Aktivite */}
        <TouchableOpacity 
          style={styles.taskCard}
          onPress={() => router.push('/(tabs)/tracking')}
        >
          <View style={styles.taskIcon}>
            <Ionicons name="walk" size={28} color="#F59E0B" />
          </View>
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>Aktivite</Text>
            <Text style={styles.taskSubtitle}>
              {Math.round(activityRatio * 100)}% tamamlandı
            </Text>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressBarFill,
                { width: `${activityRatio * 100}%`, backgroundColor: '#F59E0B' }
              ]} />
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Uyku */}
        <TouchableOpacity 
          style={styles.taskCard}
          onPress={() => router.push('/(tabs)/tracking')}
        >
          <View style={styles.taskIcon}>
            <Ionicons name="moon" size={28} color="#6366F1" />
          </View>
          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>Uyku</Text>
            <Text style={styles.taskSubtitle}>
              {Math.round(sleepRatio * 100)}% tamamlandı
            </Text>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressBarFill,
                { width: `${sleepRatio * 100}%`, backgroundColor: '#6366F1' }
              ]} />
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>

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
  scrollView: {
    flex: 1
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32
  },
  header: {
    marginBottom: 16
  },
  dayLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  dayTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 4
  },
  monsterSection: {
    alignItems: 'center'
  },
  scoreContainer: {
    width: '100%',
    marginTop: 16,
    alignItems: 'center'
  },
  scoreLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 4
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8
  },
  scoreBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden'
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 6
  },
  defiCard: {
    backgroundColor: '#FEF3C7'
  },
  defiSection: {
    alignItems: 'center'
  },
  speechBubble: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%'
  },
  defiMessage: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24,
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 16
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  taskIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  taskContent: {
    flex: 1
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4
  },
  taskSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3
  },
  bottomSpacer: {
    height: 32
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24
  },
  startButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  }
});
