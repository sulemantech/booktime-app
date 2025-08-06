import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

// The component no longer needs the 'navigation' or 'goToNextPage' props
const OnboardingScreenOne = () => {
    const [childName, setChildName] = useState('');
    const insets = useSafeAreaInsets();
    const router = useRouter(); // Use the useRouter hook for navigation

    const isButtonEnabled = childName.trim().length > 0;

    const handleContinue = () => {
        if (isButtonEnabled) {
            // Use router.push() to navigate to the next screen
            // Pass the child's name as a parameter in the navigation call
            router.push({
                pathname: "OnboardingScreenTwo",
                params: { childName: childName },
            });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container, { paddingBottom: insets.bottom + 20 }]}>
                {/* Top Combined Image */}
                <Image
                    source={require('../../assets/top_combined.png')}
                    style={styles.topCombinedImage}
                    resizeMode="contain"
                />

                {/* Main Content */}
                <View style={styles.content}>
                    <Text style={styles.title}>
                        What is the name of the child who will be on this adventure
                    </Text>
                    <Text style={styles.inputLabel}>Child Name</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your name"
                        placeholderTextColor="#C0C0C0"
                        value={childName}
                        onChangeText={setChildName}
                    />
                </View>

                {/* Bottom Combined Image */}
                <Image
                    source={require('../../assets/bottom_combined_image.png')}
                    style={styles.bottomCombinedImage}
                    resizeMode="contain"
                />

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
    topCombinedImage: {
        width: '100%',
        height: 100,
        marginTop: 20,
        alignSelf: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#3F3D56',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#18171dff',
        marginBottom: 5,
    },
    textInput: {
        height: 50,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        color: '#3F3D56',
    },
    bottomCombinedImage: {
        width: '120%',
        height: 150,
        alignSelf: 'center',
        marginBottom: 20,
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

export default OnboardingScreenOne;
