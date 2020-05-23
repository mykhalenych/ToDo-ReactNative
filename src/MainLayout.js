import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import Navbar from "./components/Navbar";
import { MainScreen } from "./Screen/MainScreen";
import { TodoScreen } from "./Screen/TodoScreen";
import { TodoContext } from "./context/todo/todoContext";
import { THEME } from "./theme";
import { ScreenContext } from './context/screen/screenContext'

const MainLayout = () => {
  const { todos, addTodo, removeTodo, updateTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext)

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={changeScreen}
    />
  );

  if (todoId) {
    const selectedTodo = todos.find((todo) => todo.id === todoId);
    content = (
      <TodoScreen
        onRemove={removeTodo}
        goBack={() => changeScreen(null)}
        todo={selectedTodo}
        onSave={updateTodo}
      />
    );
  }

  return (
    <View>
      <Navbar title="Todo App!" />
      <View style={styles.container}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
});

export default MainLayout;

//const [todos, setTodos] = useState([]);

// const addTodo = (title) => {
//   setTodos((prev) => [
//     ...prev,
//     {
//       id: Math.random().toString(),
//       title,
//     },
//   ]);
// };
// const updateTodo = (id, title) => {
//   setTodos((prev) =>
//     prev.map((todo) => {
//       if (todo.id === id) {
//         todo.title = title;
//       }
//       return todo;
//     })
//   );
// };

// const removeTodo = (id) => {
//   const todo = todos.find((t) => t.id === id);
//   Alert.alert(
//     "Delete",
//     `Are you going to delete "${todo.title}"?`,
//     [
//       {
//         text: "Cancel",
//         style: "cancel",
//       },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: () => {
//           setTodoId(null);
//           setTodos((prev) => prev.filter((todo) => todo.id !== id));
//         },
//       },
//     ],
//     { cancelable: false }
//   );
// };
