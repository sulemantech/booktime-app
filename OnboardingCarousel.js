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

    const goToNextPage = (currentIndex, targetIndex = null) => {
    const nextIndex = targetIndex !== null ? targetIndex : currentIndex + 1;

    if (nextIndex < screens.length) {
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
        navigation.replace('HomeScreen'); // or your main screen
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
                        goToNextPage={(targetIndex = null) => goToNextPage(index, targetIndex)}
                    />
                </View>
            )}
            getItemLayout={(_, index) => ({
                length: width,
                offset: width * index,
                index,
            })}
            initialNumToRender={1}
            windowSize={2}
            removeClippedSubviews={true}
        />

    );
}
