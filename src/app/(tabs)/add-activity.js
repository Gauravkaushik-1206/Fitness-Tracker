import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import "../../../global.css";

export default function AddActivity() {
  const [activityName, setActivityName] = useState('');
  const [sets, setSets] = useState('');
  const [currentSet, setCurrentSet] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [completedSets, setCompletedSets] = useState([]);
  const [workoutComplete, setWorkoutComplete] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isTimerActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, seconds]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsTimerActive(true);
    setCurrentSet(currentSet + 1);
  };

  const pauseTimer = () => {
    setIsTimerActive(false);
  };

  const completeSet = () => {
    setIsTimerActive(false);
    const setTime = seconds;
    setCompletedSets([...completedSets, { set: currentSet, time: setTime }]);
    setTotalTime(totalTime + seconds);
    setSeconds(0);

    if (currentSet >= parseInt(sets)) {
      setWorkoutComplete(true);
    }
  };

  const resetWorkout = () => {
    setIsTimerActive(false);
    setSeconds(0);
    setCurrentSet(0);
    setTotalTime(0);
    setCompletedSets([]);
    setWorkoutComplete(false);
  };

  const calculateCalories = () => {
    // Simple calorie calculation (this would be more complex in real app)
    const baseCaloriesPerMinute = 8; // Average calories per minute
    const totalMinutes = totalTime / 60;
    return Math.round(totalMinutes * baseCaloriesPerMinute);
  };

  const saveWorkout = () => {
    const calories = calculateCalories();
    Alert.alert(
      'Workout Saved!',
      `${activityName}\nTotal Time: ${formatTime(totalTime)}\nCalories Burned: ${calories} kcal\nSets Completed: ${completedSets.length}`,
      [
        {
          text: 'Generate Nutrition Plan',
          onPress: () => generateNutritionPlan(calories)
        },
        {
          text: 'OK',
          onPress: () => resetWorkout()
        }
      ]
    );
  };

  const generateNutritionPlan = (calories) => {
    // Simple nutrition calculation
    const protein = Math.round(calories * 0.3 / 4); // 30% calories from protein (4 cal/g)
    const carbs = Math.round(calories * 0.4 / 4); // 40% from carbs
    const fats = Math.round(calories * 0.3 / 9); // 30% from fats (9 cal/g)

    Alert.alert(
      'Nutrition Plan Generated!',
      `Based on your ${calories} kcal workout:\n\nRecommended intake to maintain energy:\n• Protein: ${protein}g\n• Carbohydrates: ${carbs}g\n• Fats: ${fats}g\n\nVitamins: Take a multivitamin and ensure adequate Vitamin D and B12.`,
      [{ text: 'Got it!', onPress: () => resetWorkout() }]
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white pt-16 pb-6 px-6 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-800">Add Activity</Text>
        <Text className="text-gray-600 mt-1">Track your workout with timer</Text>
      </View>

      {/* Activity Form */}
      {!workoutComplete && (
        <View className="bg-white mx-6 mt-6 p-4 rounded-xl shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-4">Exercise Details</Text>
          
          {/* Activity Name */}
          <View className="mb-4">
            <Text className="text-gray-700 text-base font-medium mb-2">Exercise Name</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
              placeholder="e.g. Push-ups, Running, Cycling"
              value={activityName}
              onChangeText={setActivityName}
            />
          </View>

          {/* Number of Sets */}
          <View className="mb-4">
            <Text className="text-gray-700 text-base font-medium mb-2">Number of Sets</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
              placeholder="e.g. 3"
              keyboardType="numeric"
              value={sets}
              onChangeText={setSets}
            />
          </View>
        </View>
      )}

      {/* Timer Section */}
      {activityName && sets && !workoutComplete && (
        <View className="bg-white mx-6 mt-6 p-6 rounded-xl shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-4 text-center">
            {activityName} - Set {currentSet + 1} of {sets}
          </Text>
          
          {/* Timer Display */}
          <View className="items-center mb-6">
            <View className="bg-blue-50 w-32 h-32 rounded-full items-center justify-center mb-4">
              <Text className="text-3xl font-bold text-blue-600">
                {formatTime(seconds)}
              </Text>
            </View>
            
            {/* Timer Controls */}
            <View className="flex-row space-x-4">
              {!isTimerActive ? (
                <TouchableOpacity
                  className="bg-green-500 px-6 py-3 rounded-xl flex-row items-center"
                  onPress={startTimer}
                  disabled={currentSet >= parseInt(sets)}
                >
                  <Ionicons name="play" size={20} color="white" />
                  <Text className="text-white font-semibold ml-2">
                    {currentSet === 0 ? 'Start Set 1' : `Start Set ${currentSet + 1}`}
                  </Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    className="bg-yellow-500 px-4 py-3 rounded-xl flex-row items-center"
                    onPress={pauseTimer}
                  >
                    <Ionicons name="pause" size={20} color="white" />
                    <Text className="text-white font-semibold ml-2">Pause</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    className="bg-blue-500 px-4 py-3 rounded-xl flex-row items-center"
                    onPress={completeSet}
                  >
                    <Ionicons name="checkmark" size={20} color="white" />
                    <Text className="text-white font-semibold ml-2">Complete Set</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          {/* Reset Button */}
          <TouchableOpacity
            className="bg-red-100 py-2 rounded-lg"
            onPress={resetWorkout}
          >
            <Text className="text-red-600 text-center font-medium">Reset Workout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Completed Sets */}
      {completedSets.length > 0 && !workoutComplete && (
        <View className="bg-white mx-6 mt-6 p-4 rounded-xl shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-4">Completed Sets</Text>
          
          {completedSets.map((completedSet, index) => (
            <View key={index} className="flex-row justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <Text className="text-gray-700">Set {completedSet.set}</Text>
              <Text className="text-gray-600">{formatTime(completedSet.time)}</Text>
            </View>
          ))}
          
          <View className="flex-row justify-between items-center pt-3 mt-3 border-t border-gray-200">
            <Text className="text-gray-800 font-semibold">Total Time</Text>
            <Text className="text-blue-600 font-bold">{formatTime(totalTime)}</Text>
          </View>
        </View>
      )}

      {/* Workout Complete */}
      {workoutComplete && (
        <View className="bg-white mx-6 mt-6 p-6 rounded-xl shadow-sm">
          <View className="items-center mb-6">
            <View className="bg-green-100 w-20 h-20 rounded-full items-center justify-center mb-4">
              <Ionicons name="checkmark-circle" size={40} color="#10B981" />
            </View>
            <Text className="text-2xl font-bold text-gray-800 mb-2">Workout Complete! 🎉</Text>
            <Text className="text-gray-600 text-center">Great job finishing your {activityName} session!</Text>
          </View>

          {/* Workout Summary */}
          <View className="bg-gray-50 p-4 rounded-xl mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-3">Workout Summary</Text>
            
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Exercise:</Text>
              <Text className="text-gray-800 font-medium">{activityName}</Text>
            </View>
            
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Total Time:</Text>
              <Text className="text-gray-800 font-medium">{formatTime(totalTime)}</Text>
            </View>
            
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Sets Completed:</Text>
              <Text className="text-gray-800 font-medium">{completedSets.length}</Text>
            </View>
            
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Estimated Calories:</Text>
              <Text className="text-green-600 font-bold">{calculateCalories()} kcal</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="space-y-3">
            <TouchableOpacity
              className="bg-blue-500 py-4 rounded-xl"
              onPress={saveWorkout}
            >
              <Text className="text-white text-center text-lg font-semibold">
                Save Workout
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="bg-green-500 py-4 rounded-xl"
              onPress={() => generateNutritionPlan(calculateCalories())}
            >
              <Text className="text-white text-center text-lg font-semibold">
                Generate Nutrition Plan
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="border border-gray-300 py-4 rounded-xl"
              onPress={resetWorkout}
            >
              <Text className="text-gray-700 text-center text-lg font-semibold">
                Start New Workout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View className="h-6" />
    </ScrollView>
  );
}
