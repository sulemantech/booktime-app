import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

// You will need to place your images in your project's `assets` folder
// and reference them here.
const ASSETS = {
  girlReading: require('./assets/girl_reading_books.png'),
  moonCloud: require('./assets/moon_cloud.png'),
  star: require('./assets/star.png'),
  foxCloud: require('./assets/fox_cloud.png'),
  rabbitCloud: require('./assets/rabbit_cloud.png'),
  // butterfly: require('./assets/butterfly.png'),
  mmLogo: require('./assets/mm_logo.png'),
};

const { width, height } = Dimensions.get('window');

// This is the main splash screen component.
const SplashScreen = ({ onFinishLoading }) => {
  useEffect(() => {
    // Simulate app initialization or data loading
    const timer = setTimeout(() => {
      // Call the function passed from the parent to signal loading is complete
      if (onFinishLoading) {
        onFinishLoading();
      }
    }, 5000); // The splash screen will be visible for 3 seconds

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [onFinishLoading]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Floating Elements */}
      <Image source={ASSETS.moonCloud} style={styles.moonCloud} />
      <Image source={ASSETS.star} style={styles.topRightStar} />

      {/* Main Content: Girl, Title, Subtitle, and Logo */}
      <View style={styles.contentContainer}>
        <Image source={ASSETS.girlReading} style={styles.girlReading} />
        <Text style={styles.title}>eBook</Text>
        <Text style={styles.subtitle}>Stories for Sweet Dreams</Text>
        <Image source={ASSETS.mmLogo} style={styles.mmLogo} />
      </View>

      {/* Bottom Floating Elements */}
      <Image source={ASSETS.rabbitCloud} style={styles.rabbitCloud} />
      <Image source={ASSETS.foxCloud} style={styles.foxCloud} />
      {/* <Image source={ASSETS.butterfly} style={styles.butterfly} /> */}

      {/* Loading Spinner */}
      <ActivityIndicator 
        size="large" 
        color="#F08C4B" 
        style={styles.loadingSpinner} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EB', // The light, off-white background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Main content container to center the girl, text, and logo
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // Position to allow other elements to float around it
    top: height * 0.25, // Adjust this value to vertically center the content
  },
  girlReading: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#3F3D56', // A dark purple-like color
    marginTop: 20,
    // Add custom font family here if needed, e.g., fontFamily: 'PlayfairDisplay-Bold'
  },
  subtitle: {
    fontSize: 16,
    color: '#8A8696', // A slightly lighter gray color
    marginTop: 5,
    // Add custom font family here if needed
  },
  mmLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginTop: 10,
  },
  // Absolutely positioned floating elements
  moonCloud: {
    position: 'absolute',
    top: height * 0.08,
    left: width * 0.05,
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'contain',
  },
  topRightStar: {
    position: 'absolute',
    top: height * 0.08,
    right: width * 0.05,
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'contain',
  },
  rabbitCloud: {
    position: 'absolute',
    bottom: height * 0.2,
    left: width * 0.05,
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: 'contain',
  },
  foxCloud: {
    position: 'absolute',
    bottom: height * 0.2,
    right: width * 0.05,
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'contain',
  },
  butterfly: {
    position: 'absolute',
    bottom: height * 0.35,
    left: width * 0.3,
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: 'contain',
  },
  loadingSpinner: {
    position: 'absolute',
    bottom: height * 0.05,
  },
});

export default SplashScreen;
