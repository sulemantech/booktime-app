import React, { useState, useRef, useEffect } from 'react';
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

const OnboardingScreenFour = ({ route, navigation }) => {
  const { childName, childAge, interests } = route.params || {};
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const insets = useSafeAreaInsets();

  const isButtonEnabled = selectedAvatar !== null;

  useEffect(() => {
    console.log('Selected Avatar:', selectedAvatar);
  }, [selectedAvatar]);

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
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 50 && Math.abs(gestureState.dy) < 20,
      onPanResponderRelease: (_, gestureState) => {
        const { dx, dy } = gestureState;
        if (dx < -50 && Math.abs(dy) < 20 && isButtonEnabled) {
          handleContinue();
        } else if (dx > 50 && Math.abs(dy) < 20 && navigation.canGoBack()) {
          navigation.goBack();
        }
      },
    })
  ).current;

  const avatarCards = [
    { id: 'avatar1', image: require('./assets/avatar1.png'), backgroundColor: '#7E95D4' },
    { id: 'avatar2', image: require('./assets/avatar2.png'), backgroundColor: '#7E95D4'  },
    { id: 'avatar3', image: require('./assets/avatar3.png'), backgroundColor: '#7E95D4'  },
    { id: 'avatar4', image: require('./assets/avatar4.png'), backgroundColor: '#E69686'  },
    { id: 'avatar5', image: require('./assets/avatar5.png'), backgroundColor: '#E69686' },
    { id: 'avatar6', image: require('./assets/avatar6.png'), backgroundColor: '#E69686' },
    { id: 'avatar7', image: require('./assets/avatar7.png'), backgroundColor: '#7BC4BD' },
    { id: 'avatar8', image: require('./assets/avatar8.png'), backgroundColor: '#7BC4BD' },
    { id: 'avatar9', image: require('./assets/avatar9.png') , backgroundColor: '#7BC4BD'},
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '100%' }]} />
        </View>

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
    { backgroundColor: card.backgroundColor || 'white' },
    selectedAvatar === card.id && styles.selectedCardBorder,
  ]}
  onPress={() =>
    setSelectedAvatar((prev) => (prev === card.id ? null : card.id))
  }
>
  <Image source={card.image} style={styles.cardImage} />
</TouchableOpacity>


            ))}
          </View>
        </View>

        <View
          {...panResponder.panHandlers}
          style={{ paddingBottom: insets.bottom + 20 }}
        >
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
    paddingTop: 30,
    justifyContent: 'space-between',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginTop: 10,
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
  paddingHorizontal: 10,
  marginTop: 20,
},
  avatarCard: {
  width: (width - 80) / 3, // 3 per row, accounting for spacing
  height: (width - 80) / 3,
  backgroundColor: 'white',
  borderRadius: 100,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 20,
},
selectedCardBorder: {
  borderWidth: 3,
  borderColor: '#F08C4B',
  elevation: 4,
  shadowColor: '#F08C4B',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
},
  selectedCard: {
    borderWidth: 3,
    borderColor: '#F08C4B',
    backgroundColor: '#FFF1E6',
    elevation: 4,
    shadowColor: '#F08C4B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  cardImage: {
  width: '90%',
  height: '90%',
  resizeMode: 'contain',
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
