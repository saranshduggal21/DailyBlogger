import automateDataContext from "./automateDataContext";
import JSONServer from "../api/JSONServer.js";

const blogReducer = (state, action) => { //This is the reducer function, with argument #1 as our state object (blogPosts) and then our dispatch function (argument #2, our action).
    switch (action.type) {

        case "deleteBlogPost":
            return state.filter((blogPost) => blogPost.id !== action.payload);
        //The filter function will iterate through all the different elements inside of our state array and then run some child function that we're going to pass in.
        //If we return a true value from the child function, then the given element will be returned inside of an overall new state array. If it's returned false, then it's going to be rejected. 
        //Payload == ID of the blog post that we're trying to delete. 

        case "editBlogPost":
            return state.map((blogPost) => { //The map() function will map through all of our blog posts (in "state"). Inside of the map function, "blogPost" indicates that we're recieveing each of the old blog posts one by one.
                //Once we find the one with the correct ID, we will return the blog post inside of our "action.payload" property, as opposed to the blog post we're iterating over. 

                return blogPost.id == action.payload.id ? action.payload : blogPost; //Ternary expression (short form of an if/else statement).
                //If the blogPost we're currently iterating over has an ID = "action.payload.id" then we found the blog post we want to edit (true). Thus, we don't want to return the old blog post and want to return the edited one instead, which is available as "action.payload". If the expression is false, then we want to return the blogPost as is.
            });

        case "retrieveBlogPosts":
            return action.payload;
        //Whenever we get a response back from our API, our assumption is that the API is the total source of truth of information inside of our app. 
        //So, when we get this response back from the API, that list of blog posts, that is the total list of blog posts! 
        //Thus, we don't add this reponse to any existing state (i.e. "...state"), and instead, we REPLACE all of our existing state with it. 

        default:
            return state;
    }
};

const addBlogPosts = () => { //Since "dispatch" is only available in the provider function of "automateDataContext", we will call addBlogPosts with the dispatch function so that we can change our state.
    //This inner function is the actual function that we call from a component when we want to change our data. This is what we're actually running inside of our different components.  
    return async (title, content, callback) => { //title & content are 2 arguments that we can pass through from our CreateScreen component.
        await JSONServer.post("/blogPosts", {title: title, content: content});
        //".post" indicates that we're creating a new blog post object within our Route endpoint ("blogPosts").
        //The 2nd argument is an object indicative of the information we're passing to the API. 

        callback() //After doing our dispatch successfully, ONLY then do our callback function. 
    };
};

const deleteBlogPosts = (dispatch) => {
    return async (id) => { //ID can be recieved an argument into this inner function as we can accept some argument that come from our component and pass thoss through to our dispatch function.
        //ID can then be used to describe the ID of the post we're trying to delete. 

        await JSONServer.delete(`/blogPosts/${id}`) //When we delete a blog post, it's going to make a request to our API. 
        dispatch({ type: "deleteBlogPost", payload: id }) //As soon as we get a success responce from our endpoint, then we'll go ahead and perform line 48, which is going to remove our post from local state. 
    };
};

const editBlogPosts = (dispatch) => {
    return async (title, content, id, callback) => { //We're going to call this inner function with our new title and content. Furthermore, in order to identify which blog post we want to edit, we need to know the blog post's ID, which also has to passed as an argument. 
        await JSONServer.put(`/blogPosts/${id}`, {title: title, content: content}) //The 2nd argument in this line is an object with our UPDATED title & content, which we've already provided to this function. 
        dispatch({ type: "editBlogPost", payload: { title: title, content: content, id: id } })
        callback()
    };
};

const retrieveBlogPosts = (dispatch) => {
    try {
    return async () => { //This inner function will make use of async & await syntax because we're going to be making a network request using this action function. 
        const serverResponse = await JSONServer.get("/blogPosts"); //"/blogPosts" is the Route endpoint to retrieve all stored blog posts. 
        //REMINDER: serverResponse.data is where our list of blog posts will be (each blog post will be stored as an array of objects). 
        dispatch({ type: "retrieveBlogPosts", payload: serverResponse.data });
        //REMINDER: React is going to take this dispatch object and automatically call the reducer. This object will then be passed in as the 2nd argument to our reducer (action).
    };
} catch (err) {
    return console.log(err.message)
}};

//The "[]" below is an empty array that represents the default value of blog posts, when our app loads up (i.e. no blog posts when our app loads up). 
//We export addBlogPosts, deleteBlogPosts and editBlogPosts as action functions in the 2nd argument below so that these functions are available to ALL OF OUR CHILD COMPONENTS inside of our application.
export const { Context, Provider } = automateDataContext (
    blogReducer, { addBlogPosts, retrieveBlogPosts, deleteBlogPosts, editBlogPosts}, []);

// export const BlogProvider = (props) => { //This is the component that is going to store all the data and provide that to the other child components.
//     //BlogProvider is being exported as a NAMED EXPORT (not using export default syntax).
//     //The reason why we aren't using export default here and only export is beause, we're going to end up export the BlogContext object as the default from this file. 

//     const [blogPosts, dispatch] = useReducer(blogReducer, []); 


//     // const addBlogPosts = () => { //addBlogPosts is a callback function, and whenever we call that, we want to add in a new blog post to the state variable. 
//     //     setBlogPosts([...blogPosts, { title: `Blog Post #${blogPosts.length + 1}` }]);
//     //     //Basically, what's going on above is that we want to use our setter to add in a new blog post to our blogPosts state variable.
//     //     //So, when we call setBlogPosts, we are passing in a brand new array as the new blogPosts variable value.
//     //     //Within this array, "...blogPosts" is telling React Native to copy & paste all the previous objects within the array.
//     //     //Then "{title" `Blog Post blah blah blah`}" is us adding a new object within the array. This new object uses a temporary string (``) where it looks at the previous length of the array and then adds 1. 

//     //     //Once our state variable is updated, it causes BlogProvider to update as well, which then causes our entire application to be updated.
//     //     //Then, a new list of blogPosts will be passed into our context, which then updates the "data" prop of the FlatList, and a new list of blogPosts is then going to flow on our MainScreen.
//     // };

//     return ( //Our blogPost Provider is now passing down an object to the FlatList, that has our current list of blogPosts and a way to change it (addBlogPosts).
//         <BlogContext.Provider value={{ data: blogPosts, addBlogPosts: addBlogPosts}}>
//             {/* When we create a context object like BlogContext, we also get inside that object, a PROVIDER. 
//         A PROVIDER is something that ACCEPTS some information and becomes the source of information in the provider component. Whatever information we provide it, its going to make available to ALL OF OUR CHILD COMPONENTS*/}
//             {props.children}
//             {/* props.children basically allows the BlogProvider component to accept another component more or less, as an argument. This other argument can then be shown inside of our blog provider. */}
//         </BlogContext.Provider>
//     );
// };
