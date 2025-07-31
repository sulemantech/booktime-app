import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

// Placeholder data with more books for better visual presentation
const bookData = [
  { id: '1', title: 'The Little Bear Who Lost His Roar', author: 'PENNY DALE', image: 'https://picsum.photos/id/10/200/300' },
  { id: '2', title: 'The Magical Treehouse Adventure', author: 'JAMES L. REID', image: 'https://picsum.photos/id/11/200/300' },
  { id: '3', title: 'The Dreamer’s Blanket', author: 'LISA RAY', image: 'https://picsum.photos/id/12/200/300' },
  { id: '4', title: 'The Starry-Eyed Owl', author: 'PENNY DALE', image: 'https://picsum.photos/id/13/200/300' },
  { id: '5', title: 'The Brave Knight’s Quest', author: 'JAMES L. REID', image: 'https://picsum.photos/id/14/200/300' },
  { id: '6', title: 'The Secret of the Whispering Woods', author: 'LISA RAY', image: 'https://picsum.photos/id/15/200/300' },
];

const miaData = [
  { id: '1', title: "Mia's New Friends", author: 'PENNY DALE', image: 'https://picsum.photos/id/16/200/300' },
  { id: '2', title: 'Mia and the Moonbeam', author: 'PENNY DALE', image: 'https://picsum.photos/id/17/200/300' },
  { id: '3', title: 'Mia and the Hidden Garden', author: 'PENNY DALE', image: 'https://picsum.photos/id/18/200/300' },
  { id: '4', title: 'Mia’s First Day of School', author: 'PENNY DALE', image: 'https://picsum.photos/id/19/200/300' },
  { id: '5', title: 'Mia and the Wishing Star', author: 'PENNY DALE', image: 'https://picsum.photos/id/20/200/300' },
];

const tenInBedData = [
  { id: '1', title: 'Ten In The Bed', author: 'PENNY DALE', image: 'https://picsum.photos/id/21/200/300' },
  { id: '2', title: 'Ten Little Ducks', author: 'PENNY DALE', image: 'https://picsum.photos/id/22/200/300' },
  { id: '3', title: 'Ten Jumping Monkeys', author: 'PENNY DALE', image: 'https://picsum.photos/id/23/200/300' },
  { id: '4', title: 'Ten Tiny Penguins', author: 'PENNY DALE', image: 'https://picsum.photos/id/24/200/300' },
  { id: '5', title: 'Ten Brave Bears', author: 'PENNY DALE', image: 'https://picsum.photos/id/25/200/300' },
];

// Reusable component for a single book item
const BookItem = ({ title, author, image, navigation }) => (
  <TouchableOpacity
    style={styles.bookItem}
    onPress={() => navigation.navigate('BookDetail', { bookTitle: title, bookImage: image })}
  >
    <Image source={{ uri: image }} style={styles.bookImage} resizeMode="cover" />
    <Text style={styles.bookTitle}>{title}</Text>
    <Text style={styles.bookAuthor}>{author}</Text>
  </TouchableOpacity>
);

// REVISED: Reusable component for a section header (e.g., "My Stories")
const SectionHeader = ({ title, navigation }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity onPress={() => navigation.navigate('ViewAll')}>
      <View style={styles.viewAllContainer}>
        <Text style={styles.viewAllText}>view all</Text>
        <Text style={styles.arrowIcon}>❯</Text>
      </View>
    </TouchableOpacity>
  </View>
);

// Placeholder for header icons - Search icon is now a TouchableOpacity
const HeaderIcon = ({ source, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
    <Text style={styles.iconPlaceholder}>{source}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.name}>MetaFront</Text>
          </View>
          <View style={styles.headerRight}>
            <HeaderIcon source="👑" />
            <HeaderIcon source="🌐" />
            {/* Tapping this icon now navigates to the Search screen */}
            <HeaderIcon source="🔍" onPress={() => navigation.navigate('SearchScreen')} />
          </View>
        </View>

        {/* My Stories Section */}
        <SectionHeader title="My Stories" navigation={navigation} />
        <FlatList
          data={bookData}
          renderItem={({ item }) => <BookItem {...item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />

        {/* Continue Reading Section */}
        <SectionHeader title="Continue Reading" navigation={navigation} />
        <FlatList
          data={miaData}
          renderItem={({ item }) => <BookItem {...item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />

        {/* Read Again Section */}
        <SectionHeader title="Read Again" navigation={navigation} />
        <FlatList
          data={tenInBedData}
          renderItem={({ item }) => <BookItem {...item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />

        {/* Friends and Feelings Section */}
        <SectionHeader title="Friends and Feelings" navigation={navigation} />
        <FlatList
          data={miaData}
          renderItem={({ item }) => <BookItem {...item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />

        {/* We Can Count Section */}
        <SectionHeader title="We Can Count" navigation={navigation} />
        <FlatList
          data={tenInBedData}
          renderItem={({ item }) => <BookItem {...item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />

        {/* Empty space at the bottom for better scrolling */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerLeft: {
    flexDirection: 'column',
  },
  greeting: {
    fontSize: 16,
    color: '#888',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlaceholder: {
    fontSize: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#888',
    marginRight: 5,
  },
  arrowIcon: {
    fontSize: 12,
    color: '#888',
  },
  horizontalList: {
    marginBottom: 10,
  },
  bookItem: {
    marginRight: 15,
    width: 120,
  },
  bookImage: {
    width: 120,
    height: 160,
    borderRadius: 8,
  },
  bookTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  bookAuthor: {
    fontSize: 12,
    color: '#888',
  },
});

export default HomeScreen;