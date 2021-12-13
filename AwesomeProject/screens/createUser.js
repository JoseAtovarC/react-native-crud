import React, { useState } from 'react'
import db from '../database/firebase'
import { collection, addDoc } from "firebase/firestore";
import { View, Button, StyleSheet, ScrollView, TextInput } from 'react-native'

const CreateUser = (props) => {

    const [state, setstate] = useState({
        name: "",
        email: "",
        phone: ""
    })

    const handleChange = (name, value) => {
        setstate({ ...state, [name]: value })
    }

    const createNewUser = async () => {
        if (state.name === '') {
            alert('name must be provide')
        } else {

            await addDoc(collection(db, "users"),{
                name: state.name,
                email: state.email,
                phone: state.phone
            })
        props.navigation.navigate('userList')
        }

        
    }



    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="name" onChangeText={(value) => handleChange('name', value)}></TextInput>

            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="email" onChangeText={(value) => handleChange('email', value)}></TextInput>

            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="phone" onChangeText={(value) => handleChange('phone', value)}></TextInput>

            </View>

            <View >
                <Button title="save" onPress={() => createNewUser()}></Button>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
});

export default CreateUser
