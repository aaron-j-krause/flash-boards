var React = require('react');
var $ = require('jquery');

var postData = [];

var EditPostForm = React.createClass({
  getInitialState: function() {
    return {editPost: this.props.data}
  },
  handleChange: function(event) {
    var post = this.state.editPost;
    post.body = event.target.value;
    this.setState({
      editPost: post
    })
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var editPost = this.state.editPost;
    console.log(this.props)
    $.ajax({
      type: "PUT",
      url: this.props.url + '/',
      data: JSON.stringify(editPost),
      contentType: 'application/json',
      success: function(data) {
        this.props.onEditPost(data);
        this.setState({editPost: data});
      }.bind(this)
    });
    console.log('bloooop');
    console.log(this.state.editPost.body);
    console.log(this.props.data.user);
    this.setState({
      editPost:{
        body: ''
      }
    });
  },
  render: function() {
    return (
      <form name="edit-post" method="PUT" onSubmit={this.handleSubmit}>
        <input name="edit-post" type="text"
          value={this.state.editPost.body} onChange={this.handleChange}/>
        <input name="edit-post" type="submit" value="Edit Post"/>
      </form>
    )
  }
})

var Post = React.createClass({
  render: function() {
    return (
      <li className="post">
        <p>{this.props.data.body}</p>
        <p>posted by: {this.props.data.user}</p>
        <EditPostForm onEditPost={this.props.onEditPost} data={this.props.data}
          url={this.props.url} />
      </li>
    );
  }
});

var PostList = React.createClass({
  render: function() {
    var posts = this.props.data.map(function(post){
      console.log('IN MAP', this.props)
      return (
        <Post data={post} key={post._id}
          onEditPost={this.props.onEditPost}
          url={this.props.url}/>
      )
    }.bind(this));
    return (
      <ul className='post-list'>
        {posts}
      </ul>
    );
  }
});


var PostForm = React.createClass({
  getInitialState: function(){
    return {newPost:{body: '', user: 'dude'}}
  },
  handleChange: function(event) {
    var post = this.state.newPost;
    post.body = event.target.value;
    this.setState({newPost: post});
  },
  handleSubmit: function(event){
    event.preventDefault();
    var newPost = this.state.newPost;
    $.ajax({
      type: "POST",
      url: this.props.url + '/',
      data: JSON.stringify(newPost),
      contentType: 'application/json',
      success: function(data) {
        this.props.onNewPostSubmit(data);
        this.setState({newPost: {body: '', user: ''}});
      }.bind(this)
    });

  },
  render: function() {
    return (
      <form name="new-post" method="POST" onSubmit={this.handleSubmit}>
        <input name="new-post" value={this.state.newPost.body}
        onChange={this.handleChange} type="text"/>
        <input name="new-post" type="submit" value="Create Post"/>
      </form>
    );
  }
});




var App = React.createClass({
  getInitialState: function(){
    return({postData: postData})
  },
  componentDidMount: function(){
    $.getJSON('/posts/', function(data){
      console.log('AJAAAAX', data);
      this.setState({postData: data});
    }.bind(this));  
  },
  onNewPost: function(post){
    var state = this.state;
    //console.log('IN APP', post);
    state.postData.push(post);
    this.setState(state);
  },
  onEditPost: function(post){
    var state = this.state;
    var index = state.postData.indexOf(post);
    state[index] = post;
    this.setState(state);
  },
  render: function() {
    return (
      <div>
        <p>WHAT UP WHAT UP WHAT UUUUP</p>
        <PostList data={this.state.postData} url={this.props.postsBaseUrl} 
          onEditPost={this.onEditPost} />
        <PostForm onNewPostSubmit={this.onNewPost} url={this.props.postsBaseUrl} />
      </div>
    )
  }
})

React.render(<App postsBaseUrl={'/posts'}/>, document.body)
