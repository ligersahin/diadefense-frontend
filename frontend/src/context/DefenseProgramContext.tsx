import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInDays, parseISO } from 'date-fns';
import { DayPlan, MealSlot, BloodValues, MonsterState, DefiMood, UserProgress } from '../types';
import { TR_PROGRAM } from '../config/program/tr-program';
import { getDefiMessage, getMonsterState } from '../logic/defiMessages';

type DefenseProgramContextType = {
  // Program data
  program: DayPlan[];
  startISO: string | null;
  currentDayIndex: number;
  currentDayPlan: DayPlan | null;
  
  // User progress
  completedMeals: Record<number, MealSlot[]>;
  completedSupplements: Record<number, string[]>;
  waterIntakeLiters: number;
  activityScore: number;
  sleepHours: number;
  bloodValues: BloodValues;
  
  // Calculated values
  mealRatio: number;
  supplementRatio: number;
  waterRatio: number;
  activityRatio: number;
  sleepRatio: number;
  bloodModifier: number;
  defenseScore: number;
  monsterState: MonsterState;
  defiMood: DefiMood;
  defiMessage: string;
  
  // Actions
  setStartISO: (dateString: string) => void;
  markMealCompleted: (dayIndex: number, slot: MealSlot) => void;
  markSupplementTaken: (dayIndex: number, id: string) => void;
  addWater: (liters: number) => void;
  setWater: (liters: number) => void;
  setActivityScore: (value: number) => void;
  setSleepHours: (value: number) => void;
  setBloodValues: (values: BloodValues) => void;
  resetDailyProgress: () => void;
};

const DefenseProgramContext = createContext<DefenseProgramContextType | undefined>(undefined);

const STORAGE_KEYS = {
  START_DATE: '@diadefense_start_date',
  COMPLETED_MEALS: '@diadefense_completed_meals',
  COMPLETED_SUPPS: '@diadefense_completed_supps',
  WATER: '@diadefense_water',
  ACTIVITY: '@diadefense_activity',
  SLEEP: '@diadefense_sleep',
  BLOOD: '@diadefense_blood',
  LAST_RESET_DATE: '@diadefense_last_reset'
};

