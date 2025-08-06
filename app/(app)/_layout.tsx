import { Stack } from 'expo-router';
import React, { useState } from 'react';

const AppLayout = () => {
  const [hasOnboarded, setHasOnboarded] = useState(false);

  const initialRouteName = hasOnboarded ? "HomeScreen" : "OnboardingScreenOne";

  return (
    <Stack initialRouteName={initialRouteName}>
      <Stack.Screen name="OnboardingScreenOne" options={{ headerShown: false }} />
      <Stack.Screen name="OnboardingScreenTwo" options={{ headerShown: false }} />
      <Stack.Screen name="OnboardingScreenThree" options={{ headerShown: false }} />
      <Stack.Screen name="OnboardingScreenFour" options={{ headerShown: false }} />
      <Stack.Screen name="BookDetailScreen" options={{ headerShown: false }} />
      <Stack.Screen name="StoryScreen" options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="SearchScreen" options={{ headerShown: false }} />
      <Stack.Screen name="ViewAllScreen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AppLayout;
