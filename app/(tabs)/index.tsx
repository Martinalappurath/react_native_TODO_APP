import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../../scripts/styles"; // Import styles from the styles.js file

// Use to define the type for a Task
type Task = {
  id: string;
  title: string;
  status: "due" | "done";
};

const App = () => {
  // State to manage the list of tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  // State to manage the current task title input
  const [taskTitle, setTaskTitle] = useState("");

  // Function to add a new task
  const addTask = () => {
    if (taskTitle.trim().length > 0) {
      // Ensure the task title is not empty
      setTasks([
        ...tasks,
        {
          id: Math.random().toString(), // Generate a random ID for the new task
          title: taskTitle, // Set the task title
          status: "due", // Default status is 'due'
        },
      ]);
      setTaskTitle("");
    }
  };

  //toggle the status of a task
  const toggleTaskStatus = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === "due" ? "done" : "due" }
          : task
      )
    );
  };

  //delete a task
  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Function to render each task item
  const renderTaskItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <View style={styles.taskContent}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskStatus}>
          {item.status === "done" ? "Done" : "Due"}
        </Text>
      </View>
      <View style={styles.taskActions}>
        <Switch
          value={item.status === "done"}
          onValueChange={() => toggleTaskStatus(item.id)}
        />
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Icon name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todo App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Task Title"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <TouchableOpacity
          style={[
            styles.addButton,
            { backgroundColor: taskTitle.trim() ? "#007bff" : "#c0c0c0" },
          ]}
          onPress={addTask}
          disabled={!taskTitle.trim()} // Disable the button if the input is empty
        >
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks} // Data source for the FlatList
        renderItem={renderTaskItem} // Function to render each item
        keyExtractor={(item) => item.id} // Key extractor for FlatList items
      />
    </SafeAreaView>
  );
};

export default App;
