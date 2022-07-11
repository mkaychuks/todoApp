import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Task = (props) => {
  return (
    // Main view holder
    <View style={styles.item}>
      {/* The view that will house the left elements */}
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>

      <View style={styles.circular}></View>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    marginBottom: 15
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: "wrap"
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55bcf6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15
  },
  itemText: {
    maxWidth: '80%'
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55bcf6',
    borderRadius: 12,
    borderWidth: 2
  },
});
