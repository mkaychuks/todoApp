import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// local imports
import Task from "./components/Task";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Today's tasks */}

      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        {/* Wraps the tasks items */}
        <View style={styles.items}>
          {/* This is where the tasks will go */}
          <Task text={"Hello world"}/>
          <Task text={"Wash the clothes"}/>
        </View>
      </View>

      {/*  */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop:80,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30
  },
});
