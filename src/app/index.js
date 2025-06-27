import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import "../../global.css";

export default function Index() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for the component to mount and then navigate
    const prepare = async () => {
      try {
        // Small delay to ensure navigation is ready
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsReady(true);
        router.replace('/auth/welcome');
      } catch (error) {
        console.error('Navigation error:', error);
        setIsReady(true);
      }
    };

    prepare();
  }, []);

  // Show loading while preparing navigation
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    color: '#6B7280',
  }
});
