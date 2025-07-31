import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import BookDetailScreen from './BookDetailScreen';
import StoryScreen from './StoryScreen';
import ViewAllScreen from './ViewAllScreen';
import SearchScreen from './SearchScreen'; // <-- ADD THIS LINE

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="BookDetail" 
          component={BookDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="StoryScreen" 
          component={StoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ViewAll" 
          component={ViewAllScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SearchScreen" // <-- ADD THIS SCREEN
          component={SearchScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;