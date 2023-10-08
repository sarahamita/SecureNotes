import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
  Button, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useNotes } from '../contexts/NotesContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { notes, setNotes } = useNotes();
  
  const handleCreate = () => {
    navigation.navigate('CreateNoteScreen')
  }
  
  const renderItem = ({ item }) => {
    return (
      <View style={styles.noteContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.noteTitle}>Note</Text>
          {/* <Text style={styles.noteTitle}>{item.title}</Text>
          <Text>{item.content}</Text> */}
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen', item)}
          >
            <Text style={styles.viewText}>VIEW</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('EditNoteScreen', item)}
          >
            <Text style={styles.editText}>EDIT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.deleteText}>DELETE</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  } 
    
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
  },
});

export default HomeScreen;
