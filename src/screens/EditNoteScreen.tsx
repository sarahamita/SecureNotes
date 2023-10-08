import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet ,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNotes } from '../contexts/NotesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { encrypt, decrypt, encryptionKey } from '../lib/utils';

const EditNoteScreen = ({ route }) => {
  const navigation = useNavigation();

  const { id, title: initialTitle, content: initialContent } = route.params;
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [idNote, setIdNote] = useState(id);
  const { notes, setNotes } = useNotes();
  const [decryptedTitle, setDecryptedTitle] = useState('');
  const [decryptedContent, setDecryptedContent] = useState('');

  // const handleSave = () => {
  //   setNotes(prevNotes =>
  //     prevNotes.map(note =>
  //       note.id === id ? { ...note, title, content } : note
  //     )
  //   );
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
      const encryptedNote = { id: idNote, ...data};

      setNotes(prevNotes => [...prevNotes, encryptedNote]); // Add the encrypted note to the notes state

      await AsyncStorage.setItem('encryptedNote', JSON.stringify(encryptedNote));
      navigation.goBack();
      console.log('note successfully stored')
    } catch (error) {
      console.log('error storing data', error);
    }
  };

  const fetchData = async () => {
    try {
      const encryptedValue = await AsyncStorage.getItem('encryptedNote');
      const decryptedObject = JSON.parse(encryptedValue);

      console.log('cek decryptedObject', decryptedObject)

      if (encryptedValue !== null) {
        const decryptedTitle = await decrypt(decryptedObject.title);
        const decryptedContent = await decrypt(decryptedObject.content);

        setDecryptedTitle(decryptedTitle);
        setDecryptedContent(decryptedContent);

        console.log("cek decrypt" + decryptedTitle + 'and' + decryptedContent);
      }
      else {
        console.log('data is does not exists');
      }
    } catch (error) {
      console.log('error while fetching data', error);
    }
  };

  useEffect(() =>{
    fetchData()
  })

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Title</Text>
      <TextInput
        style={styles.input}
        value={decryptedTitle}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <Text style={styles.titleText}>Description</Text>
      <TextInput
        style={styles.textarea}
        value={decryptedContent}
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

export default EditNoteScreen;
