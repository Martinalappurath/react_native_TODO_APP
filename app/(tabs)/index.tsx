// Import Firebase app initialization function
import { initializeApp } from 'firebase/app';
import { getDatabase, off, onValue, push, ref, remove, update } from 'firebase/database';
// Import React functions
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../scripts/styles';


// Import React functions
const firebaseConfig = {
  apiKey: "AIzaSyCeBa-LtHa5r_zPVU-8BuPnRi3FHeXA7Bg",
  authDomain: "reacttodoapp-6b986.firebaseapp.com",
  databaseURL: "https://reacttodoapp-6b986-default-rtdb.firebaseio.com",
  projectId: "reacttodoapp-6b986",
  storageBucket: "reacttodoapp-6b986.appspot.com",
  messagingSenderId: "257980884372",
  appId: "1:257980884372:web:008fc4c63a21eaaf481b81"
};

// Initialize Firebase app and database
const firebaseApp = initializeApp(firebaseConfig);
const firebaseDatabase = getDatabase(firebaseApp);

type Todo = {
  id: string;
  title: string;
  status: 'due' | 'done';
};

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // State for todos
  const [todoTitle, setTodoTitle] = useState(''); // State for new todo title

  useEffect(() => {
    const todosRef = ref(firebaseDatabase, 'todos'); // Reference to the 'todos' in the databas
    const fetchTodos = () => {
      onValue(todosRef, (snapshot) => {
        const todosData = snapshot.val();
        if (todosData) {
          const todosArray = Object.keys(todosData).map((todoId) => ({
            id: todoId,
            ...todosData[todoId],
          }));
          setTodos(todosArray); // Set the todos state with fetched data
        } else {
          setTodos([]); // Set todos to empty if no data
        }
      });
    };

    fetchTodos(); // Fetch todos on component mount

    return () => {
      off(todosRef); // Clean up listener on unmount
    };
  }, []);

  const addTodo = () => {
    if (todoTitle.trim().length > 0) { // Check if the title is not empty
      const newTodoRef = push(ref(firebaseDatabase, 'todos')); // Create a new todo reference
      update(newTodoRef, {
        title: todoTitle,
        status: 'due',
      });
      setTodoTitle('');
    }
  };

  const toggleTodoStatus = (todoId: string, newStatus: 'due' | 'done') => {
    const todoRef = ref(firebaseDatabase, `todos/${todoId}`);
    update(todoRef, { status: newStatus });
  };
  
  const deleteTodo = (todoId: string) => {
    const todoRef = ref(firebaseDatabase, `todos/${todoId}`);
    // Remove the todo from the database
    remove(todoRef)
      .then(() => {
        console.log('Todo deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
      });
  };

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <View style={styles.todoContent}>
        <Text style={styles.todoTitle}>{item.title}</Text>
        <Text style={styles.todoStatus}>{item.status === 'done' ? 'Done' : 'Due'}</Text>
      </View>
      <View style={styles.todoActions}>
        <Switch
          value={item.status === 'done'}
          onValueChange={(value) => toggleTodoStatus(item.id, value ? 'done' : 'due')}
        />
        <TouchableOpacity onPress={() => deleteTodo(item.id)}>
          <Icon name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}> Todo App By Martin</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Todo Title"
          value={todoTitle}
          onChangeText={setTodoTitle}
        />
        <TouchableOpacity
          style={[
            styles.addButton,
            { backgroundColor: todoTitle.trim() ? '#007bff' : '#c0c0c0' },
          ]}
          onPress={addTodo}
          disabled={!todoTitle.trim()}
        >
          <Text style={styles.addButtonText}>Add Todo</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default TodoApp;



