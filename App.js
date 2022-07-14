import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Alert,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// local imports
import Task from "./components/Task";

export default function App() {
  // handle states
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    getAllTasksFromDevice()
  }, [])

  useEffect(() => {
    saveTaskToUserDevice(taskItems)
  }, [taskItems])


  const saveTaskToUserDevice =  async (tasks) => {
    try {
      const stringifyTasks = JSON.stringify(tasks)
      await AsyncStorage.setItem('tasks', stringifyTasks)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllTasksFromDevice = async () => {
    try {
      const tasks = await AsyncStorage.getItem("tasks")
      if(tasks != null){
        setTaskItems(JSON.parse(tasks))
      }
    } catch (e) {
      console.log(e)
    }
  }


  // handle adding of tasks
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems((newTaskItems) => [
      ...newTaskItems,
      { title: task, id: Math.random().toString() },
    ]);
    setTask("");
  };

  // delete a task
  const taskComplete = (id) => {
    Alert.alert(
      "Warning",
      "Are you sure you want to delete this task",
      [
        {
          text: "Yes",
          onPress: () =>
            setTaskItems((currentTask) => {
              return currentTask.filter((task) => task.id !== id);
            }),
        },
        {
          text: "No",
          onPress: () => ToastAndroid.show("Cancelled", ToastAndroid.SHORT),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Today's tasks */}

      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        {/* Wraps the tasks items */}
        <View style={styles.items}>
          {/* This is where the tasks will go */}
          <FlatList
            keyExtractor={(item, index) => {
              return item.id;
            }}
            data={taskItems}
            renderItem={({ item }) => (
              <Task
                text={item.title}
                onDeleteTask={taskComplete}
                id={item.id}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      {/* Write a Task  */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          placeholder="Write a Task"
          style={styles.input}
          onChangeText={(text) => setTask(text)}
          value={task}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    width: "80%",
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#c0c0c0",
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#c0c0c0",
  },
  addText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
