import React, { useEffect, useState } from 'react'
import db from '../database/firebase'
import { doc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import { View, Button, Alert, StyleSheet, ScrollView, TextInput, ActivityIndicator } from 'react-native'



const UserDetail = (props) => {

    const initialState = {
        id: "",
        name: "",
        email: "",
        phone: "",
    };


    const [state, setstate] = useState(initialState)

    const [loading, setloading] = useState(true)

    const getUserbyId = async id => {
        await onSnapshot(doc(db, "users", id), (doc) => {
            const user = doc.data();
            setstate(

                user
            )

        });


        setloading(false)

    }

    useEffect(() => {
        getUserbyId(props.route.params.id)
    }, [])



    const handleChange = (name, value) => {
        setstate({ ...state, [name]: value })
    };



    const deleteUser = async (id) => {
        await deleteDoc(doc(db, "users", id));
        props.navigation.navigate('userList')
    };

    const openConfirmationAlert = () => {
        Alert.alert(
            "Removing the User",
            "Are you sure?",
            [
                { text: "Yes", onPress: () => deleteUser(props.route.params.id) },
                { text: "No", onPress: () => console.log("canceled") },
            ],
            {
                cancelable: true,
            }
        );
    };

    const updateUser = async () => {

        updateDoc(doc(db, "users", props.route.params.id), {
            name: state.name,
            email: state.email,
            phone: state.phone,
        });
        setstate(initialState);
        props.navigation.navigate("userList");
    }


    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#9E9E9E" />
            </View>
        );
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder={"name"}
                    onChangeText={(value) => handleChange('name', value)}
                    value={state.name}
                ></TextInput>

            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="email"
                    value={state.email}
                    onChangeText={(value) => handleChange('email', value)}></TextInput>

            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="phone"
                    value={state.phone}
                    onChangeText={(value) => handleChange('phone', value)}></TextInput>

            </View>

            <View >
                <Button
                    color="#19AC52"
                    title="Update User" onPress={() => updateUser()}></Button>

            </View>

            <View>
                <Button
                    color="#E37399"
                    title="Delete User" onPress={() =>
                        openConfirmationAlert()}></Button>
            </View>
        </ScrollView>
    )
};

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
    loader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default UserDetail
