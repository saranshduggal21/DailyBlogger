//The purpose of this file is to make a reusable function that's going to essentially automate the process of creating and setting up the context and provider stuff.
//This will allow us to use that function to add in new types of resources to our application very easily. 
//Thus, this file will consist of a new actal reducer function, a couple of helper functions (that describe how we're going to dispatch some action object), and then also provide ways to customize the initial state array.

//FURTHERMORE, this file has a lowercase "a" because we're going to eventually export a plane frunction from this file and usually by convention, anytime we export a plane funciton, we usually label it with a lowercase leading character.

import React, { useReducer } from "react";

export default (reducer, actions, initialState) => { //In this function, we're basically passing the 3 things that need to be customized anytime we need to create a context.
    //1. REDUCER FUNCTION (reducer): The 1st thing that we would have to change would be the reducer function itself. So whenever we call this function, that's going to create a data context for us automatically, and its going to recieve a first argument that's going to be the reducer function.
    //2. HELPER FUNCTIONS (actions): The 2nd thing that's going to change anytime that we create another type of resource would be the different helper functions (i.e. addBlogPost, etc.) that contained some kind of DISPATCH inside of it.
    //This is going to eventually be an object that has all these different callback functions we want to make available to our child components so that they can somehow dispatch an action and change our state.
    //3. INITIAL STATE: The last thing from BlogContext that needs to be customized is the inital state that we call useReducer with (the empty []).

    const Context = React.createContext(); //Context is an object that's going to be responsible for delivering information from the BlogProvider component to any screens or child components.

    const Provider = (props) => { //Setting up our provider function. This is going to be a very similar function to the one called BlogProvider in BlogContext.
        const [state, dispatch] = useReducer(reducer, initialState);

        //actions === {addBlogPost: (called with dispatch) => return () => {do something}}. We're going to LOOP through the "actions" object and for every key (i.e. addBlogPosts), we're going to call the function with dispatch which is going to give us back the return function. This return function will then be passed on down to the "value" prop below as the new state value.
        //This will allow all of our child components to make changes to our state object.

        const boundActions = {};
        for (let key in actions) {
            //key === "addBlogPost"
            boundActions[key] = actions[key](dispatch);
        }


        //Whatever we add in the "value" prop below will be shared with all the other child components in the project. Thus, we want to share our pieces of state and how we want to change them within our different child components.
        return <Context.Provider value={{ state: state, ...boundActions }}>
            {props.children}
        </Context.Provider>
    }

    return { Context, Provider };

    //So now, anytime we awnt to add a new resource to our project, all we have to do is create a new context file. 
    //Then we create our reducer.
    //Next we create the different helper functions that are going to dispatch an action that's going to modify our reducer. 
    //Lastly, we're going to call in "automateDataContext" and pass in our reducer, an object with all those different actions, and pass in our default state.
    //This is then going to return to us our context obejct and the provider (which is the component that makes all of our data available to something else inside of our application).
};