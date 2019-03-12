import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';


class Blog extends Component {
    state = { 
        posts: [],
        selectedPostID: null
    }
    componentDidMount(){
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
        this.setState({selectedPostID: id})
    }

    render () {
        const post = this.state.posts.map(post => {
            return <Post 
                key={post.id} 
                title={post.title}
                author={post.author} 
                clicked={() => this.postSelectedHandler(post.id)}/>;
        }); 
        return (
            <div>
                <section className="Posts">
                    {post}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostID}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;