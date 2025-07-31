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

const OnboardingScreenTwo = ({ route, navigation }) => {
  // Get the child's name from the previous screen's navigation params
  const { childName } = route.params || {};

  const [selectedAge, setSelectedAge] = useState(null);
  const isButtonEnabled = selectedAge !== null;

  const handleContinue = () => {
    // Save the selected age and navigate to the next screen.
    // For this example, we'll navigate to the Home screen.
    navigation.navigate('Home', { childName, childAge: selectedAge });
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
        // Check for a right swipe to go back to the previous screen
        if (dx > 50 && Math.abs(dy) < 20) {
            navigation.goBack();
        }
      },
    })
  ).current;

  const ageCards = [
    {
      id: 'baby',
      title: 'Baby',
      ages: 'Ages 1–3',
      image: require('./assets/baby.png'),
    },
    {
      id: 'preschooler',
      title: 'Preschooler',
      ages: 'Ages 4–6',
      image: require('./assets/preschooler.png'),
    },
    // Add more cards here as needed for your design
    {
      id: 'child',
      title: 'Child',
      ages: 'Ages 7–10',
      image: require('./assets/child.png'),
    },
    {
      id: 'preteen',
      title: 'Pre-teen',
      ages: 'Ages 11+',
      image: require('./assets/preteen.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container} {...panResponder.panHandlers}>
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '75%' }]} />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.title}>
            How old is {childName}?
          </Text>
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
  // Age Selection Card Grid
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    width: width - 40,
  },
  ageCard: {
    width: (width - 60) / 2, // 20 padding on each side, 20 in between
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

export default OnboardingScreenTwo;
