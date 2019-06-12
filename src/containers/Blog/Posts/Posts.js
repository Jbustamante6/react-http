import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import { Link, Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';


import './Posts.css'
class Posts extends Component{
    state = { 
        posts: [],
    }

    componentDidMount(){
        console.log(this.props)
        axios.get('/posts')
        .then(response => {
            const posts = response.data.slice(0, 4)
            const updatePosts = posts.map(post => {
                return {
                    ...post,
                    author: 'MAX'
                }
            });
            this.setState({posts: updatePosts});
        }).catch(error => {
            console.log(error)
        });
    }

    postSelectedHandler = (id) => {
        // this.setState({selectedPostID: id})

        this.props.history.push({pathname: '/posts/' + id}); 
    }
    render(){
        let posts = this.state.posts.map(post => {
            return (
                 //{/* <Link to={"/"+post.id}   >  */}
                    <Post 
                        key={post.id}
                        title={post.title}
                        author={post.author} 
                        clicked={() => this.postSelectedHandler(post.id)}/>
                    
                    
              //  {/* </Link> */}
            )
        });
        return(
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost}/>

            </div>
        )
    }
}

export default Posts;