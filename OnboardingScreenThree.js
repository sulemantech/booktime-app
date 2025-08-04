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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const OnboardingScreenThree = ({ route, navigation, goToNextPage }) => {
    const { childName, childAge } = route.params || {};
    const [selectedInterests, setSelectedInterests] = useState([]);
    const isButtonEnabled = selectedInterests.length > 0;
    const insets = useSafeAreaInsets(); // ✅ Get safe area insets

    const handleToggleInterest = (interestId) => {
        if (selectedInterests.includes(interestId)) {
            setSelectedInterests(prev => prev.filter(id => id !== interestId));
        } else if (selectedInterests.length < 3) {
            setSelectedInterests(prev => [...prev, interestId]);
        }
    };

    const handleContinue = () => {
        if (goToNextPage) {
            goToNextPage(3);
        }
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderRelease: (evt, gestureState) => {
                const { dx, dy } = gestureState;
                if (dx < -50 && Math.abs(dy) < 20 && isButtonEnabled) {
                    handleContinue();
                }
                if (dx > 50 && Math.abs(dy) < 20 && navigation.canGoBack()) {
                    navigation.goBack();
                }
            },
        })
    ).current;

    const interestCards = [
        { id: 'friends', title: 'Friends', image: require('./assets/friends.png') },
        { id: 'fairy-tales', title: 'Fairy Tales', image: require('./assets/fairy-tales.png') },
        { id: 'look-around', title: 'Look Around', image: require('./assets/look-around.png') },
        { id: 'moving-machines', title: 'Moving Machines', image: require('./assets/moving-machines.png') },
        { id: 'sleepy', title: 'Sleepy', image: require('./assets/sleepy.png') },
        { id: 'dinosaurs', title: 'Dinosaurs', image: require('./assets/dinosaurs.png') },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={StyleSheet.absoluteFill} {...panResponder.panHandlers} />

                {/* Progress Bar */}
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: '75%' }]} />
                </View>

                {/* Main Content */}
                <View style={styles.content}>
                    <Text style={styles.title}>What are {childName}'s interests?</Text>
                    <Text style={styles.subtitle}>
                        Choose top 3 favorite topics to personalize your learning
                    </Text>

                    <View style={styles.cardGrid}>
                        {interestCards.map((card) => (
                            <TouchableOpacity
                                key={card.id}
                                style={styles.interestCard}
                                onPress={() => handleToggleInterest(card.id)}
                            >
                                <View
                                    style={[
                                        styles.cardImageWrapper,
                                        selectedInterests.includes(card.id) && styles.selectedCard,
                                    ]}
                                >
                                    <Image source={card.image} style={styles.cardImage} />
                                </View>
                                <Text style={styles.cardTitle}>{card.title}</Text>
                            </TouchableOpacity>

                        ))}
                    </View>
                </View>

                {/* Continue Button with safe area padding */}
                <View style={{ paddingBottom: insets.bottom + 12 }}>
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
    },
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
    cardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
        width: width - 40,
    },

    interestCard: {
        width: (width - 80) / 3,
        marginBottom: 25,
        alignItems: 'center',
    },

    selectedCard: {
        transform: [{ scale: 1.05 }],
        borderColor: '#F08C4B',
        borderWidth: 3,
        borderRadius: 24,
    },

    cardImageWrapper: {
        width: 100,
        height: 100,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 8,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },

    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
    },

    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#3F3D56',
        textAlign: 'center',
    },
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
