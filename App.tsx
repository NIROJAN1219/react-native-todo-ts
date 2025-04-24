import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useTodoStore } from './src/store';
import { Share } from 'react-native';

const App = () => {
  const [task, setTask] = useState('');
  const { todos, addTodo, removeTodo, toggleTodo } = useTodoStore();

  const handleAdd = () => {
    if (task.trim()) {
      addTodo(task);
      setTask('');
    }
  };

  

  const onShare = async (taskText: string) => {
    try {
      await Share.share({
        message: `Task: ${taskText}`,
      });
    } catch (error) {
      console.error('Error sharing task:', error);
    }
  };
  
  const renderItem = ({ item }: any) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleTodo(item.id)}>
        <Text
          style={[
            styles.taskText,
            item.completed && styles.completed,
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
  
      <View style={{ flexDirection: 'row' }}>
        {/* 🔗 Share Button */}
        <TouchableOpacity onPress={() => onShare(item.title)}>
          <Text style={styles.shareButton}>🔗</Text>
        </TouchableOpacity>
  
        {/* ❌ Delete Button */}
        <TouchableOpacity onPress={() => removeTodo(item.id)}>
          <Text style={styles.deleteButton}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>நடப்பு வேலை பட்டியல்</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="வேலை உள்ளீடு செய்யவும்"
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
          <Text style={styles.addButtonText}>சேர்க்க</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6', // Light blue background
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF', // White color title
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B', // Dark navy color for section titles
    marginBottom: 15,
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 16,
    color: '#2B6CB0', // Blue color label before input
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White input box
    borderColor: '#E5E7EB',
    borderWidth: 1,
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    color: '#333333', // Dark text in input box
  },
  addButton: {
    backgroundColor: '#32CD32', // Lime green add button
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginLeft: 12,
    elevation: 5,
  },
  addButtonText: {
    color: '#FFFFFF', // White text on the add button
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White task row background
    padding: 16,
    marginBottom: 14,
    borderRadius: 14,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 2,
  },
  taskText: {
    flex: 1,
    fontSize: 18,
    color: '#1E293B', // Dark text color for tasks
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#808080', // Gray for completed tasks
  },
  deleteButton: {
    marginLeft: 15,
    backgroundColor: '#DC143C', // Crimson red delete button
    padding: 10,
    borderRadius: 10,
  },
  deleteText: {
    color: '#FFFFFF', // White text for delete button
    fontSize: 18,
    textAlign: 'center',
  },
  checkbox: {
    fontSize: 22,
    marginRight: 12,
    color: '#32CD32', // Green color checkbox
  },
});












const onShare = async (taskText: string) => {
  try {
    await Share.share({
      message: `Task: ${taskText}`,
    });
  } catch (error) {
    console.error('Error sharing task:', error);
  }
};



export default App;