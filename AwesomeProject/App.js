
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserDetail from './screens/userDetail';
import UserList from './screens/userList';
import CreateUser from './screens/createUser'

const Stack= createStackNavigator()
function Mystack(){
return (
<Stack.Navigator>
<Stack.Screen name="userList" component={UserList}></Stack.Screen>
<Stack.Screen name="createUser" component={CreateUser}></Stack.Screen>
  

  <Stack.Screen name="userDetail" component={UserDetail}></Stack.Screen>

</Stack.Navigator>
)
}

export default function App() {
  return (
    <NavigationContainer>
        <Mystack></Mystack>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
