import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Modal,
  Alert,
} from "react-native";
import { THEME } from "../theme";

const EditModal = ({ value, visible, onCancel, onSave }) => {
  const [title, setTitle] = useState(value);
  console.log(title);
  const saveHandler = () => {
    if(title.trim()){
      onSave(title)
    }
    else{
      Alert.alert("Don't work")
    }
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.wrap}>
        <TextInput
          value={title}
          style={styles.input}
          placeholder="Edit todo item"
          onChangeText={setTitle}
          autoCapitalize="none"
        />
        <View style={styles.buttons}>
          <Button
            title={"Cancel"}
            onPress={onCancel}
            color={THEME.DANGER_COLOR}
          />
          <Button title={"Save"} onPress={saveHandler} />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "80%",
  },
  buttons: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default EditModal;
