import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import "../../../global.css";

const { width } = Dimensions.get('window');

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState('Today'); // Today, Weekly, Monthly

  // Mock data - replace with real data
  const todayStats = {
    calories: 2240,
    duration: 67, // minutes
    intensity: 8.5,
    workouts: 2
  };

  const weeklyStats = {
    totalCalories: 15680,
    totalDuration: 469, // minutes
    avgIntensity: 7.8,
    workoutsCompleted: 12
  };

  const recentActivities = [
    {
      id: 1,
      name: 'Morning Run',
      date: 'Nov 28, 2023',
      calories: 420,
      duration: 35,
      type: 'cardio'
    },
    {
      id: 2,
      name: 'Weightlifting',
      date: 'Nov 28, 2023',
      calories: 380,
      duration: 50,
      type: 'strength'
    },
    {
      id: 3,
      name: 'Yoga',
      date: 'Nov 27, 2023',
      calories: 180,
      duration: 30,
      type: 'flexibility'
    }
  ];

  const blogs = [
    {
      id: 1,
      title: 'More about Apples: Benefits, nutrition, and tips',
      category: 'Nutrition',
      readTime: '5 min read',
      image: '🍎'
    },
    {
      id: 2,
      title: 'The six maximum health benefits',
      category: 'Lifestyle',
      readTime: '8 min read',
      image: '💪'
    }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white pt-16 pb-6 px-6 border-b border-gray-100">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-gray-600 text-sm">TASK PLAY</Text>
            <Text className="text-2xl font-bold text-gray-800">Overview</Text>
          </View>
          <View className="w-10 h-10 bg-orange-400 rounded-full items-center justify-center">
            <Text className="text-white font-bold">JD</Text>
          </View>
        </View>
      </View>

      {/* Date Selection Panel */}
      <View className="bg-white mx-6 mt-4 p-4 rounded-xl shadow-sm">
        <Text className="text-lg font-semibold text-gray-800 mb-3">Select Date</Text>
        <View className="flex-row justify-between">
          {['Today', 'Weekly', 'Monthly'].map((period) => (
            <TouchableOpacity
              key={period}
              className={`flex-1 py-2 rounded-lg mx-1 ${
                selectedPeriod === period ? 'bg-blue-500' : 'bg-gray-100'
              }`}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text className={`text-center font-medium ${
                selectedPeriod === period ? 'text-white' : 'text-gray-700'
              }`}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Highlights Cards */}
      <View className="px-6 mt-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-gray-800">Highlights</Text>
          <TouchableOpacity>
            <Text className="text-blue-500 font-medium">View more</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap justify-between">
          {/* Calories Card */}
          <View className="bg-orange-400 p-4 rounded-xl w-[48%] mb-4">
            <Ionicons name="flame" size={24} color="white" />
            <Text className="text-white text-2xl font-bold mt-2">
              {selectedPeriod === 'Today' ? todayStats.calories : weeklyStats.totalCalories}
            </Text>
            <Text className="text-orange-100 text-sm">
              {selectedPeriod === 'Today' ? 'calories today' : 'calories this week'}
            </Text>
          </View>

          {/* Duration Card */}
          <View className="bg-purple-500 p-4 rounded-xl w-[48%] mb-4">
            <Ionicons name="time" size={24} color="white" />
            <Text className="text-white text-2xl font-bold mt-2">
              {selectedPeriod === 'Today' 
                ? `${todayStats.duration}m` 
                : `${Math.floor(weeklyStats.totalDuration / 60)}h ${weeklyStats.totalDuration % 60}m`
              }
            </Text>
            <Text className="text-purple-100 text-sm">
              {selectedPeriod === 'Today' ? 'workout time today' : 'total time this week'}
            </Text>
          </View>

          {/* Intensity Card */}
          <View className="bg-blue-500 p-4 rounded-xl w-[48%] mb-4">
            <Ionicons name="fitness" size={24} color="white" />
            <Text className="text-white text-2xl font-bold mt-2">
              {selectedPeriod === 'Today' ? todayStats.intensity : weeklyStats.avgIntensity}/10
            </Text>
            <Text className="text-blue-100 text-sm">
              {selectedPeriod === 'Today' ? 'avg intensity today' : 'avg intensity this week'}
            </Text>
          </View>

          {/* Workouts Card */}
          <View className="bg-green-500 p-4 rounded-xl w-[48%] mb-4">
            <Ionicons name="barbell" size={24} color="white" />
            <Text className="text-white text-2xl font-bold mt-2">
              {selectedPeriod === 'Today' ? todayStats.workouts : weeklyStats.workoutsCompleted}
            </Text>
            <Text className="text-green-100 text-sm">
              {selectedPeriod === 'Today' ? 'workouts today' : 'workouts this week'}
            </Text>
          </View>
        </View>
      </View>

      {/* Weekly Report */}
      <View className="bg-white mx-6 mt-6 p-4 rounded-xl shadow-sm">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-gray-800">This week report</Text>
          <TouchableOpacity>
            <Text className="text-blue-500 font-medium">View more</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <Ionicons name="footsteps" size={16} color="#6B7280" />
              <Text className="text-gray-600 text-sm ml-1">Steps</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-800">687,978</Text>
          </View>

          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <Ionicons name="barbell" size={16} color="#F59E0B" />
              <Text className="text-gray-600 text-sm ml-1">Workout</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-800">8h 45min</Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-4">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <Ionicons name="water" size={16} color="#3B82F6" />
              <Text className="text-gray-600 text-sm ml-1">Water</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-800">10,659 ml</Text>
          </View>

          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <Ionicons name="moon" size={16} color="#8B5CF6" />
              <Text className="text-gray-600 text-sm ml-1">Sleep</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-800">29h 17min</Text>
          </View>
        </View>
      </View>

      {/* Blogs Section */}
      <View className="px-6 mt-6 pb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-gray-800">Blogs</Text>
          <TouchableOpacity>
            <Text className="text-blue-500 font-medium">View more</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between">
          {blogs.map((blog) => (
            <TouchableOpacity key={blog.id} className="bg-white p-4 rounded-xl w-[48%] shadow-sm">
              <View className="bg-orange-100 w-12 h-12 rounded-lg items-center justify-center mb-3">
                <Text className="text-2xl">{blog.image}</Text>
              </View>
              <Text className="text-blue-500 text-xs font-medium mb-1">{blog.category}</Text>
              <Text className="text-gray-800 font-semibold text-sm mb-2" numberOfLines={2}>
                {blog.title}
              </Text>
              <Text className="text-gray-500 text-xs">{blog.readTime}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
