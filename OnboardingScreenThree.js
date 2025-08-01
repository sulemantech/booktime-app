import React, { useState, useRef } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    PanResponder,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const OnboardingScreenThree = ({ route, navigation }) => {
    // Get the child's name from the previous screen's navigation params
    const { childName, childAge } = route.params || {};

    // State to hold the selected interests
    const [selectedInterests, setSelectedInterests] = useState([]);
    const isButtonEnabled = selectedInterests.length > 0;

    const handleToggleInterest = (interestId) => {
        // If the interest is already selected, remove it
        if (selectedInterests.includes(interestId)) {
            setSelectedInterests(selectedInterests.filter(id => id !== interestId));
        } else {
            // If less than 3 interests are selected, add the new one
            if (selectedInterests.length < 3) {
                setSelectedInterests([...selectedInterests, interestId]);
            }
        }
    };

    const handleContinue = () => {
  if (goToNextPage) {
    goToNextPage(3); // Assuming screen 4 is index 3 in FlatList
  }
};

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderRelease: (evt, gestureState) => {
                const { dx, dy } = gestureState;
                // Check for a left swipe to go to the next screen
                if (dx < -50 && Math.abs(dy) < 20) {
                    if (isButtonEnabled) {
                        handleContinue();
                    }
                }
                // Check for a right swipe to go back
                // if (dx > 50 && Math.abs(dy) < 20) {
                //   navigation.goBack();
                // }
                if (dx > 50 && Math.abs(dy) < 20) {
                    if (navigation.canGoBack()) {
                        navigation.goBack();
                    } else {
                        // Optionally, do nothing or navigate somewhere else
                        // navigation.replace('LoginScreen');
                    }
                }
            },
        })
    ).current;

    // Data for the interest cards using placeholder images
    const interestCards = [
        {
            id: 'friends',
            title: 'Friends',
            image: 'https://placehold.co/60x60/8A8696/FFFFFF?text=Friends',
        },
        {
            id: 'fairy-tales',
            title: 'Fairy Tales',
            image: 'https://placehold.co/60x60/F08C4B/FFFFFF?text=Fairy',
        },
        {
            id: 'look-around',
            title: 'Look Around',
            image: 'https://placehold.co/60x60/3F3D56/FFFFFF?text=Look',
        },
        {
            id: 'moving-machines',
            title: 'Moving Machines',
            image: 'https://placehold.co/60x60/F7F4EB/8A8696?text=Machines',
        },
        {
            id: 'sleepy',
            title: 'Sleepy',
            image: 'https://placehold.co/60x60/F08C4B/FFFFFF?text=Sleepy',
        },
        {
            id: 'dinosaurs',
            title: 'Dinosaurs',
            image: 'https://placehold.co/60x60/3F3D56/FFFFFF?text=Dino',
        },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container} {...panResponder.panHandlers}>
                {/* Progress Bar */}
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: '100%' }]} />
                </View>

                {/* Main Content */}
                <View style={styles.content}>
                    <Text style={styles.title}>
                        What are {childName}'s interests?
                    </Text>
                    <Text style={styles.subtitle}>
                        Choose top 3 favorite topics to personalize your learning
                    </Text>

                    {/* Interests Selection Grid */}
                    <View style={styles.cardGrid}>
                        {interestCards.map((card) => (
                            <TouchableOpacity
                                key={card.id}
                                style={[
                                    styles.interestCard,
                                    selectedInterests.includes(card.id) && styles.selectedCard,
                                ]}
                                onPress={() => handleToggleInterest(card.id)}
                            >
                                <Image source={{ uri: card.image }} style={styles.cardImage} />
                                <Text style={styles.cardTitle}>{card.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Continue Button */}
                <TouchableOpacity
                    style={[
                        styles.continueButton,
                        !isButtonEnabled && styles.disabledButton,
                    ]}
                    onPress={handleContinue}
                    disabled={!isButtonEnabled}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F7F4EB',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        paddingBottom: height * 0.05,
    },
    // Progress Bar Styles
    progressBarContainer: {
        height: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        marginTop: 40,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#F08C4B',
        borderRadius: 5,
    },
    // Main Content Styles
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#3F3D56',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#8A8696',
        textAlign: 'center',
        marginBottom: 20,
    },
    // Interests Selection Card Grid
    cardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
        width: width - 40,
    },
    interestCard: {
        width: (width - 60) / 3, // 20 padding on each side, 20 in between
        height: (width - 60) / 3 + 30, // Adjusted height for text
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        padding: 10,
    },
    selectedCard: {
        borderWidth: 2,
        borderColor: '#F08C4B',
    },
    cardImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3F3D56',
        marginTop: 5,
    },
    // Button Styles
    continueButton: {
        height: 50,
        backgroundColor: '#F08C4B',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledButton: {
        backgroundColor: '#C0C0C0',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default OnboardingScreenThree;
