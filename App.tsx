import React, { useState } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import EditNoteScreen from './src/screens/EditNoteScreen';
import CreateNoteScreen from './src/screens/CreateNoteScreen';
import ViewNoteScreen from './src/screens/ViewNoteScreen';
import { NotesProvider } from './src/contexts/NotesContext';

const Stack = createNativeStackNavigator();

const App = () => {
  const navigationRef = useNavigationContainerRef();

  const linking = {
    prefixes: ['https://mynotes.com', 'mynotes://'],
    config: {
      screens: {
        Home: 'feed/:sort',
      },
    },
  };

  return (
    <NotesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={'LoginScreen'}
            component={LoginScreen}
          />
          <Stack.Screen
            name={'HomeScreen'}
            component={HomeScreen}
          />
          <Stack.Screen
            name={'EditNoteScreen'}
            component={EditNoteScreen}
          />
          <Stack.Screen
            name={'CreateNoteScreen'}
            component={CreateNoteScreen}
          />
          <Stack.Screen
            name={'ViewNoteScreen'}
            component={ViewNoteScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesProvider>
  );
}

export default App;
