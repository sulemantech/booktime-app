import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

// Combined placeholder data for a full list of books
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

const BookCard = ({ title, author, image, navigation }) => (
  <TouchableOpacity 
    style={styles.bookCard}
    onPress={() => navigation.navigate('BookDetail', { bookTitle: title, bookImage: image })}
  >
    <Image source={{ uri: image }} style={styles.bookImage} resizeMode="cover" />
    <View style={styles.bookInfo}>
      <Text style={styles.bookTitle}>{title}</Text>
      <Text style={styles.bookAuthor}>{author}</Text>
    </View>
  </TouchableOpacity>
);

const ViewAllScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Stories</Text>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={allBooksData}
        renderItem={({ item }) => <BookCard {...item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display books in two columns
        contentContainerStyle={styles.listContainer}
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
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSpacer: {
    width: 40,
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
  },
  bookAuthor: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 2,
  },
});

export default ViewAllScreen;