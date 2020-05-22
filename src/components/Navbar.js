import React from 'react'
import { StyleSheet, View, Text  } from 'react-native';

const Navbar = () => {
  return(
    <View style={styles.conteiner}>
      <Text style={styles.text}>ToDo App</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  conteiner: {
    height: 70,
    alignItems: "center",
    justifyContent: 'flex-end',
    paddingBottom: 10,
    backgroundColor: '#3949ab',
  
  },
  text:{
    color: '#ffffff',
    fontSize: 20
  }
});

export default Navbar