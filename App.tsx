import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTaskStore } from './store';

export default function App() {
  const [text, setText] = useState('');
  const { tasks, addTask, deleteTask, toggleTask } = useTaskStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 என் TODO LIST</Text>
      <TextInput
        style={styles.input}
        placeholder="பணியை எழுதவும்"
        value={text}
        onChangeText={setText}
      />
      <Button title="சேர்" onPress={() => { addTask(text); setText(''); }} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleTask(item.id)}
            onLongPress={() => deleteTask(item.id)}
          >
            <Text style={[
              styles.task,
              { textDecorationLine: item.completed ? 'line-through' : 'none' }
            ]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  task: { fontSize: 18, marginVertical: 5 },
});


import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, FlatList, Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useTaskStore } from './src/store/store';

const App = () => {
  const { tasks, addTask, deleteTask, toggleTask, loadTasks } = useTaskStore();
  const [text, setText] = useState('');

  useEffect(() => {
    loadTasks(); // App start ஆகும் போது AsyncStorage-ல இருந்து tasks load பண்ணும்
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📝 To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add Task..."
          value={text}
          onChangeText={setText}
        />
        <Button title="Add" onPress={() => {
          if (text.trim()) {
            addTask(text);
            setText('');
          }
        }} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => toggleTask(item.id)}>
              <Text style={[styles.taskText, item.completed && styles.completed]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <Button title="🗑" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', marginRight: 10, paddingHorizontal: 10, borderRadius: 8 },
  taskContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  taskText: { fontSize: 18 },
  completed: { textDecorationLine: 'line-through', color: 'gray' },
});

export default App;
