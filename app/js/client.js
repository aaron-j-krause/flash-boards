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
  handleDelete: function(event) {
    console.log(this.state.editPost);
    var _id = this.state.editPost._id;
    $.ajax({
      type: "DELETE",
      url: this.props.url + '/' + _id,
      contentType: 'application/json',
      success: function(data) {
        this.props.onDelete(data);
      }.bind(this)
    });
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var editPost = this.state.editPost;
    $.ajax({
      type: "PUT",
      url: this.props.url + '/',
      data: JSON.stringify(editPost),
      contentType: 'application/json',
      success: function(data) {
        this.props.onEdit(data);
        this.setState({editPost: data});
        this.props.showEdit();
      }.bind(this)
    });

  },
  render: function() {
    return (
      <form name="edit-post" method="PUT" onSubmit={this.handleSubmit}>
        <input name="edit-post" type="text"
          value={this.state.editPost.body} onChange={this.handleChange}/>
        <input name="edit-post" type="submit" value="Save Changes"/>
        <input name="edit-post" type="button"
          onClick={this.handleDelete} value="Delete"/>
      </form>
    )
  }
})

var Post = React.createClass({
  getInitialState: function(){
    return{
      showEdit: false
    }
  },
  showEdit: function(event){
    var state = this.state;
    state.showEdit = !state.showEdit;
    this.setState(state);
  },
  render: function() {
    var postForm;
    var buttonText = this.state.showEdit ? 'Cancel' : 'Show Edit';
    if (this.state.showEdit) {
      postForm = <EditPostForm onEdit={this.props.handlers.edit} onDelete={this.props.handlers.del}
        data={this.props.data} url={this.props.url} showEdit={this.showEdit}/>
        }
    return (
      <li className="post">
        <p>{this.props.data.body}</p>
        <p>posted by: {this.props.data.user}</p>
        <button onClick={this.showEdit}>{buttonText}</button>
        {postForm}
      </li>
    );
  }
});

var PostList = React.createClass({
  render: function() {
    var posts = this.props.data.map(function(post){
      return (
        <Post data={post} key={post._id}
          handlers={this.props.handlers}
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
    return {createPost:{body: '', user: 'dude'}}
  },
  handleChange: function(event) {
    var post = this.state.createPost;
    post.body = event.target.value;
    this.setState({createPost: post});
  },
  handleSubmit: function(event){
    event.preventDefault();
    var createPost = this.state.createPost;
    $.ajax({
      type: "POST",
      url: this.props.url + '/',
      data: JSON.stringify(createPost),
      contentType: 'application/json',
      success: function(data) {
        this.props.onCreatePostSubmit(data);
        var state = this.state;
        state.createPost.body = '';
        this.setState(state);
      }.bind(this)
    });

  },
  render: function() {
    return (
      <form name="create-post" method="POST" onSubmit={this.handleSubmit}>
        <input name="create-post" value={this.state.createPost.body}
        onChange={this.handleChange} type="text"/>
        <input name="create-post" type="submit" value="Create Post"/>
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
  onCreatePost: function(post){
    var state = this.state;
    state.postData.push(post);
    this.setState(state);
  },
  onEditPost: function(post){
    var state = this.state;
    var index = state.postData.indexOf(post);
    state[index] = post;
    this.setState(state);
  },
  onDeletePost: function(post) {
    var state = this.state;
    var index = -1;
    state.postData.forEach(function(p, i) {
      if(p._id === post._id) index =  i
    });
    console.log('POST DATA', state.postData);
    console.log('POOOOST INDEX', post, index);
    state.postData.splice(index, 1);
    this.setState(state);
  },
  render: function() {
    var postHandlers = {
      edit: this.onEditPost,
      create: this.onCreatePost,
      del: this.onDeletePost
    }
    return (
      <div>
        <PostList data={this.state.postData} url={this.props.postsBaseUrl} 
          handlers={postHandlers} />
        <PostForm onCreatePostSubmit={this.onCreatePost} url={this.props.postsBaseUrl} />
      </div>
    )
  }
})

React.render(<App postsBaseUrl={'/posts'}/>, document.body)
