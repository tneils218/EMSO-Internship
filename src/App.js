import React from "react"
import {
        BrowserRouter,
        Switch,
        Route,
} from 'react-router-dom'
import UserPosts from "./components/UserPosts"
import Posts from "./components/Posts"
import Users from "./components/Users"
import Layout from "./Layout/Layout"
import Comments from "./components/Comments"
const App = () =>{
    return (
        <div>
            <BrowserRouter>
            <Switch>
                <Route path="/posts/:userId" exact component={UserPosts} />
                <Route path="/posts" exact component={Posts} />
                <Route path="/users/show" exact component={Users} /> 
                <Route path="/" exact component={Layout} />
                <Route path="/comments/:postId" exact component={Comments}/>
            </Switch>
            </BrowserRouter>
        </div>
    ) 
}

export default App;
