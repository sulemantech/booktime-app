import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image, // Import Image
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

const OnboardingScreenOne = ({ navigation, goToNextPage }) => {
  const [childName, setChildName] = useState('');
  const insets = useSafeAreaInsets();

  const isButtonEnabled = childName.trim().length > 0;

  const handleContinue = () => {
    if (goToNextPage && isButtonEnabled) {
      goToNextPage(null, { childName });
    }
  };

  const handleGesture = ({ nativeEvent }) => {
    const { translationX, translationY, state } = nativeEvent;

    if (
      state === State.END &&
      translationX < -50 &&
      Math.abs(translationY) < 50
    ) {
      handleContinue();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <PanGestureHandler onHandlerStateChange={handleGesture}>
        <View style={[styles.container, { paddingBottom: insets.bottom + 20 }]}>
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: '50%' }]} />
          </View>

          {/* Single Top Image (Moon/Cloud and Star combined) */}
          <Image
            source={require('./assets/top_combined.png')} // Replace with your combined top image path
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

          {/* Single Bottom Image (Bunny, Butterfly, Cat combined) */}
          <Image
            source={require('./assets/bottom_combined_image.png')} // Replace with your combined bottom image path
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
      </PanGestureHandler>
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
  topCombinedImage: {
    width: '100%', // Take full width
    height: 100, // Adjust height as needed to fit the combined image
    marginTop: 20,
    alignSelf: 'center', // Center the image horizontally
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20, // Add some top padding if needed to separate from the top image
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
    fontWeight:600,
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
    width: '120%', // Adjust width to allow parts to extend beyond the screen if needed
    height: 150, // Adjust height as needed to fit the combined image
    alignSelf: 'center', // Center the image horizontally
    marginBottom: 20, // Space above the button
    // You might need to add negative margins or absolute positioning here
    // if the combined image doesn't align perfectly with `width: '100%'`
    // and `alignSelf: 'center'`
    // For example:
    // marginLeft: -30, // Adjust to nudge left
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