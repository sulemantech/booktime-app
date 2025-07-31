import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';

const { width } = Dimensions.get('window');

const BookDetailScreen = ({ route, navigation }) => {
  const { bookTitle, bookImage } = route.params;

  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: bookImage }}
          style={styles.bookCover}
          resizeMode="contain"
        />

        <View style={styles.infoSection}>
          <Text style={styles.bookTitle}>{bookTitle}</Text>
          <Text style={styles.bookSubtitle}>Friends and Feelings</Text>

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

          <View style={styles.actionButtonsRow}>
            {/* The new "Read Now" button */}
            <TouchableOpacity 
              style={styles.readButton} 
              onPress={() => navigation.navigate('StoryScreen')}
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

          <Text style={styles.descriptionText}>
            Let's explore friendship and feelings with Mia and her new friends in 'Mia's New Friends'.
          </Text>

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
    paddingBottom: 20,
  },
  backButton: {
    fontSize: 30,
    color: '#333',
  },
  bookCover: {
    width: width * 0.7,
    height: width * 0.7 * 1.25,
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
  // The new style for the "Read Now" button
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