export function DefenseProgramProvider({ children }: { children: ReactNode }) {
  const [program] = useState<DayPlan[]>(TR_PROGRAM);
  const [startISO, setStartISOState] = useState<string | null>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(1);
  const [currentDayPlan, setCurrentDayPlan] = useState<DayPlan | null>(null);
  
  // User progress state
  const [completedMeals, setCompletedMeals] = useState<Record<number, MealSlot[]>>({});
  const [completedSupplements, setCompletedSupplements] = useState<Record<number, string[]>>({});
  const [waterIntakeLiters, setWaterIntakeLiters] = useState<number>(0);
  const [activityScore, setActivityScoreState] = useState<number>(0);
  const [sleepHours, setSleepHoursState] = useState<number>(0);
  const [bloodValues, setBloodValuesState] = useState<BloodValues>({});
  
  // Calculated state
  const [mealRatio, setMealRatio] = useState<number>(0);
  const [supplementRatio, setSupplementRatio] = useState<number>(0);
  const [waterRatio, setWaterRatio] = useState<number>(0);
  const [activityRatio, setActivityRatio] = useState<number>(0);
  const [sleepRatio, setSleepRatio] = useState<number>(0);
  const [bloodModifier, setBloodModifier] = useState<number>(0);
  const [defenseScore, setDefenseScore] = useState<number>(0);
  const [monsterState, setMonsterState] = useState<MonsterState>('neutral');
  const [defiMood, setDefiMood] = useState<DefiMood>('idle');
  const [defiMessage, setDefiMessage] = useState<string>('Merhaba! Programına başlamaya hazır mısın?');

  // Load saved data on mount
  useEffect(() => {
    loadSavedData();
  }, []);

  // Auto-reset daily at midnight
  useEffect(() => {
    checkAndResetDaily();
  }, []);

  // Calculate current day when start date changes
  useEffect(() => {
    if (startISO) {
      const start = parseISO(startISO);
      const today = new Date();
      const daysPassed = differenceInDays(today, start) + 1;
      const newDayIndex = Math.min(Math.max(daysPassed, 1), 90);
      setCurrentDayIndex(newDayIndex);
      
      // Find current day plan
      const plan = program.find(p => p.dayIndex === newDayIndex);
      setCurrentDayPlan(plan || program[0] || null);
    }
  }, [startISO, program]);

  // Recalculate everything when progress changes
  useEffect(() => {
    calculateDefenseMetrics();
  }, [
    currentDayPlan,
    currentDayIndex,
    completedMeals,
    completedSupplements,
    waterIntakeLiters,
    activityScore,
    sleepHours,
    bloodValues
  ]);

  async function loadSavedData() {
    try {
      const [savedStart, savedMeals, savedSupps, savedWater, savedActivity, savedSleep, savedBlood] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.START_DATE),
        AsyncStorage.getItem(STORAGE_KEYS.COMPLETED_MEALS),
        AsyncStorage.getItem(STORAGE_KEYS.COMPLETED_SUPPS),
        AsyncStorage.getItem(STORAGE_KEYS.WATER),
        AsyncStorage.getItem(STORAGE_KEYS.ACTIVITY),
        AsyncStorage.getItem(STORAGE_KEYS.SLEEP),
        AsyncStorage.getItem(STORAGE_KEYS.BLOOD)
      ]);

      if (savedStart) setStartISOState(savedStart);
      if (savedMeals) setCompletedMeals(JSON.parse(savedMeals));
      if (savedSupps) setCompletedSupplements(JSON.parse(savedSupps));
      if (savedWater) setWaterIntakeLiters(parseFloat(savedWater));
      if (savedActivity) setActivityScoreState(parseFloat(savedActivity));
      if (savedSleep) setSleepHoursState(parseFloat(savedSleep));
      if (savedBlood) setBloodValuesState(JSON.parse(savedBlood));
    } catch (error) {
      console.error('Failed to load saved data:', error);
    }
  }

  async function checkAndResetDaily() {
    try {
      const lastReset = await AsyncStorage.getItem(STORAGE_KEYS.LAST_RESET_DATE);
      const today = new Date().toDateString();
      
      if (lastReset !== today) {
        // Reset daily progress
        await resetDailyProgress();
        await AsyncStorage.setItem(STORAGE_KEYS.LAST_RESET_DATE, today);
      }
    } catch (error) {
      console.error('Failed to check daily reset:', error);
    }
  }

  async function resetDailyProgress() {
    setWaterIntakeLiters(0);
    setActivityScoreState(0);
    setSleepHoursState(0);
    
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.WATER, '0'),
        AsyncStorage.setItem(STORAGE_KEYS.ACTIVITY, '0'),
        AsyncStorage.setItem(STORAGE_KEYS.SLEEP, '0')
      ]);
    } catch (error) {
      console.error('Failed to reset daily progress:', error);
    }
  }

  function calculateDefenseMetrics() {
    if (!currentDayPlan) {
      setDefenseScore(0);
      return;
    }

    const dayMeals = completedMeals[currentDayIndex] || [];
    const daySupps = completedSupplements[currentDayIndex] || [];
    
    // Calculate ratios
    const totalMeals = currentDayPlan.meals.length;
    const newMealRatio = totalMeals > 0 ? dayMeals.length / totalMeals : 0;
    
    const totalSupps = currentDayPlan.supplements.length;
    const newSuppRatio = totalSupps > 0 ? daySupps.length / totalSupps : 0;
    
    const targetWater = currentDayPlan.defenseTargets.waterLiters;
    const newWaterRatio = Math.min(waterIntakeLiters / targetWater, 1);
    
    const targetSteps = currentDayPlan.defenseTargets.steps;
    const estimatedSteps = (activityScore / 100) * targetSteps;
    const newActivityRatio = Math.min(estimatedSteps / targetSteps, 1);
    
    const targetSleep = currentDayPlan.defenseTargets.sleepHours;
    const newSleepRatio = Math.min(sleepHours / targetSleep, 1);
    
    // Blood modifier: -10 to +10
    let newBloodModifier = 0;
    if (bloodValues.lastGlucose) {
      if (bloodValues.lastGlucose < 70) newBloodModifier = -10;
      else if (bloodValues.lastGlucose > 180) newBloodModifier = -5;
      else if (bloodValues.lastGlucose >= 80 && bloodValues.lastGlucose <= 120) newBloodModifier = 5;
    }
    
    // Calculate defense score (0-100)
    const baseScore = (
      newMealRatio * 30 +
      newSuppRatio * 20 +
      newWaterRatio * 15 +
      newActivityRatio * 20 +
      newSleepRatio * 15
    );
    
    const finalScore = Math.min(Math.max(baseScore + newBloodModifier, 0), 100);
    
    // Update all calculated values
    setMealRatio(newMealRatio);
    setSupplementRatio(newSuppRatio);
    setWaterRatio(newWaterRatio);
    setActivityRatio(newActivityRatio);
    setSleepRatio(newSleepRatio);
    setBloodModifier(newBloodModifier);
    setDefenseScore(finalScore);
    
    // Calculate monster state
    const newMonsterState = getMonsterState(finalScore);
    setMonsterState(newMonsterState);
    
    // Get Defi message
    const allMeals = currentDayPlan.meals.map(m => m.slot);
    const missedMeals = allMeals.filter(slot => !dayMeals.includes(slot));
    const missedSupplements = totalSupps - daySupps.length;
    
    const defiResponse = getDefiMessage({
      defenseScore: finalScore,
      mealRatio: newMealRatio,
      supplementRatio: newSuppRatio,
      waterRatio: newWaterRatio,
      sleepRatio: newSleepRatio,
      activityRatio: newActivityRatio,
      missedMeals,
      missedSupplements,
      monsterState: newMonsterState
    });
    
    setDefiMood(defiResponse.mood);
    setDefiMessage(defiResponse.message);
  }

  async function setStartISO(dateString: string) {
    setStartISOState(dateString);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.START_DATE, dateString);
    } catch (error) {
      console.error('Failed to save start date:', error);
    }
  }

  async function markMealCompleted(dayIndex: number, slot: MealSlot) {
    const dayMeals = completedMeals[dayIndex] || [];
    if (!dayMeals.includes(slot)) {
      const updated = { ...completedMeals, [dayIndex]: [...dayMeals, slot] };
      setCompletedMeals(updated);
      
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_MEALS, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save completed meal:', error);
      }
    }
  }

  async function markSupplementTaken(dayIndex: number, id: string) {
    const daySupps = completedSupplements[dayIndex] || [];
    if (!daySupps.includes(id)) {
      const updated = { ...completedSupplements, [dayIndex]: [...daySupps, id] };
      setCompletedSupplements(updated);
      
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_SUPPS, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save completed supplement:', error);
      }
    }
  }

  async function addWater(liters: number) {
    const newValue = waterIntakeLiters + liters;
    setWaterIntakeLiters(newValue);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.WATER, newValue.toString());
    } catch (error) {
      console.error('Failed to save water intake:', error);
    }
  }

  async function setWater(liters: number) {
    setWaterIntakeLiters(liters);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.WATER, liters.toString());
    } catch (error) {
      console.error('Failed to save water intake:', error);
    }
  }

  async function setActivityScore(value: number) {
    setActivityScoreState(value);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ACTIVITY, value.toString());
    } catch (error) {
      console.error('Failed to save activity score:', error);
    }
  }

  async function setSleepHours(value: number) {
    setSleepHoursState(value);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SLEEP, value.toString());
    } catch (error) {
      console.error('Failed to save sleep hours:', error);
    }
  }

  async function setBloodValues(values: BloodValues) {
    setBloodValuesState(values);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.BLOOD, JSON.stringify(values));
    } catch (error) {
      console.error('Failed to save blood values:', error);
    }
  }

  const value: DefenseProgramContextType = {
    program,
    startISO,
    currentDayIndex,
    currentDayPlan,
    completedMeals,
    completedSupplements,
    waterIntakeLiters,
    activityScore,
    sleepHours,
    bloodValues,
    mealRatio,
    supplementRatio,
    waterRatio,
    activityRatio,
    sleepRatio,
    bloodModifier,
    defenseScore,
    monsterState,
    defiMood,
    defiMessage,
    setStartISO,
    markMealCompleted,
    markSupplementTaken,
    addWater,
    setWater,
    setActivityScore,
    setSleepHours,
    setBloodValues,
    resetDailyProgress
  };

  return (
    <DefenseProgramContext.Provider value={value}>
      {children}
    </DefenseProgramContext.Provider>
  );
}

export function useDefenseProgram() {
  const context = useContext(DefenseProgramContext);
  if (context === undefined) {
    throw new Error('useDefenseProgram must be used within a DefenseProgramProvider');
  }
  return context;
}
