import { initializeApp } from 'firebase/app';
import { getDatabase, off, onValue, push, ref, remove, update } from 'firebase/database';
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

const firebaseConfig = {
  apiKey: "AIzaSyCeBa-LtHa5r_zPVU-8BuPnRi3FHeXA7Bg",
  authDomain: "reacttodoapp-6b986.firebaseapp.com",
  databaseURL: "https://reacttodoapp-6b986-default-rtdb.firebaseio.com",
  projectId: "reacttodoapp-6b986",
  storageBucket: "reacttodoapp-6b986.appspot.com",
  messagingSenderId: "257980884372",
  appId: "1:257980884372:web:008fc4c63a21eaaf481b81"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDatabase = getDatabase(firebaseApp);

type Todo = {
  id: string;
  title: string;
  status: 'due' | 'done';
};

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');

  useEffect(() => {
    const todosRef = ref(firebaseDatabase, 'todos');
    const fetchTodos = () => {
      onValue(todosRef, (snapshot) => {
        const todosData = snapshot.val();
        if (todosData) {
          const todosArray = Object.keys(todosData).map((todoId) => ({
            id: todoId,
            ...todosData[todoId],
          }));
          setTodos(todosArray);
        } else {
          setTodos([]);
        }
      });
    };

    fetchTodos();

    return () => {
      off(todosRef); // Clean up listener on unmount
    };
  }, []);

  const addTodo = () => {
    if (todoTitle.trim().length > 0) {
      const newTodoRef = push(ref(firebaseDatabase, 'todos'));
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











// import React, { useState } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Switch,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import styles from '../../scripts/styles'; // Import styles from the styles.js file

// // Define the type for a Task
// type Task = {
//   id: string;
//   title: string;
//   status: 'due' | 'done';
// };

// const App = () => {
//   // State to manage the list of tasks
//   const [tasks, setTasks] = useState<Task[]>([]);
//   // State to manage the current task title input
//   const [taskTitle, setTaskTitle] = useState('');

//   // Function to add a new task
//   const addTask = () => {
//     if (taskTitle.trim().length > 0) { // Ensure the task title is not empty
//       setTasks([
//         ...tasks,
//         {
//           id: Math.random().toString(), // Generate a random ID for the new task
//           title: taskTitle, // Set the task title
//           status: 'due', // Default status is 'due'
//         },
//       ]);
//       setTaskTitle(''); // Clear the input field
//     }
//   };

//   // Function to toggle the status of a task
//   const toggleTaskStatus = (taskId: string) => {
//     setTasks((prevTasks) =>
//       prevTasks.map((task) =>
//         task.id === taskId
//           ? { ...task, status: task.status === 'due' ? 'done' : 'due' }
//           : task
//       )
//     );
//   };

//   // Function to delete a task
//   const deleteTask = (taskId: string) => {
//     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
//   };

//   // Function to render each task item
//   const renderTaskItem = ({ item }: { item: Task }) => (
//     <View style={styles.taskItem}>
//       <View style={styles.taskContent}>
//         <Text style={styles.taskTitle}>{item.title}</Text>
//         <Text style={styles.taskStatus}>{item.status === 'done' ? 'Done' : 'Due'}</Text>
//       </View>
//       <View style={styles.taskActions}>
//         <Switch
//           value={item.status === 'done'}
//           onValueChange={() => toggleTaskStatus(item.id)}
//         />
//         <TouchableOpacity onPress={() => deleteTask(item.id)}>
//           <Icon name="delete" size={24} color="red" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.header}>Todo App</Text>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Task Title"
//           value={taskTitle}
//           onChangeText={setTaskTitle}
//         />
//         <TouchableOpacity
//           style={[
//             styles.addButton,
//             { backgroundColor: taskTitle.trim() ? '#007bff' : '#c0c0c0' },
//           ]}
//           onPress={addTask}
//           disabled={!taskTitle.trim()} // Disable the button if the input is empty
//         >
//           <Text style={styles.addButtonText}>Add Task</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={tasks} // Data source for the FlatList
//         renderItem={renderTaskItem} // Function to render each item
//         keyExtractor={(item) => item.id} // Key extractor for FlatList items
//       />
//     </SafeAreaView>
//   );
// };

// export default App;

