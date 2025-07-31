import React, { useRef } from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import OnboardingScreenOne from './OnboardingScreenOne';
import OnboardingScreenTwo from './OnboardingScreenTwo';
import OnboardingScreenThree from './OnboardingScreenThree';
import OnboardingScreenFour from './OnboardingScreenFour';

const { width } = Dimensions.get('window');

const screens = [
  OnboardingScreenOne,
  OnboardingScreenTwo,
  OnboardingScreenThree,
  OnboardingScreenFour,
];

export default function OnboardingCarousel({ navigation, route }) {
  const flatListRef = useRef(null);

  const goToNextPage = (index) => {
    if (index < screens.length - 1) {
      flatListRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      // Final onboarding step - navigate to main app or login
      navigation.replace('LoginScreen'); // or your main screen
    }
  };

  return (
    <FlatList
      ref={flatListRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      data={screens}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item: ScreenComponent, index }) => (
        <View style={{ width }}>
          <ScreenComponent
            navigation={navigation}
            route={route}
            goToNextPage={() => goToNextPage(index)}
          />
        </View>
      )}
    />
  );
}
