import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDefenseProgram } from '../../src/context/DefenseProgramContext';
import { MonsterAnimation } from '../../src/components/MonsterAnimation';
import { DefiAnimation } from '../../src/components/DefiAnimation';
import { Card } from '../../src/components/Card';
import { ProgressCircle } from '../../src/components/ProgressCircle';

export default function DefensePanelScreen() {
  const {
    defenseScore,
    monsterState,
    defiMood,
    defiMessage,
    mealRatio,
    supplementRatio,
    waterRatio,
    activityRatio,
    sleepRatio,
    currentDayIndex
  } = useDefenseProgram();

  const getScoreColor = (score: number) => {
    if (score >= 70) return '#10B981';
    if (score >= 40) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Savunma Paneli</Text>
          <Text style={styles.subtitle}>Gün {currentDayIndex} - Savunma Durumu</Text>
        </View>

        {/* Ana Skor Kartı */}
        <Card style={styles.mainScoreCard}>
          <Text style={styles.mainScoreLabel}>Savunma Gücü</Text>
          <Text style={[
            styles.mainScoreValue,
            { color: getScoreColor(defenseScore) }
          ]}>
            {Math.round(defenseScore)}
          </Text>
          <View style={styles.scoreBar}>
            <View style={[
              styles.scoreBarFill,
              { 
                width: `${defenseScore}%`,
                backgroundColor: getScoreColor(defenseScore)
              }
            ]} />
          </View>
          
          <View style={styles.monsterContainer}>
            <MonsterAnimation state={monsterState} size={120} />
          </View>
        </Card>

        {/* Savunma Oranları */}
        <Text style={styles.sectionTitle}>Savunma Oranları</Text>
        
        <View style={styles.ratiosContainer}>
          <View style={styles.ratioCard}>
            <ProgressCircle 
              progress={mealRatio} 
              size={80} 
              strokeWidth={6}
              color="#10B981"
            />
            <Text style={styles.ratioLabel}>Öğünler</Text>
          </View>

          <View style={styles.ratioCard}>
            <ProgressCircle 
              progress={supplementRatio} 
              size={80} 
              strokeWidth={6}
              color="#8B5CF6"
            />
            <Text style={styles.ratioLabel}>Supplement</Text>
          </View>

          <View style={styles.ratioCard}>
            <ProgressCircle 
              progress={waterRatio} 
              size={80} 
              strokeWidth={6}
              color="#3B82F6"
            />
            <Text style={styles.ratioLabel}>Su</Text>
          </View>
        </View>

        <View style={styles.ratiosContainer}>
          <View style={styles.ratioCard}>
            <ProgressCircle 
              progress={activityRatio} 
              size={80} 
              strokeWidth={6}
              color="#F59E0B"
            />
            <Text style={styles.ratioLabel}>Aktivite</Text>
          </View>

          <View style={styles.ratioCard}>
            <ProgressCircle 
              progress={sleepRatio} 
              size={80} 
              strokeWidth={6}
              color="#6366F1"
            />
            <Text style={styles.ratioLabel}>Uyku</Text>
          </View>

          <View style={styles.ratioCard} />
        </View>

        {/* Defi Yorumu */}
        <Card style={styles.defiCard}>
          <View style={styles.defiHeader}>
            <DefiAnimation mood={defiMood} size={80} />
            <Text style={styles.defiTitle}>Defi'nin Yorumu</Text>
          </View>
          <View style={styles.speechBubble}>
            <Text style={styles.defiMessage}>{defiMessage}</Text>
          </View>
        </Card>

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
    padding: 16
  },
  header: {
    marginBottom: 16
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280'
  },
  mainScoreCard: {
    alignItems: 'center',
    paddingVertical: 24
  },
  mainScoreLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 8
  },
  mainScoreValue: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 16
  },
  scoreBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 24
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 6
  },
  monsterContainer: {
    marginTop: 8
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 16
  },
  ratiosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  ratioCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  ratioLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center'
  },
  defiCard: {
    backgroundColor: '#FEF3C7'
  },
  defiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  defiTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12
  },
  speechBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16
  },
  defiMessage: {
    fontSize: 15,
    color: '#1F2937',
    lineHeight: 22
  },
  bottomSpacer: {
    height: 32
  }
});
