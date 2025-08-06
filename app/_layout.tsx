// app/_layout.tsx
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Do some async loading tasks here
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  if (!appIsReady) {
    // Optionally, use your custom splash component here
    return <SplashComponent />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

// Optional: your splash component can be defined below or imported
const SplashComponent = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
  </View>
);
