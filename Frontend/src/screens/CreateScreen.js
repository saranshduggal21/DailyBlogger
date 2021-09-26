import React, { useContext } from "react";
import { Button, Text, View, StyleSheet, TextInput } from "react-native"
import { Context } from "../context/BlogContext";
import BlogForm from "../components/BlogForm";

const CreateScreen = (props) => {
    const { addBlogPosts } = useContext(Context);
//For this specific screen, we only care about the addBlogPosts function and not the rest of the state objects and helper functions within Context, which is why we're only destructuring out addBlogPosts. 

    return <View>
        <BlogForm 
        screenTitle = "Create your blog post below!" 
        onSave = {(title, content) => {
        //Whenever the user submits the form, BlogForm calls onSave, it has to pass in whatever title and content the user typed into the form. This is important because the title and content then has to be passed to addBlogPosts. 
            addBlogPosts(title, content, () => {
                //A 3rd argument (a callback function) is being added to addBlogPosts. So now, in addBlogPosts we can say that after we've successfully saved or dispatched an action to save the blog post, then we can go ahead and invoke this callback function which will navigate us back to the MainScreen.
                props.navigation.navigate("Main")
            });
        }}
        
        />
    </View>

};

const styles = StyleSheet.create({

});

export default CreateScreen;