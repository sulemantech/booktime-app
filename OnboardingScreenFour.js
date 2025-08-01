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

const OnboardingScreenFour = ({ route, navigation }) => {
    const { childName, childAge, interests } = route.params || {};
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const isButtonEnabled = selectedAvatar !== null;

    const handleContinue = () => {
        navigation.replace('Home', {
            childName,
            childAge,
            interests,
            avatar: selectedAvatar,
        });
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderRelease: (_, gestureState) => {
                const { dx, dy } = gestureState;
                if (dx < -50 && Math.abs(dy) < 20 && isButtonEnabled) {
                    handleContinue();
                } else if (dx > 50 && Math.abs(dy) < 20) {
                    if (navigation.canGoBack()) {
                        navigation.goBack();
                    }
                }
            },
        })
    ).current;

    const avatarCards = [
        { id: 'avatar1', image: 'https://placehold.co/60x60/F08C4B/FFFFFF?text=A1' },
        { id: 'avatar2', image: 'https://placehold.co/60x60/3F3D56/FFFFFF?text=A2' },
        { id: 'avatar3', image: 'https://placehold.co/60x60/8A8696/FFFFFF?text=A3' },
        { id: 'avatar4', image: 'https://placehold.co/60x60/F7F4EB/8A8696?text=A4' },
        { id: 'avatar5', image: 'https://placehold.co/60x60/F08C4B/FFFFFF?text=A5' },
        { id: 'avatar6', image: 'https://placehold.co/60x60/3F3D56/FFFFFF?text=A6' },
        { id: 'avatar7', image: 'https://placehold.co/60x60/8A8696/FFFFFF?text=A7' },
        { id: 'avatar8', image: 'https://placehold.co/60x60/F7F4EB/8A8696?text=A8' },
        { id: 'avatar9', image: 'https://placehold.co/60x60/F08C4B/FFFFFF?text=A9' },
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
                    <Text style={styles.title}>Choose an avatar for {childName}</Text>
                    <Text style={styles.subtitle}>
                        Choose a fun character to start your journey!
                    </Text>

                    <View style={styles.cardGrid}>
                        {avatarCards.map((card) => (
                            <TouchableOpacity
                                key={card.id}
                                style={[
                                    styles.avatarCard,
                                    selectedAvatar === card.id && styles.selectedCard,
                                ]}
                                onPress={() => setSelectedAvatar(card.id)}
                            >
                                <Image source={{ uri: card.image }} style={styles.cardImage} />
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
        paddingTop: 30,
        paddingBottom: height * 0.05,
        justifyContent: 'space-between',
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        marginBottom: 10,
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
        fontSize: 24,
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
    avatarCard: {
        width: (width - 80) / 3,
        height: (width - 80) / 3,
        backgroundColor: 'white',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginHorizontal: 10,
    },
    selectedCard: {
        borderWidth: 3,
        borderColor: '#F08C4B',
    },
    cardImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        borderRadius: 50,
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

export default OnboardingScreenFour;
