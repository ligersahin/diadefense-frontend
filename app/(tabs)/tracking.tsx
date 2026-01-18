import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDefenseProgram } from '../../src/context/DefenseProgramContext';
import { Card } from '../../src/components/Card';

export default function TrackingScreen() {
  const {
    currentDayIndex,
    defenseScore,
    monsterState,
    mealRatio,
    supplementRatio,
    completedMeals,
    completedSupplements,
    currentDayPlan
  } = useDefenseProgram();

  const todayMeals = completedMeals[currentDayIndex || 1] || [];
  const todaySupps = completedSupplements[currentDayIndex || 1] || [];
  const totalMeals = currentDayPlan?.meals?.filter((m: any) => m?.type !== "snack" && m?.slot !== "snack" && m?.label !== "Ara Öğün").length || 0;
  const totalSupps = currentDayPlan?.supplements?.length || 0;

  // Placeholder data for 7-day trend
  const trendData = [65, 72, 68, 75, 70, 78, defenseScore || 0];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Bugün Özeti */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Bugün Özeti</Text>
          
          <View style={styles.summaryRow}>
            <View style={styles.summaryLeft}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#10B981" />
              <Text style={styles.summaryLabel}>Savunma Durumu</Text>
            </View>
            <Text style={styles.summaryValue}>{defenseScore || 0}%</Text>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryLeft}>
              <Ionicons name="restaurant-outline" size={20} color="#10B981" />
              <Text style={styles.summaryLabel}>Öğünler</Text>
            </View>
            <Text style={styles.summaryValue}>{todayMeals.length} / {totalMeals}</Text>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryLeft}>
              <Ionicons name="medical-outline" size={20} color="#8B5CF6" />
              <Text style={styles.summaryLabel}>Supplementler</Text>
            </View>
            <Text style={styles.summaryValue}>{todaySupps.length} / {totalSupps}</Text>
          </View>
        </Card>

        {/* 7 Günlük Trend */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>7 Günlük Trend</Text>
          <View style={styles.chartContainer}>
            <View style={styles.chart}>
              {trendData.map((value, index) => {
                const height = Math.max(20, (value / 100) * 120);
                return (
                  <View key={index} style={styles.chartBarContainer}>
                    <View style={[styles.chartBar, { height }]} />
                    <Text style={styles.chartLabel}>{index + 1}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.chartAxis}>
              <Text style={styles.chartAxisLabel}>0%</Text>
              <Text style={styles.chartAxisLabel}>100%</Text>
            </View>
          </View>
        </Card>

        {/* Haftalık Özet */}
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Haftalık Özet</Text>
          <Text style={styles.insightText}>
            Bu hafta ortalama savunma skorunuz %{Math.round(trendData.reduce((a, b) => a + b, 0) / trendData.length)}.
          </Text>
          <Text style={styles.insightText}>
            {monsterState === 'weak' ? 'Canavar zayıf durumda. Programınıza devam edin!' : 
             monsterState === 'angry' ? 'Canavar güçleniyor. Daha dikkatli olun.' : 
             'Canavar kontrol altında. İyi gidiyorsunuz!'}
          </Text>
        </Card>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {
              // TODO: Navigate to meal history
            }}
          >
            <Ionicons name="restaurant" size={24} color="#10B981" />
            <Text style={styles.actionButtonText}>Öğün Geçmişi</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {
              // TODO: Navigate to monster history
            }}
          >
            <Ionicons name="shield" size={24} color="#EF4444" />
            <Text style={styles.actionButtonText}>Canavar Geçmişi</Text>
          </TouchableOpacity>
        </View>

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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  summaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  summaryLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 12
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937'
  },
  chartContainer: {
    marginTop: 8
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 140,
    marginBottom: 8
  },
  chartBarContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2
  },
  chartBar: {
    width: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
    marginBottom: 4,
    minHeight: 4
  },
  chartLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4
  },
  chartAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 4
  },
  chartAxisLabel: {
    fontSize: 11,
    color: '#9CA3AF'
  },
  insightText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 8
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8
  },
  bottomSpacer: {
    height: 32
  }
});
