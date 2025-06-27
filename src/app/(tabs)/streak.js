import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import "../../../global.css";

export default function Streak() {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [longestStreak, setLongestStreak] = useState(42);

  // Mock streak data - 0: no activity, 1: light, 2: moderate, 3: intense
  const streakData = [
    [0, 1, 2, 3, 2, 1, 0],
    [3, 2, 3, 1, 3, 2, 3],
    [1, 3, 2, 3, 1, 2, 3],
    [2, 1, 3, 2, 3, 1, 2],
    [3, 2, 1, 3, 2, 3, 1],
    [1, 2, 3, 1, 2, 3, 2],
    [3, 1, 2, 3, 1, 2, 3],
    [2, 3, 1, 2, 3, 1, 2],
  ];

  const recentActivities = [
    {
      id: 1,
      name: 'Morning Run',
      date: 'Nov 28, 2023',
      description: 'Morning run in the park, enjoying the autumn air.',
      duration: 45,
      calories: 420,
      status: 'completed'
    },
    {
      id: 2,
      name: 'Weightlifting',
      date: 'Nov 28, 2023',
      description: 'Full body strength training session at the gym.',
      duration: 60,
      calories: 380,
      status: 'completed'
    },
    {
      id: 3,
      name: 'Yoga',
      date: 'Nov 27, 2023',
      description: 'Relaxing evening yoga session to unwind.',
      duration: 30,
      calories: 180,
      status: 'completed'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Alex Johnson', streak: 156, points: 12500 },
    { rank: 2, name: 'Sarah Chen', streak: 134, points: 11200 },
    { rank: 3, name: 'Mike Davis', streak: 98, points: 9800 },
    { rank: 4, name: 'You', streak: 42, points: 4200 },
    { rank: 5, name: 'Emma Wilson', streak: 38, points: 3800 },
  ];

  const badges = [
    { id: 1, name: '7 Day Streak', icon: '🔥', earned: true },
    { id: 2, name: '30 Day Streak', icon: '💪', earned: true },
    { id: 3, name: '100 Workouts', icon: '🏆', earned: false },
    { id: 4, name: 'Early Bird', icon: '🌅', earned: true },
    { id: 5, name: 'Night Owl', icon: '🦉', earned: false },
    { id: 6, name: 'Marathon', icon: '🏃', earned: false },
  ];

  const getStreakColor = (value) => {
    if (value === 0) return 'bg-gray-200';
    if (value === 1) return 'bg-green-200';
    if (value === 2) return 'bg-green-400';
    if (value === 3) return 'bg-green-600';
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white pt-16 pb-6 px-6 border-b border-gray-100">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-gray-800">My Exercise Progress</Text>
          <Ionicons name="notifications-outline" size={24} color="#6B7280" />
        </View>
      </View>

      {/* Exercise Streak Grid */}
      <View className="bg-white mx-6 mt-6 p-4 rounded-xl shadow-sm">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-gray-800">Exercise Streak</Text>
          <TouchableOpacity>
            <Text className="text-blue-500 font-medium">View All</Text>
          </TouchableOpacity>
        </View>

        {/* Days of week header */}
        <View className="flex-row justify-between mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <Text key={index} className="text-gray-500 text-xs font-medium w-8 text-center">
              {day}
            </Text>
          ))}
        </View>

        {/* Streak Grid */}
        {streakData.map((week, weekIndex) => (
          <View key={weekIndex} className="flex-row justify-between mb-1">
            {week.map((day, dayIndex) => (
              <View
                key={dayIndex}
                className={`w-8 h-8 rounded ${getStreakColor(day)}`}
              />
            ))}
          </View>
        ))}

        <View className="flex-row justify-between mt-4 pt-4 border-t border-gray-100">
          <Text className="text-gray-500 text-sm">💡 1 Day Streak - Keep it up!</Text>
        </View>
      </View>

      {/* Overall Stats */}
      <View className="bg-white mx-6 mt-6 p-4 rounded-xl shadow-sm">
        <Text className="text-lg font-bold text-gray-800 mb-4">Overall Stats</Text>
        
        <View className="flex-row justify-between">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <Ionicons name="barbell-outline" size={16} color="#6B7280" />
              <Text className="text-gray-600 text-sm ml-1">Workouts Completed</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-800">156</Text>
            <Text className="text-gray-500 text-xs">This year</Text>
          </View>

          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <Ionicons name="trending-up-outline" size={16} color="#10B981" />
              <Text className="text-gray-600 text-sm ml-1">Longest Streak</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-800">{longestStreak} Days</Text>
            <Text className="text-gray-500 text-xs">Your personal best</Text>
          </View>
        </View>
      </View>

      {/* Recent Activities */}
      <View className="bg-white mx-6 mt-6 p-4 rounded-xl shadow-sm">
        <Text className="text-lg font-bold text-gray-800 mb-4">Recent Activities</Text>
        
        {recentActivities.map((activity) => (
          <View key={activity.id} className="flex-row items-start mb-4 last:mb-0">
            <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
              <Ionicons name="checkmark" size={16} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-800 font-semibold">{activity.name}</Text>
              <Text className="text-gray-500 text-sm mb-1">{activity.date}</Text>
              <Text className="text-gray-600 text-sm mb-2">{activity.description}</Text>
              <Text className="text-gray-500 text-xs">{activity.duration} min • {activity.calories} kcal</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-blue-500 text-sm font-medium">View Details</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity className="mt-4 pt-4 border-t border-gray-100">
          <Text className="text-blue-500 text-center font-medium">View All Activities</Text>
        </TouchableOpacity>
      </View>

      {/* Leaderboard */}
      <View className="bg-white mx-6 mt-6 p-4 rounded-xl shadow-sm">
        <Text className="text-lg font-bold text-gray-800 mb-4">Leaderboard</Text>
        
        {leaderboard.map((user) => (
          <View key={user.rank} className={`flex-row items-center justify-between py-3 ${
            user.name === 'You' ? 'bg-blue-50 rounded-lg px-3' : ''
          }`}>
            <View className="flex-row items-center flex-1">
              <Text className={`text-lg font-bold w-8 ${
                user.rank <= 3 ? 'text-yellow-500' : 'text-gray-500'
              }`}>
                {user.rank}
              </Text>
              <Text className={`text-gray-800 font-medium ml-3 ${
                user.name === 'You' ? 'text-blue-600' : ''
              }`}>
                {user.name}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-gray-800 font-semibold">{user.streak} days</Text>
              <Text className="text-gray-500 text-xs">{user.points} pts</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Badges */}
      <View className="bg-white mx-6 mt-6 mb-6 p-4 rounded-xl shadow-sm">
        <Text className="text-lg font-bold text-gray-800 mb-4">Badges & Achievements</Text>
        
        <View className="flex-row flex-wrap justify-between">
          {badges.map((badge) => (
            <View key={badge.id} className={`w-[30%] items-center p-3 rounded-lg mb-4 ${
              badge.earned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
            }`}>
              <Text className={`text-3xl mb-2 ${badge.earned ? '' : 'opacity-30'}`}>
                {badge.icon}
              </Text>
              <Text className={`text-xs text-center font-medium ${
                badge.earned ? 'text-yellow-800' : 'text-gray-500'
              }`}>
                {badge.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
