// @ts-nocheck
import React, { useReducer, useContext } from "react";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import {
  ADD_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODO,
} from "../types";
import { ScreenContext } from "../screen/screenContext";
import { Alert } from "react-native";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { changeScreen } = useContext(ScreenContext);

  const fetchTodo = async () => {
    showLoader();
    try {
      const res = await fetch(
        "https://todo-react-native-dab6a.firebaseio.com/todos.json",
        {
          method: "GET",
          headers: { "Content-Type": "aplication/json" },
        }
      );
      const data = await res.json();
      const todo = Object.keys(data).map((key) => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TODO, todo });
    } catch (error) {
      showError("Don't work");
      console.log(error);
    } finally {
      hideLoader();
    }
  };

  const addTodo = async (title) => {
    const res = await fetch(
      "https://todo-react-native-dab6a.firebaseio.com/todos.json",
      {
        method: "POST",
        headers: { "Content-Type": "aplication/json" },
        body: JSON.stringify({ title }),
      }
    );
    const data = await res.json();
    dispatch({ type: ADD_TODO, title, id: data.name });
  };

  const removeTodo = (id) => {
    const todo = state.todos.find((item) => item.id === id);
    Alert.alert(
      "Delete",
      `Are you going to delete "${todo.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            changeScreen(null);
            await fetch(
              `https://todo-react-native-dab6a.firebaseio.com/todos${id}.json`,
              {
                method: "DELETE",
                headers: { "Content-Type": "aplication/json" },
              }
            );
            dispatch({ type: REMOVE_TODO, id });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const updateTodo = async (id, title) => {
    clearError();
    try {
      await fetch(
        `https://todo-react-native-dab6a.firebaseio.com/todos${id}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "aplication/json" },
          body: JSON.stringify({ title }),
        }
      );
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (error) {
      showError("Don't work");
      console.log(error);
    } finally {
      hideLoader();
    }
  };
  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = (error) => dispatch({ type: SHOW_ERROR });
  const clearError = () => dispatch({ type: CLEAR_ERROR });
  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodo,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
