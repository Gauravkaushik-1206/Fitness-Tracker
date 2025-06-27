import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import "../../../global.css";

export default function Welcome() {
  return (
    <View className="flex-1 bg-white">
      {/* Logo Section */}
      <View className="flex-1 justify-center items-center px-8">
        <View className="bg-blue-500 w-20 h-20 rounded-full items-center justify-center mb-6">
          <Text className="text-white text-3xl font-bold">F</Text>
        </View>
        
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Welcome To Fitness
        </Text>
        <Text className="text-3xl font-bold text-gray-800 mb-1">
          Tracker
        </Text>
        <Text className="text-4xl">💪</Text>
        
        <Text className="text-gray-600 text-center mt-6 text-base">
          Track your workouts, monitor progress, and achieve your fitness goals
        </Text>
      </View>

      {/* Button Section */}
      <View className="px-8 pb-12">
        <TouchableOpacity 
          className="bg-blue-500 py-4 rounded-xl mb-4"
          onPress={() => router.push('/auth/userDetails')}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Get Started
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="border border-blue-500 py-4 rounded-xl"
          onPress={() => router.push('/(tabs)')}
        >
          <Text className="text-blue-500 text-center text-lg font-semibold">
            Sign In / Login
          </Text>
        </TouchableOpacity>
        
        <Text className="text-gray-500 text-center mt-4 text-sm">
          It's your first time here, Just get the trial and password if will automatically create your account
        </Text>
      </View>
    </View>
  );
}
