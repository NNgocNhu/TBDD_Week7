import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = (props) => {
  const [loginInfo, setLoginInfo] = useState({});
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '', date: '', priority: '', tab: '' });

  const getLoginInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('loginInfo');
      if (value !== null) {
        setLoginInfo(JSON.parse(value));
        fetchNotesFromAPI(JSON.parse(value).username);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getLoginInfo();
    });

    return unsubscribe;
  }, [props.navigation]);

  const fetchNotesFromAPI = async (username) => {
    try {
      const response = await fetch(`http://192.168.2.143:3000/users`);
      const data = await response.json();
      const currentUser = data.find((user) => user.username === username);
      if (currentUser) {
        setNotes(currentUser.notes);
      }
    } catch (error) {
      console.error('Error fetching notes from API:', error);
    }
  };
  // const saveNote = async () => {
  //   const timestamp = new Date().toISOString();
  //   const newNoteData = {
  //     title: newNote.title,
  //     content: newNote.content,
  //     date: timestamp,
  //     priority: newNote.priority,
  //     tab: newNote.tab,
  //   };
  
  //   try {
  //     const response = await fetch(`http://192.168.2.143:3000/users/${loginInfo.username}/notes`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newNoteData),
  //     });
  
  //     if (!response.ok) {
  //       console.error('Error saving note to API:', response.status);
  //       return;
  //     }
  
  //     const updatedNotes = [...notes, newNoteData];
  //     const updatedLoginInfo = { ...loginInfo, notes: updatedNotes };
  
  //     await AsyncStorage.setItem('loginInfo', JSON.stringify(updatedLoginInfo));
  //     setLoginInfo(updatedLoginInfo);
  //     setNotes(updatedNotes);
  //     setNewNote({
  //       title: '',
  //       content: '',
  //       date: '',
  //       priority: '',
  //       tab: '',
  //     });
  //   } catch (error) {
  //     console.error('Error saving note:', error);
  //   }
  // };
  
  

  // const deleteNote = async (noteId) => {
  //   const updatedNotes = notes.filter((note) => note.id !== noteId);
  //   const updatedLoginInfo = { ...loginInfo, notes: updatedNotes };

  //   try {
  //     await AsyncStorage.setItem('loginInfo', JSON.stringify(updatedLoginInfo));
  //     setLoginInfo(updatedLoginInfo);
  //     setNotes(updatedNotes);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <View>
       <Text>Màn hình Home</Text>
       <Text>Username: {loginInfo.username}</Text>
       <Text>User Notes:</Text>
       {notes.map((note, index) => (
        <View key={index}>
          <Text>Title: {note.title}</Text>
          <Text>Content: {note.content}</Text>
          <Text>Date: {note.date}</Text>
          <Text>Priority: {note.priority}</Text>
          <Text>Tab: {note.tab}</Text>
        </View>
      ))}
      {/* <Button title="Refresh Notes" onPress={() => fetchNotesFromAPI(loginInfo.username)} /> */}
    </View>
      // <TextInput
      //   placeholder="Title"
      //   value={newNote.title}
      //   onChangeText={(text) => setNewNote({ ...newNote, title: text })}
      // />
      // <TextInput
      //   placeholder="Content"
      //   value={newNote.content}
      //   onChangeText={(text) => setNewNote({ ...newNote, content: text })}
      // /> 
      //  <Button title="Save Note" onPress={saveNote} /> 

  );
};

export default Home;
