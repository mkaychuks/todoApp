import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

// local imports
import Task from "./components/Task";

export default function App() {
  // handle states
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    setTaskItems((newTaskItems) => [...newTaskItems, { title: task }]);
    setTask("");
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
            keyExtractor={(_, index) => index.toString()}
            data={taskItems}
            renderItem={({ item }) => <Task text={item.title} />}
            alwaysBounceVertical={false}
          />

          {/* <Task text={"Wash the clothes"} /> */}
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
    bottom: 55,
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
