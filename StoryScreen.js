import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('window');

// --- EXPANDED STORY DATA ---
// This is an extended placeholder story to demonstrate the swiping functionality better.
const storyPages = [
  {
    id: '1',
    image: 'https://picsum.photos/id/40/600/400',
    text: 'Mia felt a little shy in a new place. Her family had just moved, and everything looked new and strange. But kindness and laughter were waiting just around the corner to bring her closer to new friends.',
  },
  {
    id: '2',
    image: 'https://picsum.photos/id/41/600/400',
    text: 'She sat alone in her new backyard, watching fireflies dance in the evening air. Suddenly, a little voice said, "Do you want to play?" It was Leo, a boy from next door, holding a jar with a tiny, glowing light inside.',
  },
  {
    id: '3',
    image: 'https://picsum.photos/id/42/600/400',
    text: 'Soon, Mia and Leo were joined by Lily and Sam. They shared stories and giggles under the gentle moonlight. Mia learned that even though she was new, she was not alone.',
  },
  {
    id: '4',
    image: 'https://picsum.photos/id/43/600/400',
    text: 'The next day was a new adventure. They built towering sandcastles that reached for the clouds and chased colorful butterflies in the sun-drenched meadow.',
  },
  {
    id: '5',
    image: 'https://picsum.photos/id/44/600/400',
    text: 'As the days passed, Mia’s shyness began to fade away. She realized that making new friends was a wonderful adventure filled with shared smiles and exciting games.',
  },
  {
    id: '6',
    image: 'https://picsum.photos/id/45/600/400',
    text: 'One night, as her mom tucked her into bed, Mia whispered, "I found the best treasure." Her mom smiled and asked, "What is it?" Mia replied, "True friends are a treasure more precious than any gem. And I found three!"',
  },
];

const StoryScreen = ({ navigation }) => {
  // --- STATE MANAGEMENT ---
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  // useRef to link the scroll view to the navigation buttons
  const scrollViewRef = useRef(null);
  const totalPages = storyPages.length;

  // --- NAVIGATION LOGIC ---
  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      const nextIndex = currentPageIndex + 1;
      setCurrentPageIndex(nextIndex);
      scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
    }
  };

  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      const prevIndex = currentPageIndex - 1;
      setCurrentPageIndex(prevIndex);
      scrollViewRef.current.scrollTo({ x: prevIndex * width, animated: true });
    }
  };

  // This function keeps the page number in sync with the swipe gesture
  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / width);
    if (pageIndex !== currentPageIndex) {
      setCurrentPageIndex(pageIndex);
    }
  };

  // --- SETTINGS LOGIC ---
  const toggleDarkMode = () => {
    setIsDarkMode(previousState => !previousState);
  };

  const increaseFontSize = () => {
    setFontSize(prevSize => prevSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => Math.max(12, prevSize - 2));
  };

  // --- CONDITIONAL STYLES ---
  const containerStyle = isDarkMode ? styles.darkContainer : styles.lightContainer;
  const textStyle = { fontSize: fontSize, color: isDarkMode ? '#E0E0E0' : '#333' };
  const settingsContentStyle = { backgroundColor: isDarkMode ? '#333' : 'white' };
  const settingsTextStyle = { color: isDarkMode ? 'white' : 'black' };
  const settingsValueStyle = { color: isDarkMode ? '#E0E0E0' : '#333' };

  return (
    <SafeAreaView style={[styles.safeArea, containerStyle]}>
      {/* Top Bar for title and close button */}
      <View style={styles.topBar}>
        <Text style={[styles.storyTitle, isDarkMode && { color: 'white' }]}>Story Screen</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area - Horizontal ScrollView for Swiping */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.horizontalScrollView}
      >
        {storyPages.map((page, index) => (
          <View key={page.id} style={styles.pageContent}>
            <Image
              source={{ uri: page.image }}
              style={styles.storyImage}
              resizeMode="cover"
            />
            <ScrollView contentContainerStyle={styles.textContainer}>
              <Text style={[styles.storyText, textStyle]}>{page.text}</Text>
            </ScrollView>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Control Bar for navigation and settings */}
      <View style={[styles.bottomBar, isDarkMode && styles.darkBottomBar]}>
        <View style={styles.leftControls}>
          <TouchableOpacity onPress={() => setShowSettings(true)}>
            <Text style={[styles.icon, isDarkMode && { color: 'white' }]}>⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.icon, isDarkMode && { color: 'white' }]}>▶</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerControls}>
          <TouchableOpacity onPress={handlePreviousPage} disabled={currentPageIndex === 0}>
            <Text style={[styles.navButton, currentPageIndex === 0 && styles.disabledNavButton]}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={[styles.pageNumber, isDarkMode && { color: '#B0B0B0' }]}>{`0${currentPageIndex + 1}/0${totalPages}`}</Text>
          <TouchableOpacity onPress={handleNextPage} disabled={currentPageIndex === totalPages - 1}>
            <Text style={[styles.navButton, currentPageIndex === totalPages - 1 && styles.disabledNavButton]}>{">"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightControls}>
          <TouchableOpacity>
            <Text style={[styles.icon, isDarkMode && { color: 'white' }]}>🔊</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings Modal - Renders as an overlay */}
      {showSettings && (
        <View style={styles.settingsOverlay}>
          <View style={[styles.settingsContent, settingsContentStyle]}>
            <View style={styles.settingsRow}>
              <TouchableOpacity onPress={decreaseFontSize}>
                <Text style={styles.fontSizeButton}>A</Text>
              </TouchableOpacity>
              <Text style={settingsValueStyle}>{Math.round((fontSize / 16) * 100)}%</Text>
              <TouchableOpacity onPress={increaseFontSize}>
                <Text style={styles.fontSizeButton}>A</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.settingsRow}>
              <Text style={settingsTextStyle}>Dark mode</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#FF6347' }}
                thumbColor={isDarkMode ? 'white' : '#f4f3f4'}
                onValueChange={toggleDarkMode}
                value={isDarkMode}
              />
            </View>
            <View style={styles.settingsRow}>
              <TouchableOpacity onPress={() => setShowSettings(false)} style={styles.closeSettingsButton}>
                <Text style={styles.closeSettingsButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // --- Screen Layout Styles ---
  safeArea: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: '#1E1E1E',
  },
  // --- Top Bar Styles ---
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  storyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 28,
    color: '#888',
  },
  // --- Main Content Styles ---
  horizontalScrollView: {
    flex: 1,
  },
  pageContent: {
    width: width,
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  storyImage: {
    width: '100%',
    height: height * 0.45, // Slightly larger image
    borderRadius: 15, // Slightly more rounded corners
    marginBottom: 20,
  },
  textContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  storyText: {
    lineHeight: 26, // Increased line height for readability
    fontWeight: '400', // Regular weight for better readability
  },
  // --- Bottom Bar Styles ---
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  darkBottomBar: {
    backgroundColor: '#1E1E1E',
    borderTopColor: '#444',
  },
  leftControls: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
    justifyContent: 'space-between',
  },
  rightControls: {
    width: 30,
    alignItems: 'flex-end',
  },
  centerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon: {
    fontSize: 26,
    color: '#555',
  },
  navButton: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6347',
    paddingHorizontal: 12,
  },
  disabledNavButton: {
    color: '#C0C0C0',
  },
  pageNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#888',
    paddingHorizontal: 10,
  },
  // --- Settings Modal Styles ---
  settingsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  settingsContent: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  settingsText: {
    fontSize: 20,
    fontWeight: '600',
  },
  settingsValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fontSizeButton: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  closeSettingsButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
  },
  closeSettingsButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default StoryScreen;