import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

const HeaderIcon = ({ source, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
    <Text style={styles.iconPlaceholder}>{source}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.name}>MetaFront</Text>
          </View>
          <View style={styles.headerRight}>
            <HeaderIcon source="👑" />
            <HeaderIcon source="🌐" />
            <HeaderIcon source="🔍" onPress={() => navigation.navigate('SearchScreen')} />
          </View>
        </View>

        {/* Sections */}
        <SectionHeader title="My Stories" navigation={navigation} />
        <FlatList
          data={bookData}
          renderItem={({ item }) => <BookItem {...item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />

        <SectionHeader title="Continue Reading" navigation={navigation} />
        <FlatList
          data={miaData}
          renderItem={({ item }) => <BookItem {...item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />

        <SectionHeader title="Read Again" navigation={navigation} />
        <FlatList
          data={tenInBedData}
          renderItem={({ item }) => <BookItem {...item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />

        <SectionHeader title="Friends and Feelings" navigation={navigation} />
        <FlatList
          data={miaData}
          renderItem={({ item }) => <BookItem {...item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />

        <SectionHeader title="We Can Count" navigation={navigation} />
        <FlatList
          data={tenInBedData}
          renderItem={({ item }) => <BookItem {...item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
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
    gap: 10,
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
    paddingHorizontal: 15,
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
    paddingLeft: 15,
    marginBottom: 20,
  },
  bookItem: {
    marginRight: 15,
    width: 120,
  },
  bookImage: {
    width: 120,
    height: 160,
    borderRadius: 8,
    backgroundColor: '#ddd',
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
