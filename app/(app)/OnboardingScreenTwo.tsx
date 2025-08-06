import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const OnboardingScreenTwo = () => {
    // Use useLocalSearchParams to get the childName from the route parameters
    const { childName: childNameFromParams } = useLocalSearchParams();
    const childName = childNameFromParams || 'your child';

    const [selectedAge, setSelectedAge] = useState(null);
    const isButtonEnabled = selectedAge !== null;
    const insets = useSafeAreaInsets();
    const router = useRouter(); // Initialize the router hook

    const handleContinue = () => {
        if (isButtonEnabled) {
            // Navigate to the next screen (e.g., the Home screen, which is 'index')
            // Pass the childName and the selectedAge as parameters
            router.push({
                pathname: "OnboardingScreenThree",
                params: {
                    childName: childName,
                    selectedAge: selectedAge,
                },
            });
        }
    };

    const handleGoBack = () => {
        router.back();
    };

    const ageCards = [
        {
            id: 'baby',
            title: 'Baby',
            ages: 'Ages 1–3',
            image: require('../../assets/baby.png'),
        },
        {
            id: 'preschooler',
            title: 'Preschooler',
            ages: 'Ages 4–6',
            image: require('../../assets/preschooler.png'),
        },
        {
            id: 'child',
            title: 'Child',
            ages: 'Ages 7–10',
            image: require('../../assets/child.png'),
        },
        {
            id: 'preteen',
            title: 'Pre-teen',
            ages: 'Ages 11+',
            image: require('../../assets/preteen.png'),
        },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container, { paddingBottom: insets.bottom + 20 }]}>
                {/* Header with Back Button */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                        <Text></Text>
                    </TouchableOpacity>
                </View>

                {/* Main Content */}
                <View style={styles.content}>
                    <Text style={styles.title}>How old is {childName}?</Text>
                    <Text style={styles.subtitle}>
                        We will personalize the experience for that age.
                    </Text>

                    {/* Age Selection Grid */}
                    <View style={styles.cardGrid}>
                        {ageCards.map((card) => (
                            <TouchableOpacity
                                key={card.id}
                                style={[
                                    styles.ageCard,
                                    selectedAge === card.id && styles.selectedCard,
                                ]}
                                onPress={() => setSelectedAge(card.id)}
                            >
                                <Image source={card.image} style={styles.cardImage} />
                                <Text style={styles.cardTitle}>{card.title}</Text>
                                <Text style={styles.cardAges}>{card.ages}</Text>
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
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        fontSize: 24,
        color: '#3F3D56',
        fontWeight: 'bold',
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
    ageCard: {
        width: (width - 60) / 2,
        height: (width - 60) / 2,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
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
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3F3D56',
        marginTop: 10,
    },
    cardAges: {
        fontSize: 14,
        color: '#8A8696',
        marginTop: 2,
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

export const options = {
  headerShown: false,
};
export default OnboardingScreenTwo;
