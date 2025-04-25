import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Alert,
  Share,
} from 'react-native';
import { useTodoStore } from './src/store';

const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const { todos, addTodo, removeTodo, toggleTodo, editTodo } = useTodoStore();

  const handleAdd = () => {
    if (title.trim() && description.trim()) {
      addTodo(title, description);
      setTitle('');
      setDescription('');
    }
  };

  const onShare = async (taskText: string) => {
    try {
      await Share.share({
        message: Task: ${taskText},
      });
    } catch (error) {
      console.error('Error sharing task:', error);
    }
  };

  const handleEdit = (item: any) => {
    setEditTaskId(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description);
    setModalVisible(true);
  };

  const saveEdit = () => {
    if (editTaskId !== null) {
      editTodo(editTaskId, editTitle, editDescription);
      setModalVisible(false);
      setEditTaskId(null);
      setEditTitle('');
      setEditDescription('');
    }
  };

  const confirmDelete = (id: number) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', onPress: () => removeTodo(id) },
    ]);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleTodo(item.id)} style={{ flex: 1 }}>
        <Text style={[styles.taskText, item.completed && styles.completed]}>
          {item.title}
        </Text>
        <Text style={[styles.descriptionText, item.completed && styles.completed]}>
          {item.description}
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={() => onShare(item.title)}>
          <Text style={styles.shareButton}>🔗</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Text style={styles.editButton}>✏</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => confirmDelete(item.id)}>
          <Text style={styles.deleteButton}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              placeholder="Edit Title"
              value={editTitle}
              onChangeText={setEditTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Edit Description"
              value={editDescription}
              onChangeText={setEditDescription}
              style={styles.input}
            />
            <TouchableOpacity onPress={saveEdit} style={styles.addButton}>
              <Text style={styles.addButtonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E0F7FA', padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  inputContainer: { marginBottom: 20 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#90CAF9',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#00796B',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  list: { paddingBottom: 20 },
  taskContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: { fontSize: 18, fontWeight: 'bold' },
  descriptionText: { fontSize: 14, color: '#555' },
  completed: { textDecorationLine: 'line-through', color: '#999' },
  buttonGroup: { flexDirection: 'row', marginLeft: 10 },
  deleteButton: { marginLeft: 10, fontSize: 18, color: '#C62828' },
  editButton: { marginLeft: 10, fontSize: 18, color: '#FFA000' },
  shareButton: { fontSize: 18, color: '#1976D2' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  cancelText: {
    color: '#1976D2',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default App;