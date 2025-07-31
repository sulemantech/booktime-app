import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

const OnboardingScreenOne = ({ navigation }) => {
  const [childName, setChildName] = useState('');
  const isButtonEnabled = childName.trim().length > 0;

  const handleContinue = () => {
    if (isButtonEnabled) {
      navigation.navigate('OnboardingTwo', { childName });
    }
  };

  const handleGesture = ({ nativeEvent }) => {
    const { translationX, translationY } = nativeEvent;
    if (translationX < -50 && Math.abs(translationY) < 50) {
      handleContinue();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <View style={styles.container}>
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: '50%' }]} />
          </View>

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
    paddingBottom: height * 0.05,
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
    color: '#8A8696',
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
