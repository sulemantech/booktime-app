import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './SplashScreen';
import OnboardingCarousel from './OnboardingCarousel';
import HomeScreen from './HomeScreen';
import BookDetailScreen from './BookDetailScreen';
import StoryScreen from './StoryScreen';
import ViewAllScreen from './ViewAllScreen';
import SearchScreen from './SearchScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const onFinishLoading = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SplashScreen onFinishLoading={onFinishLoading} />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={OnboardingCarousel} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="StoryScreen" component={StoryScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ViewAll" component={ViewAllScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
