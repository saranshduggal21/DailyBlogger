import React, { useEffect, useContext } from "react"; //A hook (function) that is going to look at some context object (in this case "BlogContext") and going to give us access to the it's stored value props.
import { Button, TouchableOpacity, FlatList, Text, View, StyleSheet } from "react-native";
import { Context, Provider } from "../context/BlogContext";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const MainScreen = (props) => {
    //In order to use BlogConext and useContext together, we will need to add a new variable declaration below:
    const { state, deleteBlogPosts, retrieveBlogPosts } = useContext(Context); //"state" and "deleteBlogPosts" are going to be equal to the "value" prop that is stored already wtihin BlogContext. 
    //REMINDER: anytime we have a function like retrieveBlogPosts that modifies our state in any way, can never be called directly inside of our body.
    //^ This is because, anytime MainScreen is rendered, retrieveBlogPosts will be called and it will cause the app to be in an infinite loop.
    //^ The easiest solution to this problem would be to use the "useEffect" hook as that will only call retrieveBlogPosts ONCE, when our component (MainScreen) is first rendered. 

    useEffect (() => { //REMINDER: The "[]" as the 2nd argument in useEffect indicated that we only want to run the array function once, when our component first shows up on the screen.
        retrieveBlogPosts(); //It is safe to this function here because retrieveBlogPosts will only be called once. 

        const screenListener = props.navigation.addListener("didFocus", () => { //This line is telling React Navigation that anytime this component Main Screen gains focus or is the primary screen on the device, then the callback function below will be invoked.
//The line above is also creating a listener, which is why it is very important to clean up after ourselves, as there is a chance that at some point in time inside of our application, we might decide to stop showing MainScreen (even in the background), and in that scenario we don't want any dangling listeners (such as above) that would lead to a memory leak.
           
            retrieveBlogPosts(); //So, the first time we show MainScreen, retrieveBlogPosts is called, and anytime we return back to MainScreen, retrieveBlogPosts is called again.
        });

        return () => { //This return function is to clean up after our listener and tell React Navigation that we don't need to know about changes to MainScreen anymore as it's no longer going to be displayed at all. 
        //Since we're returning a function from useEffect, this function here will only run if our instance of MainScreen is every COMPLETELY stopped showing on the screen (even in the background).
            screenListener.remove() //As soon as MainScreen component is completely off of our device, then its saying to go ahead and clean up. 
        }
    }, []);

    return <View>
        <FlatList
            data={state}
            keyExtractor={(post) => post.title} //Each title is a unique string so it can be used as a key. 
            renderItem={({ item }) => { //"item" = our individual blogPost objects. 
                return (
                    <TouchableOpacity onPress={() => props.navigation.navigate("Show", { id: item.id })}>
                        {/* When we call the navigate function above, we can optionally pass in a SECOND ARGUMENT that will convey some information to the next screen we want to show. 
                        In this case, we want to pass an object with an ID property so that we know exactly which blog post did the user tap on and show exactly that on the next screen. */}
                        <View style={styles.container}>
                            <Text style={styles.blogTitle}> {item.title} </Text>
                            <TouchableOpacity onPress={() => deleteBlogPosts(item.id)}>
                                <Feather name="trash-2" size={27} color="black" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    </View>
};

MainScreen.navigationOptions = (props) => {//The purpose of this function is to display an add button icon so that the user can create a blog post.
//Whenever our MainScreen is about to be displayed by React Navigation, React Navigation will automatically call this function that we assigned to navigationOptions and then it'll inspect that object that we return (in return section). 
return { //We can use this object in our return section to customize the different things that are displayed inside of our Header, and what happens whenever a user taps on them, etc.
    headerRight: () => (
      <TouchableOpacity onPress={() => props.navigation.navigate("Create")} style = {styles.addButtonIcon}>
        <AntDesign name="pluscircle" style = {styles.icon}/>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 9.5,
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "black"
    },
    blogTitle: {
        fontSize: 21,
        fontFamily: "Times New Roman",
        fontWeight: "400"
    },
    icon: {
        fontSize: 28,
        color: "black",
    },
    addButtonIcon: {
        paddingRight: 10
    }
});

export default MainScreen;