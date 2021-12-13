import React, { useEffect, useState } from 'react'
import db from '../database/firebase'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {  Button,ScrollView } from 'react-native';
import {ListItem,Avatar} from 'react-native-elements'




const UserList = (props) => {
    const [users, setUsers] = useState([])
 useEffect(() => {
    const q = query(collection(db, "users"));

    onSnapshot(q,(querySnapshot) => {
        const users=[]
        querySnapshot.docs.forEach(doc=>{
         const {name,email,phone}= doc.data();
         users.push({
             id:doc.id,
             name,
             email,
             phone
         })
        })
        setUsers(users)
    })
 }, [])
    
    return (
       <ScrollView>
           <Button title="create user" onPress={()=> props.navigation.navigate('createUser')}></Button>

           {
               users.map(user=>{
                   return (
                   <ListItem
                   key={user.id}
                   bottomDivider
                   onPress={()=> props.navigation.navigate('userDetail',{
                       id:user.id
                   })}
                   >
                       <ListItem.Chevron></ListItem.Chevron>
                       <Avatar
                       source={{uri:"https://picsum.photos/200/200"}}
                       rounded
                       />
                       <ListItem.Content>
                           <ListItem.Title>{user.name}</ListItem.Title>
                           <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                      </ListItem.Content>

                   </ListItem>
                   )
               })
           }
       </ScrollView>
    )
}

export default UserList
