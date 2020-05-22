import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { THEME } from "../theme";
import { AppCard } from "../components/ui/AppCard";
import EditModal from "../components/EditModal";

export const TodoScreen = ({ updateTodo, goBack, todo, onRemove }) => {
  const [modal, setModal] = useState(false);
  const saveHandler = (title) => {
    updateTodo(todo.id, title)
    setModal(false)
  }
  return (
    <View>
      <EditModal
        onSave={saveHandler}
        visible={modal}
        onCancel={() => setModal(false)}
        value={todo.title}
      />
      <AppCard style={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>
        <Button title="Edit" onPress={() => setModal(true)} />
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Go back" onPress={goBack} color={THEME.GREY_COLOR} />
        </View>
        <View style={styles.button}>
          <Button
            title="Delete"
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(todo.id)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
  button: {
    width: "40%",
  },
  title: {
    fontSize: 20,
  },
});
