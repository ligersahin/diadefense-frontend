import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDefenseProgram } from '../../src/context/DefenseProgramContext';
import { Card } from '../../src/components/Card';

export default function TrackingScreen() {
  const {
    waterIntakeLiters,
    activityScore,
    sleepHours,
    bloodValues,
    currentDayPlan,
    addWater,
    setActivityScore,
    setSleepHours,
    setBloodValues
  } = useDefenseProgram();

  const [showWaterInput, setShowWaterInput] = useState(false);
  const [showActivityInput, setShowActivityInput] = useState(false);
  const [showSleepInput, setShowSleepInput] = useState(false);
  const [showBloodInput, setShowBloodInput] = useState(false);

  const [waterAmount, setWaterAmount] = useState('0.25');
  const [activityValue, setActivityValue] = useState(activityScore.toString());
  const [sleepValue, setSleepValue] = useState(sleepHours.toString());
  const [glucoseValue, setGlucoseValue] = useState('');
  const [systolicValue, setSystolicValue] = useState('');
  const [diastolicValue, setDiastolicValue] = useState('');

  const handleAddWater = () => {
    const amount = parseFloat(waterAmount) || 0;
    if (amount > 0 && amount <= 1) {
      addWater(amount);
      setShowWaterInput(false);
      setWaterAmount('0.25');
    } else {
      Alert.alert('Hata', 'Lütfen 0.1 ile 1 litre arasında bir değer girin');
    }
  };

  const handleSetActivity = () => {
    const value = parseInt(activityValue) || 0;
    if (value >= 0 && value <= 100) {
      setActivityScore(value);
      setShowActivityInput(false);
    } else {
      Alert.alert('Hata', 'Lütfen 0-100 arasında bir değer girin');
    }
  };

  const handleSetSleep = () => {
    const value = parseFloat(sleepValue) || 0;
    if (value >= 0 && value <= 24) {
      setSleepHours(value);
      setShowSleepInput(false);
    } else {
      Alert.alert('Hata', 'Lütfen 0-24 saat arasında bir değer girin');
    }
  };

  const handleSetBlood = () => {
    const glucose = parseFloat(glucoseValue) || undefined;
    const systolic = parseFloat(systolicValue) || undefined;
    const diastolic = parseFloat(diastolicValue) || undefined;

    setBloodValues({
      lastGlucose: glucose,
      lastBloodPressureSystolic: systolic,
      lastBloodPressureDiastolic: diastolic
    });

    setShowBloodInput(false);
    setGlucoseValue('');
    setSystolicValue('');
    setDiastolicValue('');
    Alert.alert('Başarılı', 'Kan değerleri kaydedildi');
  };

  const targetWater = currentDayPlan?.defenseTargets.waterLiters || 2.5;
  const waterPercentage = Math.min((waterIntakeLiters / targetWater) * 100, 100);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>İzleme</Text>
          <Text style={styles.subtitle}>Günlük sağlık verileriniz</Text>
        </View>

        {/* Su İçme */}
        <Card>
          <View style={styles.trackingHeader}>
            <View style={styles.trackingTitle}>
              <View style={[styles.iconContainer, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="water" size={24} color="#3B82F6" />
              </View>
              <View>
                <Text style={styles.trackingName}>Su İçme</Text>
                <Text style={styles.trackingValue}>
                  {waterIntakeLiters.toFixed(2)} / {targetWater} L
                </Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowWaterInput(!showWaterInput)}
            >
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.progressBar}>
            <View style={[
              styles.progressBarFill,
              { width: `${waterPercentage}%`, backgroundColor: '#3B82F6' }
            ]} />
          </View>

          {showWaterInput && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={waterAmount}
                onChangeText={setWaterAmount}
                keyboardType="decimal-pad"
                placeholder="Litre (0.25)"
              />
              <TouchableOpacity style={styles.submitButton} onPress={handleAddWater}>
                <Text style={styles.submitButtonText}>Ekle</Text>
              </TouchableOpacity>
            </View>
          )}
        </Card>

        {/* Aktivite */}
        <Card>
          <View style={styles.trackingHeader}>
            <View style={styles.trackingTitle}>
              <View style={[styles.iconContainer, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="walk" size={24} color="#F59E0B" />
              </View>
              <View>
                <Text style={styles.trackingName}>Aktivite Skoru</Text>
                <Text style={styles.trackingValue}>{activityScore}%</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowActivityInput(!showActivityInput)}
            >
              <Ionicons name="create" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.progressBar}>
            <View style={[
              styles.progressBarFill,
              { width: `${activityScore}%`, backgroundColor: '#F59E0B' }
            ]} />
          </View>

          {showActivityInput && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={activityValue}
                onChangeText={setActivityValue}
                keyboardType="number-pad"
                placeholder="Skor (0-100)"
              />
              <TouchableOpacity style={styles.submitButton} onPress={handleSetActivity}>
                <Text style={styles.submitButtonText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.helpText}>
            Adım sayısı, egzersiz süresi veya genel aktivite durumunuzu 0-100 arasında değerlendirin.
          </Text>
        </Card>

        {/* Uyku */}
        <Card>
          <View style={styles.trackingHeader}>
            <View style={styles.trackingTitle}>
              <View style={[styles.iconContainer, { backgroundColor: '#EDE9FE' }]}>
                <Ionicons name="moon" size={24} color="#6366F1" />
              </View>
              <View>
                <Text style={styles.trackingName}>Uyku</Text>
                <Text style={styles.trackingValue}>
                  {sleepHours} / {currentDayPlan?.defenseTargets.sleepHours || 7} saat
                </Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowSleepInput(!showSleepInput)}
            >
              <Ionicons name="create" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {showSleepInput && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={sleepValue}
                onChangeText={setSleepValue}
                keyboardType="decimal-pad"
                placeholder="Saat (7.5)"
              />
              <TouchableOpacity style={styles.submitButton} onPress={handleSetSleep}>
                <Text style={styles.submitButtonText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          )}
        </Card>

        {/* Kan Değerleri */}
        <Card>
          <View style={styles.trackingHeader}>
            <View style={styles.trackingTitle}>
              <View style={[styles.iconContainer, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="fitness" size={24} color="#EF4444" />
              </View>
              <View>
                <Text style={styles.trackingName}>Kan Değerleri</Text>
                <Text style={styles.trackingValue}>
                  {bloodValues.lastGlucose ? `${bloodValues.lastGlucose} mg/dL` : 'Henüz girilmedi'}
                </Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowBloodInput(!showBloodInput)}
            >
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {showBloodInput && (
            <View style={styles.bloodInputContainer}>
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Kan Şekeri (mg/dL)</Text>
                <TextInput
                  style={styles.smallInput}
                  value={glucoseValue}
                  onChangeText={setGlucoseValue}
                  keyboardType="number-pad"
                  placeholder="100"
                />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Tansiyon (Sistolik)</Text>
                <TextInput
                  style={styles.smallInput}
                  value={systolicValue}
                  onChangeText={setSystolicValue}
                  keyboardType="number-pad"
                  placeholder="120"
                />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Tansiyon (Diyastolik)</Text>
                <TextInput
                  style={styles.smallInput}
                  value={diastolicValue}
                  onChangeText={setDiastolicValue}
                  keyboardType="number-pad"
                  placeholder="80"
                />
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={handleSetBlood}>
                <Text style={styles.submitButtonText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          )}

          {bloodValues.lastGlucose && (
            <View style={styles.bloodValuesDisplay}>
              <Text style={styles.bloodValueText}>
                Kan Şekeri: {bloodValues.lastGlucose} mg/dL
              </Text>
              {bloodValues.lastBloodPressureSystolic && bloodValues.lastBloodPressureDiastolic && (
                <Text style={styles.bloodValueText}>
                  Tansiyon: {bloodValues.lastBloodPressureSystolic}/{bloodValues.lastBloodPressureDiastolic} mmHg
                </Text>
              )}
            </View>
          )}
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
  trackingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  trackingTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  trackingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4
  },
  trackingValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937'
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF'
  },
  submitButton: {
    height: 48,
    paddingHorizontal: 24,
    backgroundColor: '#10B981',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  helpText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 12,
    lineHeight: 16
  },
  bloodInputContainer: {
    marginTop: 16
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  inputLabel: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1
  },
  smallInput: {
    width: 120,
    height: 40,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF'
  },
  bloodValuesDisplay: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8
  },
  bloodValueText: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4
  },
  bottomSpacer: {
    height: 32
  }
});
