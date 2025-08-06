// app/SplashScreen.tsx
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const ASSETS = {
    girlReading: require('../assets/girl_reading_books.png'),
    moonCloud: require('../assets/moon_cloud.png'),
    star: require('../assets/star.png'),
    foxCloud: require('../assets/fox_cloud.png'),
    rabbitCloud: require('../assets/rabbit_cloud.png'),
    mmLogo: require('../assets/mm_logo.png'),
};

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            // Navigate after splash is done
            router.replace('/(app)/OnboardingScreenOne');
        }, 3000); // adjust time if needed

        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Top Floating Elements */}
            <Image source={ASSETS.moonCloud} style={styles.moonCloud} />
            <Image source={ASSETS.star} style={styles.topRightStar} />

            {/* Main Content */}
            <View style={styles.contentContainer}>
                <Image source={ASSETS.girlReading} style={styles.girlReading} />
                <Text style={styles.title}>eBook</Text>
                <Text style={styles.subtitle}>Stories for Sweet Dreams</Text>
                <Image source={ASSETS.mmLogo} style={styles.mmLogo} />
            </View>

            {/* Bottom Floating Elements */}
            <Image source={ASSETS.rabbitCloud} style={styles.rabbitCloud} />
            <Image source={ASSETS.foxCloud} style={styles.foxCloud} />

            <ActivityIndicator
                size="large"
                color="#F08C4B"
                style={styles.loadingSpinner}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F4EB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: height * 0.25,
    },
    girlReading: {
        width: width * 0.6,
        height: width * 0.6,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#3F3D56',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#8A8696',
        marginTop: 5,
    },
    mmLogo: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginTop: 10,
    },
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
    loadingSpinner: {
        position: 'absolute',
        bottom: height * 0.05,
    },
});
