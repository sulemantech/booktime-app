import { useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');

// --- EXPANDED STORY DATA ---
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

const StoryScreen = () => {
    const insets = useSafeAreaInsets();
    // Use the useRouter hook for navigation functions
    const router = useRouter();

    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [showSettings, setShowSettings] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const [bottomBarHeight, setBottomBarHeight] = useState(70);
    const [topBarHeight, setTopBarHeight] = useState(60);
    const [isReading, setIsReading] = useState(false);

    const scrollViewRef = useRef(null);
    const totalPages = storyPages.length;

    /**
     * Toggles read aloud functionality for the current page.
     * Stops any ongoing speech and starts a new one if not already reading.
     */
    const handleReadAloud = () => {
        const currentText = storyPages[currentPageIndex].text;

        if (isReading) {
            Speech.stop();
            setIsReading(false);
        } else {
            Speech.speak(currentText, {
                rate: 0.85,
                onDone: () => setIsReading(false),
                onStopped: () => setIsReading(false),
            });
            setIsReading(true);
        }
    };

    /**
     * Navigates to the next page of the story.
     * Stops any ongoing speech before moving.
     */
    const handleNextPage = () => {
        if (currentPageIndex < totalPages - 1) {
            Speech.stop(); // 👈 stop audio
            setIsReading(false); // 👈 update state

            const nextIndex = currentPageIndex + 1;
            setCurrentPageIndex(nextIndex);
            scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
        }
    };

    /**
     * Navigates to the previous page of the story.
     * Stops any ongoing speech before moving.
     */
    const handlePreviousPage = () => {
        if (currentPageIndex > 0) {
            Speech.stop(); // 👈 stop audio
            setIsReading(false); // 👈 update state

            const prevIndex = currentPageIndex - 1;
            setCurrentPageIndex(prevIndex);
            scrollViewRef.current.scrollTo({ x: prevIndex * width, animated: true });
        }
    };

    /**
     * Updates the current page index based on scroll position.
     * @param {object} event - The scroll event object.
     */
    const onScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const pageIndex = Math.round(contentOffsetX / width);
        if (pageIndex !== currentPageIndex) {
            setCurrentPageIndex(pageIndex);
        }
    };

    /**
     * Toggles the dark mode theme.
     */
    const toggleDarkMode = () => {
        setIsDarkMode(previousState => !previousState);
    };

    /**
     * Increases the font size for the story text.
     */
    const increaseFontSize = () => {
        setFontSize(prevSize => prevSize + 2);
    };

    /**
     * Decreases the font size for the story text, with a minimum size of 12.
     */
    const decreaseFontSize = () => {
        setFontSize(prevSize => Math.max(12, prevSize - 2));
    };

    /**
     * Calculates the height of the bottom bar on layout.
     * @param {object} event - The layout event object.
     */
    const onBottomBarLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        const intrinsicHeight = height - insets.bottom;
        if (bottomBarHeight !== intrinsicHeight) {
            setBottomBarHeight(intrinsicHeight);
        }
    };

    /**
     * Calculates the height of the top bar on layout.
     * @param {object} event - The layout event object.
     */
    const onTopBarLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        const intrinsicHeight = height - insets.top;
        if (topBarHeight !== intrinsicHeight) {
            setTopBarHeight(intrinsicHeight);
        }
    };

    const containerStyle = isDarkMode ? styles.darkContainer : styles.lightContainer;
    const textStyle = { fontSize: fontSize, color: isDarkMode ? '#E0E0E0' : '#333' };
    const settingsContentStyle = { backgroundColor: isDarkMode ? '#333' : 'white' };
    const settingsTextStyle = { color: isDarkMode ? 'white' : 'black' };
    const settingsValueStyle = { color: isDarkMode ? '#E0E0E0' : '#333' };

    const currentTopBarHeight = topBarHeight > 0 ? topBarHeight : 60;
    const currentBottomBarHeight = bottomBarHeight > 0 ? bottomBarHeight : 70;
    const availableContentHeight = height - currentTopBarHeight - currentBottomBarHeight;
    const storyImageCalculatedHeight = availableContentHeight * 0.55;
    const settingsOverlayHeight = height * 0.4;
    const settingsOverlayTop = height - (currentBottomBarHeight + insets.bottom) - settingsOverlayHeight;


    return (
        <SafeAreaView style={[styles.safeArea, containerStyle]}>
            <View style={[styles.topBar, { paddingTop: insets.top }]} onLayout={onTopBarLayout}>
                <TouchableOpacity
                    // Replaced navigation.goBack() with router.back()
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back-outline" size={26} color={isDarkMode ? 'white' : '#333'} />
                </TouchableOpacity>

                <Text style={[styles.storyTitle, isDarkMode && { color: 'white' }]}>
                    Story Screen
                </Text>

                <View style={{ width: 26 }} />
            </View>



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
                    <View key={page.id} style={[styles.pageContent, { height: availableContentHeight }]}>
                        <Image
                            source={{ uri: page.image }}
                            style={[styles.storyImage, { height: storyImageCalculatedHeight }]}
                            resizeMode="cover"
                        />
                        <ScrollView contentContainerStyle={styles.textContainer}>
                            <Text style={[styles.storyText, textStyle]}>{page.text}</Text>
                        </ScrollView>
                    </View>
                ))}
            </ScrollView>

            <View
                style={[styles.bottomBar, isDarkMode && styles.darkBottomBar, { paddingBottom: insets.bottom }]}
                onLayout={onBottomBarLayout}
            >
                <View style={styles.leftControls}>
                    <TouchableOpacity onPress={() => setShowSettings(true)} style={styles.controlButton}>
                        <Text style={[styles.icon, isDarkMode && { color: 'white' }]}>⚙️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleReadAloud} style={styles.controlButton}>
                        <Text style={[styles.icon, isDarkMode && { color: 'white' }]}>▶</Text>
                    </TouchableOpacity>
                </View>
                <View style={[
                    styles.centerControls,
                    { backgroundColor: isDarkMode ? '#3A3A3A' : '#F5F5F5' }
                ]}>
                    <TouchableOpacity
                        onPress={handlePreviousPage}
                        disabled={currentPageIndex === 0}
                        style={styles.navButtonWrapper}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={26}
                            color={currentPageIndex === 0 ? '#C0C0C0' : '#FF6347'}
                        />
                    </TouchableOpacity>

                    <Text style={[
                        styles.pageNumber,
                        { color: isDarkMode ? '#B0B0B0' : '#666' }
                    ]}>
                        {`${currentPageIndex + 1}/${totalPages}`}
                    </Text>

                    <TouchableOpacity
                        onPress={handleNextPage}
                        disabled={currentPageIndex === totalPages - 1}
                        style={styles.navButtonWrapper}
                    >
                        <Ionicons
                            name="chevron-forward"
                            size={26}
                            color={currentPageIndex === totalPages - 1 ? '#C0C0C0' : '#FF6347'}
                        />
                    </TouchableOpacity>
                </View>



                <View style={styles.rightControls}>
                    <TouchableOpacity onPress={handleReadAloud} style={styles.controlButton}>
                        <Text style={[styles.icon, isDarkMode && { color: 'white' }]}>
                            {isReading ? '⏹' : '�'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Settings Modal - Renders as an overlay */}
            {showSettings && (
                <View style={[styles.settingsOverlay, { top: settingsOverlayTop }]}>
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
    topBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        position: 'relative',
    },
    backButton: {
        padding: 10,
        width: 40,
        alignItems: 'flex-start',
    },
    storyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    placeholder: {
        width: 40, // Matches backButton width to balance layout
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    storyImage: {
        width: '100%',
        borderRadius: 15,
        marginBottom: 20,
    },
    textContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    storyText: {
        lineHeight: 26,
        fontWeight: '400',
    },
    // --- Bottom Bar Styles ---
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 0,
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
            },
            android: {
                elevation: 12,
            },
        }),
    },
    leftControls: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0.2, // Allow left controls to take up some flexible space
        justifyContent: 'flex-start', // Push items to the left
    },
    rightControls: {
        flex: 0.1, // Allow right controls to take up less flexible space
        alignItems: 'flex-end', // Push items to the right
    },
    centerControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 24,
        paddingHorizontal: 18,    // wider horizontally
        paddingVertical: 10,      // thicker vertically
        minWidth: 140,            // wider overall
        alignSelf: 'center',
    },
    controlButton: {
        padding: 5,
    },
    icon: {
        fontSize: 24,
        color: '#555',
    },
    navButtonWrapper: {
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    navButton: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FF6347',
    },
    disabledNavButton: {
        color: '#C0C0C0',
    },
    pageNumber: {
        fontSize: 16,
        fontWeight: '600',
        color: '#888',
        paddingHorizontal: 5, // Reduced padding
    },
    // --- Settings Modal Styles ---
    settingsOverlay: {
        position: 'absolute',
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