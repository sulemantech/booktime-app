import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

/**
 * A screen to display the details of a single book.
 * It uses the useRouter and useLocalSearchParams hooks to get navigation functions and route parameters.
 */
const BookDetailScreen = () => {
    // Use the useRouter hook for navigation functions like back() and push()
    const router = useRouter();
    // Use the useLocalSearchParams hook to get the parameters passed to this screen
    const { bookTitle, bookImage } = useLocalSearchParams();

    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={[styles.fullScreenContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
                {/* Header with back button */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={28} color="#333" />
                    </TouchableOpacity>
                </View>

                {/* Book cover image */}
                <Image
                    source={{ uri: bookImage }}
                    style={styles.bookCover}
                    resizeMode="contain"
                />

                {/* Book information section */}
                <View style={styles.infoSection}>
                    <Text style={styles.bookTitle}>{bookTitle}</Text>
                    <Text style={styles.bookSubtitle}>Friends and Feelings</Text>

                    {/* Metadata row (words and images) */}
                    <View style={styles.metadataRow}>
                        <View style={styles.metadataItem}>
                            <Text style={styles.metadataIcon}>📖</Text>
                            <Text style={styles.metadataText}>100 words</Text>
                        </View>
                        <View style={styles.metadataItem}>
                            <Text style={styles.metadataIcon}>🖼️</Text>
                            <Text style={styles.metadataText}>15 images</Text>
                        </View>
                    </View>

                    {/* Action buttons (Read Now, Favorite, Share, Delete) */}
                    <View style={styles.actionButtonsRow}>
                        <TouchableOpacity 
                            style={styles.readButton} 
                            onPress={() => router.push('StoryScreen')}
                        >
                            <Text style={styles.readButtonText}>Read Now</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconButton}>
                            <Text style={styles.iconButtonText}>♥</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Text style={styles.iconButtonText}>⤢</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Text style={styles.iconButtonText}>🗑️</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Book description */}
                    <Text style={styles.descriptionText}>
                        Let's explore friendship and feelings with Mia and her new friends in 'Mia's New Friends'.
                    </Text>

                    {/* Credits section */}
                    <Text style={styles.creditsText}>
                        Written by: <Text style={styles.creditsValue}>Liam James</Text>
                    </Text>
                    <Text style={styles.creditsText}>
                        Illustration by: <Text style={styles.creditsValue}>Adam Ray</Text>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContent: {
        padding: 20,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    bookCover: {
        width: width * 0.8,
        height: width * 0.8 * 1.25,
        borderRadius: 12,
        marginBottom: 20,
    },
    infoSection: {
        width: '100%',
        alignItems: 'center',
    },
    bookTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    bookSubtitle: {
        fontSize: 16,
        color: '#FF6347',
        textAlign: 'center',
        marginBottom: 15,
    },
    metadataRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    metadataItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginHorizontal: 5,
    },
    metadataIcon: {
        fontSize: 16,
        marginRight: 5,
    },
    metadataText: {
        fontSize: 14,
        color: '#555',
    },
    actionButtonsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    readButton: {
        backgroundColor: '#FF6347',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 30,
        marginRight: 10,
    },
    readButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    iconButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    iconButtonText: {
        fontSize: 20,
        color: '#555',
    },
    descriptionText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 24,
    },
    creditsText: {
        fontSize: 14,
        color: '#888',
        marginBottom: 5,
    },
    creditsValue: {
        color: '#555',
        textDecorationLine: 'underline',
    },
});

export default BookDetailScreen;
