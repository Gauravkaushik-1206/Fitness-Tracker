import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import "../../../global.css";

export default function UserDetails() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    goal: 'maintain', // maintain, lose, gain
    activityLevel: 'moderate', // low, moderate, high
  });

  const handleSubmit = () => {
    // Here you would typically save user data to AsyncStorage or your backend
    console.log('User Info:', userInfo);
    router.push('/(tabs)');
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 pt-16 pb-8">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-800 mb-2">Tell us about yourself</Text>
          <Text className="text-gray-600 text-base">
            This helps us create a personalized fitness plan for you
          </Text>
        </View>

        {/* Form Fields */}
        <View className="space-y-6">
          {/* Name */}
          <View>
            <Text className="text-gray-700 text-base font-medium mb-2">Full Name</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
              placeholder="Enter your full name"
              value={userInfo.name}
              onChangeText={(text) => setUserInfo({...userInfo, name: text})}
            />
          </View>

          {/* Age */}
          <View>
            <Text className="text-gray-700 text-base font-medium mb-2">Age</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
              placeholder="Enter your age"
              keyboardType="numeric"
              value={userInfo.age}
              onChangeText={(text) => setUserInfo({...userInfo, age: text})}
            />
          </View>

          {/* Weight */}
          <View>
            <Text className="text-gray-700 text-base font-medium mb-2">Weight (kg)</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
              placeholder="Enter your weight"
              keyboardType="numeric"
              value={userInfo.weight}
              onChangeText={(text) => setUserInfo({...userInfo, weight: text})}
            />
          </View>

          {/* Height */}
          <View>
            <Text className="text-gray-700 text-base font-medium mb-2">Height (cm)</Text>
            <TextInput
              className="border border-gray-300 rounded-xl px-4 py-3 text-gray-800"
              placeholder="Enter your height"
              keyboardType="numeric"
              value={userInfo.height}
              onChangeText={(text) => setUserInfo({...userInfo, height: text})}
            />
          </View>

          {/* Goal */}
          <View>
            <Text className="text-gray-700 text-base font-medium mb-2">Fitness Goal</Text>
            <View className="flex-row justify-between">
              {[
                { key: 'lose', label: 'Lose Weight' },
                { key: 'maintain', label: 'Maintain' },
                { key: 'gain', label: 'Gain Weight' }
              ].map((goal) => (
                <TouchableOpacity
                  key={goal.key}
                  className={`flex-1 py-3 rounded-xl mx-1 ${
                    userInfo.goal === goal.key ? 'bg-blue-500' : 'bg-gray-100'
                  }`}
                  onPress={() => setUserInfo({...userInfo, goal: goal.key})}
                >
                  <Text className={`text-center font-medium ${
                    userInfo.goal === goal.key ? 'text-white' : 'text-gray-700'
                  }`}>
                    {goal.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Activity Level */}
          <View>
            <Text className="text-gray-700 text-base font-medium mb-2">Activity Level</Text>
            <View className="flex-row justify-between">
              {[
                { key: 'low', label: 'Low' },
                { key: 'moderate', label: 'Moderate' },
                { key: 'high', label: 'High' }
              ].map((level) => (
                <TouchableOpacity
                  key={level.key}
                  className={`flex-1 py-3 rounded-xl mx-1 ${
                    userInfo.activityLevel === level.key ? 'bg-blue-500' : 'bg-gray-100'
                  }`}
                  onPress={() => setUserInfo({...userInfo, activityLevel: level.key})}
                >
                  <Text className={`text-center font-medium ${
                    userInfo.activityLevel === level.key ? 'text-white' : 'text-gray-700'
                  }`}>
                    {level.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity 
          className="bg-blue-500 py-4 rounded-xl mt-8"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Continue to Dashboard
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
