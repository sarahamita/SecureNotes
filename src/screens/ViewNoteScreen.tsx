import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { decrypt, encryptionKey } from '../lib/utils';
const ViewNoteScreen = ({ route }) => {
  const { title: initialTitle, content: initialContent } = route.params;
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const [decryptedTitle, setDecryptedTitle] = useState('');
  const [decryptedContent, setDecryptedContent] = useState('');

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
      <View style={styles.input}>
        <Text>{decryptedTitle}</Text>
      </View>
      <Text style={styles.titleText}>Description</Text>
      <View style={styles.textarea}>
        <Text>{decryptedContent}</Text>
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
});

export default ViewNoteScreen;
