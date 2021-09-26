import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MainScreen from "./src/screens/MainScreen";
import { Provider } from "./src/context/BlogContext"; //Curly braces are being used here because BlogProvider was a Named export and not the usual export default, so in order to import BlogProvider we have to use the {}.
import ShowScreen from "./src/screens/ShowScreen";
import CreateScreen from "./src/screens/CreateScreen";
import EditScreen from "./src/screens/EditScreen";

const navigator = createStackNavigator(
  { //ARGUMENT #1: Route Configuration Object (Going to list out all the possible screens that a user can navigate to).
    Main: MainScreen,
    Show: ShowScreen,
    Create: CreateScreen,
    Edit: EditScreen
  },
  { //ARGUMENT #2: Some configuration options specifically for our stack navigator. 
    initialRouteName: "Main",
    defaultNavigationOptions: { //This is going to set the title inside of our header. 
      title: "My Blogs"
    }
  });

const App = createAppContainer(navigator);

export default () => { //Exporting my own custom component that will allow me to wrap the React Stack Navigator within my own Provider Component.
  return ( //The main reason why "props.children" was added in BlogProvider was mainly because we can now pass "App" as the child to our BlogProvider (i.e. in BlogProvider, "props.children" = "App").
  //"App" being considered as a child of BlogProvider is extremely important because now the BlogProvider is WRAPPING THE STACK NAVIGATOR INSIDE OF IT, which therefore includes all the other screens and components that we're displaying inside of our application.
    <Provider>
      <App/>
    </Provider>
  );
};
