import React, {useContext} from "react";
import { Text, TextInput, Button, View, StyleSheet } from "react-native";
import BlogForm from "../components/BlogForm";
import { Context } from "../context/BlogContext";

const EditScreen = (props) => {
    const {state, editBlogPosts} = useContext(Context);
    const blogPostID = props.navigation.getParam("id");

    //Now, we have to iterate through all of our blog posts inside of our array, in order to find the one with the same ID as props.navigation.getParam("id") because that's the one the user wants to edit.
    const editBlogPost = state.find((blogPost) => blogPost.id == blogPostID);
    //We're going to return true for whenever blogPost.id == props.navigation.getParam("id"), which is the post that the user wants to edit. 

    return <View>
        <BlogForm 
        screenTitle = "Edit your blog post below!" 
        initialBlogTitle = {{title: editBlogPost.title}}
        initialBlogContent = {{content: editBlogPost.content}}
        onSave = {(title, content) => { //onSave is being called with our new title and new content.
            editBlogPosts(title, content, blogPostID, () => props.navigation.pop());
            //"pop()" is a function in the navigaton object that returns a user back to the previous screen that they were looking at. 
            //Once again, the navigation functionality has been added via adding a callback function as an argument in editBlogPosts. 
        }}
        />
    </View>
};

const styles = StyleSheet.create ({

});

export default EditScreen;