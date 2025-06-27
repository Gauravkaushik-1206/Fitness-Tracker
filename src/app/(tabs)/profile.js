import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // Mock user data - in a real app this would come from your state management/API
  const userData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    joinDate: 'March 2024',
    totalWorkouts: 47,
    streak: 12,
    achievements: 8,
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {
          // In a real app, implement logout logic here
          console.log('Logging out...');
        }}
      ]
    );
  };

  const ProfileStat = ({ label, value, icon }) => (
    <View className="items-center flex-1">
      <View className="bg-blue-100 p-3 rounded-full mb-2">
        <Ionicons name={icon} size={24} color="#3B82F6" />
      </View>
      <Text className="text-2xl font-bold text-gray-900">{value}</Text>
      <Text className="text-sm text-gray-600">{label}</Text>
    </View>
  );

  const MenuItem = ({ icon, title, subtitle, onPress, showArrow = true, rightComponent }) => (
    <TouchableOpacity
      className="flex-row items-center p-4 bg-white border-b border-gray-100"
      onPress={onPress}
    >
      <View className="bg-gray-100 p-2 rounded-lg mr-4">
        <Ionicons name={icon} size={20} color="#6B7280" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium text-gray-900">{title}</Text>
        {subtitle && <Text className="text-sm text-gray-500 mt-1">{subtitle}</Text>}
      </View>
      {rightComponent || (showArrow && (
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      ))}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-white px-6 pt-6 pb-8">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-2xl font-bold text-gray-900">Profile</Text>
            <TouchableOpacity>
              <Ionicons name="settings-outline" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* User Info */}
          <View className="items-center mb-6">
            <View className="relative mb-4">
              <Image
                source={{ uri: userData.avatar }}
                className="w-24 h-24 rounded-full"
                style={{ resizeMode: 'cover' }}
              />
              <TouchableOpacity className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full">
                <Ionicons name="camera" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-xl font-bold text-gray-900 mb-1">{userData.name}</Text>
            <Text className="text-gray-600 mb-2">{userData.email}</Text>
            <Text className="text-sm text-gray-500">Member since {userData.joinDate}</Text>
          </View>

          {/* Stats */}
          <View className="flex-row bg-gray-50 rounded-xl p-4">
            <ProfileStat
              label="Workouts"
              value={userData.totalWorkouts}
              icon="fitness"
            />
            <ProfileStat
              label="Day Streak"
              value={userData.streak}
              icon="flame"
            />
            <ProfileStat
              label="Achievements"
              value={userData.achievements}
              icon="trophy"
            />
          </View>
        </View>

        {/* Menu Items */}
        <View className="mt-6">
          {/* Account Section */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-6 mb-3">
              Account
            </Text>
            <View className="bg-white">
              <MenuItem
                icon="person-outline"
                title="Edit Profile"
                subtitle="Update your personal information"
                onPress={() => console.log('Edit Profile')}
              />
              <MenuItem
                icon="key-outline"
                title="Change Password"
                subtitle="Update your account password"
                onPress={() => console.log('Change Password')}
              />
              <MenuItem
                icon="card-outline"
                title="Subscription"
                subtitle="Manage your premium plan"
                onPress={() => console.log('Subscription')}
              />
            </View>
          </View>

          {/* Fitness Section */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-6 mb-3">
              Fitness
            </Text>
            <View className="bg-white">
              <MenuItem
                icon="calendar-outline"
                title="Workout History"
                subtitle="View your exercise records"
                onPress={() => console.log('Workout History')}
              />
              <MenuItem
                icon="stats-chart-outline"
                title="Progress Reports"
                subtitle="Detailed fitness analytics"
                onPress={() => console.log('Progress Reports')}
              />
              <MenuItem
                icon="nutrition-outline"
                title="Meal Plans"
                subtitle="Customize your nutrition"
                onPress={() => console.log('Meal Plans')}
              />
            </View>
          </View>

          {/* Preferences Section */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-6 mb-3">
              Preferences
            </Text>
            <View className="bg-white">
              <MenuItem
                icon="notifications-outline"
                title="Notifications"
                subtitle="Workout reminders and updates"
                showArrow={false}
                rightComponent={
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                    thumbColor={notificationsEnabled ? '#FFFFFF' : '#F3F4F6'}
                  />
                }
              />
              <MenuItem
                icon="moon-outline"
                title="Dark Mode"
                subtitle="Switch to dark theme"
                showArrow={false}
                rightComponent={
                  <Switch
                    value={darkModeEnabled}
                    onValueChange={setDarkModeEnabled}
                    trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                    thumbColor={darkModeEnabled ? '#FFFFFF' : '#F3F4F6'}
                  />
                }
              />
              <MenuItem
                icon="language-outline"
                title="Language"
                subtitle="English"
                onPress={() => console.log('Language')}
              />
            </View>
          </View>

          {/* Support Section */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-6 mb-3">
              Support
            </Text>
            <View className="bg-white">
              <MenuItem
                icon="help-circle-outline"
                title="Help Center"
                subtitle="Get support and find answers"
                onPress={() => console.log('Help Center')}
              />
              <MenuItem
                icon="chatbubble-outline"
                title="Contact Us"
                subtitle="Reach out to our team"
                onPress={() => console.log('Contact Us')}
              />
              <MenuItem
                icon="document-text-outline"
                title="Privacy Policy"
                subtitle="Read our privacy terms"
                onPress={() => console.log('Privacy Policy')}
              />
              <MenuItem
                icon="shield-checkmark-outline"
                title="Terms of Service"
                subtitle="View terms and conditions"
                onPress={() => console.log('Terms of Service')}
              />
            </View>
          </View>

          {/* Logout */}
          <View className="px-6 mb-8">
            <TouchableOpacity
              className="bg-red-50 border border-red-200 rounded-xl p-4 flex-row items-center justify-center"
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              <Text className="text-red-500 font-semibold ml-2">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
