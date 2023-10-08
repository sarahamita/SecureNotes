import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet,
  Alert, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNotes } from '../contexts/NotesContext';
import { generateRandomString, encrypt, encryptionKey } from '../lib/utils';

const CreateNoteScreen = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { notes, setNotes } = useNotes();

  const randomId = generateRandomString(8);
  const noteEncryptionKey = generateRandomString(16);

  // const handleSave = () => {
  //   setNotes(prevNotes => [...prevNotes, { id: randomId, title: title, content: content }]);
  //   navigation.goBack();
  // };

  // const handleSave = () => {
  //   const encryptedNote = encryptNote(
  //     { id: randomId, title: title, content: content }, // Single note object
  //     noteEncryptionKey
  //   );
  //   console.log('cek apa', encryptedNote)
  
  //   setNotes(prevNotes => [...prevNotes, { id: randomId, title: title, content: content }]); // Add the encrypted note to the notes state
  //   navigation.goBack();
  // };

  const handleSave = async () => {
    if (title === "" || content === "") {
      Alert.alert("Please enter values for both.");
      return;
    }
    try {
      const encryptedTitle = encrypt(title);
      const encryptedContent = encrypt(content);
      const data = { title: encryptedTitle, content: encryptedContent };
      const encryptedNote = { id: randomId, ...data};

      setNotes(prevNotes => [...prevNotes, encryptedNote]); // Add the encrypted note to the notes state

      await AsyncStorage.setItem('encryptedNote', JSON.stringify(encryptedNote));
      navigation.goBack();
      console.log('note successfully stored')
    } catch (error) {
      console.log('error storing data', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <Text style={styles.titleText}>Description</Text>
      <TextInput
        style={styles.textarea}
        value={content}
        onChangeText={setContent}
        multiline
        placeholder="Description"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: 'snow',
  },
  textarea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: 'snow',
  },
});

export default CreateNoteScreen;
