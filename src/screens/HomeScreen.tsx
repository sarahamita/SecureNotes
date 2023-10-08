import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
  Button, 
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNotes } from '../contexts/NotesContext';
import { decrypt, encryptionKey } from '../lib/utils';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { notes, setNotes } = useNotes();
  const [decryptedTitle, setDecryptedTitle] = useState('');
  const [decryptedContent, setDecryptedContent] = useState('');
  
  const handleCreate = () => {
    navigation.navigate('CreateNoteScreen')
  }

  const handleDelete = async (id) => {
    setNotes(prevNotes => 
      prevNotes.filter(note => note.id !== id));

    try {
      await AsyncStorage.removeItem('encryptedNote');
      console.log('Data removed successfully');
    } catch (error) {
      console.log('Error removing data', error);
    }
  }

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

  const renderItem = ({ item }) => {
    // console.log('cek item', item)
    // const decryptedObject = JSON.parse(item);
    // const titleDecrypted = await decrypt(decryptedObject.title);
    // const contentDecrypted = await decrypt(decryptedObject.content);

    // setDecryptedTitle(titleDecrypted);
    // setDecryptedContent(contentDecrypted);

    return (
      <View style={styles.noteContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.noteTitle}>Note</Text>
          {/* <Text style={styles.noteTitle}>{item.title}</Text>
          <Text>{item.content}</Text> */}
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ViewNoteScreen', item)}
          >
            <Text style={styles.viewText}>VIEW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditNoteScreen', item)}
          >
            <Text style={styles.editText}>EDIT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.deleteText}>DELETE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } 
    
console.log('cek notes', notes)
  return (
    <View style={styles.container}>
      <Button title="Create Note" onPress={handleCreate} />
      <FlatList
        data={notes}
        renderItem={renderItem}
        // keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noteContainer: {
    backgroundColor: 'snow',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    height: 100,
    flex: 1,
  },
  contentContainer: {
    flex: 0.5,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // alignSelf: 'flex-end',
    // alignContent: 'flex-end',
    flex: 0.5,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
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
  }
});

export default HomeScreen;
