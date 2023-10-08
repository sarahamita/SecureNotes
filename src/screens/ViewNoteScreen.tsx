import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { decrypt } from '../lib/utils'
import { useNotes } from '../contexts/NotesContext';
;
const ViewNoteScreen = ({ route }) => {
  const navigation = useNavigation();

  const { id: initialId, title: initialTitle, content: initialContent } = route.params;
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [id, setId] = useState(initialId);
  const { notes, setNotes } = useNotes();

  const [decryptedTitle, setDecryptedTitle] = useState('');
  const [decryptedContent, setDecryptedContent] = useState('');

  const fetchData = async () => {
    try {
      const encryptedValue = await AsyncStorage.getItem('encryptedNote');
      const decryptedObject = JSON.parse(encryptedValue);

      if (encryptedValue !== null) {
        const decryptedTitle = await decrypt(decryptedObject.title);
        const decryptedContent = await decrypt(decryptedObject.content);

        setDecryptedTitle(decryptedTitle);
        setDecryptedContent(decryptedContent);
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

  const handleDelete = async (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));

    try {
      await AsyncStorage.removeItem('encryptedNote');
      navigation.navigate('HomeScreen')
    } catch (error) {
      console.log('Error removing data', error);
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Title</Text>
      <View style={styles.input}>
        <Text>{decryptedTitle}</Text>
      </View>
      <Text style={styles.titleText}>Description</Text>
      <View style={styles.textarea}>
        <Text>{decryptedContent}</Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditNoteScreen', route.params)}
        >
          <Text style={styles.editText}>EDIT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(id)}
        >
          <Text style={styles.deleteText}>DELETE</Text>
        </TouchableOpacity>
      </View>
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
    padding: 8,
    backgroundColor: 'snow',
  },
  textarea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    backgroundColor: 'snow',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 0.5,
  },
  viewText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#4287f5',
    marginRight: 10,
  },
  editText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fcba03',
    marginRight: 10,
  },
  deleteText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#C0392B'
  },
});

export default ViewNoteScreen;
