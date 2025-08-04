import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
// 📚 All combined books
const allBooksData = [
  { id: '1', title: 'The Little Bear Who Lost His Roar', author: 'PENNY DALE', image: 'https://picsum.photos/id/10/200/300' },
  { id: '2', title: 'The Magical Treehouse Adventure', author: 'JAMES L. REID', image: 'https://picsum.photos/id/11/200/300' },
  { id: '3', title: 'The Dreamer’s Blanket', author: 'LISA RAY', image: 'https://picsum.photos/id/12/200/300' },
  { id: '4', title: 'The Starry-Eyed Owl', author: 'PENNY DALE', image: 'https://picsum.photos/id/13/200/300' },
  { id: '5', title: 'The Brave Knight’s Quest', author: 'JAMES L. REID', image: 'https://picsum.photos/id/14/200/300' },
  { id: '6', title: 'The Secret of the Whispering Woods', author: 'LISA RAY', image: 'https://picsum.photos/id/15/200/300' },
  { id: '7', title: "Mia's New Friends", author: 'PENNY DALE', image: 'https://picsum.photos/id/16/200/300' },
  { id: '8', title: 'Mia and the Moonbeam', author: 'PENNY DALE', image: 'https://picsum.photos/id/17/200/300' },
  { id: '9', title: 'Mia and the Hidden Garden', author: 'PENNY DALE', image: 'https://picsum.photos/id/18/200/300' },
  { id: '10', title: 'Mia’s First Day of School', author: 'PENNY DALE', image: 'https://picsum.photos/id/19/200/300' },
  { id: '11', title: 'Mia and the Wishing Star', author: 'PENNY DALE', image: 'https://picsum.photos/id/20/200/300' },
  { id: '12', title: 'Ten In The Bed', author: 'PENNY DALE', image: 'https://picsum.photos/id/21/200/300' },
  { id: '13', title: 'Ten Little Ducks', author: 'PENNY DALE', image: 'https://picsum.photos/id/22/200/300' },
  { id: '14', title: 'Ten Jumping Monkeys', author: 'PENNY DALE', image: 'https://picsum.photos/id/23/200/300' },
  { id: '15', title: 'Ten Tiny Penguins', author: 'PENNY DALE', image: 'https://picsum.photos/id/24/200/300' },
  { id: '16', title: 'Ten Brave Bears', author: 'PENNY DALE', image: 'https://picsum.photos/id/25/200/300' },
];

const BookCard = ({ item, navigation }) => (
  <TouchableOpacity
    style={styles.bookCard}
    onPress={() => navigation.navigate('BookDetail', {
      bookTitle: item.title,
      bookImage: item.image,
    })}
  >
    <Image source={{ uri: item.image }} style={styles.bookImage} resizeMode="cover" />
    <View style={styles.bookInfo}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookAuthor}>{item.author}</Text>
    </View>
  </TouchableOpacity>
);

const SearchScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = allBooksData.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top + 20 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for stories..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredBooks}
        renderItem={({ item }) => <BookCard item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No books found</Text>
          </View>
        )}
      />
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
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    paddingRight: 10,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchBar: {
    flex: 1,
    height: 45,
    backgroundColor: '#E8E8E8',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    padding: 10,
  },
  bookCard: {
    flex: 1,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    paddingBottom: 10,
  },
  bookImage: {
    width: '100%',
    height: 180,
  },
  bookInfo: {
    padding: 10,
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    color: '#333',
  },
  bookAuthor: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});

export default SearchScreen;
