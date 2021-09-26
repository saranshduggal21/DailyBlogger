import React, {useState} from "react";
import { Text, Button, TextInput, View, StyleSheet } from "react-native";

const BlogForm = (props) => {
    const [title, setTitle] = useState(props.initialBlogTitle.title);
    const [content, setContent] = useState(props.initialBlogContent.content);

    return <View>
        <Text style = {styles.screenTitle}> {props.screenTitle} </Text>
        <Text style={styles.text}> Enter Blog Post Title:</Text>
        <TextInput value={title} onChangeText={(text) => setTitle(text)} style={styles.textInputTitle} />
        <Text style={styles.text}> Enter Blog Post Content:</Text>
        <TextInput value={content} onChangeText={(text) => setContent(text)} style={styles.textInputContent} />
        <Button
            title="Save Blog Post"
            onPress={() => props.onSave(title, content)} 
        />
    </View>
};

BlogForm.defaultProps = { //The "defaultProps" property can be used to give our BlogForm component some default property values. 
//In other words, if we every show BlogForm and we choose not to pass in some given prop, then the obejcts below will be used to fill in some DEFAULT VALUES.
//So, now anytime we show our BlogForm in our CreateScreen, we don't make use of initialBlogTitle & initialBlogContent props. So instead, we're going to have an INITIAL VALUE for those props assigned below so that CreateScreen doesn't return an error.
    initialBlogTitle: {
        title: " "
    },
    initialBlogContent: {
        content: " "
    }
};

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: 24,
        fontWeight: "bold",
        alignSelf: "center",
        paddingVertical: 16,
        fontFamily: "Times New Roman",
    },
    text: {
        fontSize: 18,
        alignSelf: "center",
        paddingVertical: 15,
        fontFamily: "Times New Roman",
        textDecorationLine: "underline"
    },
    textInputTitle: {
        fontSize: 16,
        borderWidth: 1.5,
        borderColor: "blue",
        marginHorizontal: 16,
        padding: 5,
        textAlign: "center"
    },
    textInputContent: {
        fontSize: 15,
        borderWidth: 1.5,
        borderColor: "blue",
        marginHorizontal: 16,
        padding: 5
    },
});

export default BlogForm;