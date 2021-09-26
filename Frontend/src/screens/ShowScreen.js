import React, { useContext } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import { Feather } from '@expo/vector-icons';

const ShowScreen = (props) => {
    const { state } = useContext(Context); //State is destructured off the "value" property in the automateDataContext file. So the State value here should be equal to the big list of all the different blog posts that we currently have. 

    const blogPost = state.find((blogPost) => blogPost.id == props.navigation.getParam("id"));
    //"find" is another builtin helper function in which a child function can be passed to it. This function will be called with every blog post inside that array. 
    //Anytime the child function returns true (ID provided into screen = blog post ID), we're going to take whatever blog post we find (using its ID) and assign it to the "blogPost" variable.
    //"props.navigation.getParam("id")" allows us to pass in and retrieve the ID object within the navigation function in the MainScreen.

    return <View>
        <Text style={styles.blogTitle}> {blogPost.title} </Text>
        <Text style={styles.blogContent}> {blogPost.content} </Text>
    </View>
};

ShowScreen.navigationOptions = (props) => {
    return {
        headerRight: () => ( //When the edit button is pressed, it will pass in an ID property so that EditScreen knows exactly which blog post the user wants to edit. 
            <TouchableOpacity onPress={() => props.navigation.navigate("Edit", {id: props.navigation.getParam("id")})} style = {styles.editButtonIcon}>
                <Feather name="edit" size={28} color="black" />
            </TouchableOpacity>
        ),
    };
};

const styles = StyleSheet.create({
    blogTitle: {
        fontFamily: "Times New Roman",
        fontSize: 24,
        alignSelf: "center",
        textDecorationLine: "underline",
        paddingVertical: 10
    },
    blogContent: {
        fontFamily: "Times New Roman",
        fontSize: 18,
        alignSelf: "center"
    },
    editButtonIcon: {
        paddingRight: 12 
    }
});

export default ShowScreen;