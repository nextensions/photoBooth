import React, { Component } from 'react'


class Post extends React.Component {
  render() {
    console.log('rerendered post', this.props.reactKey);
    return (
      <li>{this.props.post.text}</li>
    );
  }
}

class Test extends Component {
  constructor(props) {
    super(props)
    this.nextId = 1
    this.state = {
      posts: [],
    }
  }

  addPost() {
    const posts = this.state.posts
    posts.unshift({id: this.nextId, text: 'Post ' + this.nextId})
    this.nextId++
    this.setState({posts: posts})
  }

  render() {
    return (
      <div>
        <button onClick={this.addPost.bind(this)}>Add Post</button>
        <ul>
          {this.state.posts.map((post, index) => {
            if(index < 9)
              return (<Post post={post} key={post.id} id={post.id} />)
          })}
        </ul>
      </div>
    )
  }
}

export default Test