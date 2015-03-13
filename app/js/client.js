var React = require('react');
var $ = require('jquery');

var postData = [];

var Post = React.createClass({
  render: function() {
    return (
      <li className="post">
        <p>{this.props.data.body}</p>
        <p>posted by: {this.props.data.user}</p>
      </li>
    );
  }
});

var PostList = React.createClass({
  render: function() {
    var posts = this.props.data.map(function(post){
      return (<Post data={post} key={post._id}/> )
    });
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
    console.log(newPost, 'THE FUCK', JSON.stringify(newPost));
    $.ajax({
      type: "POST",
      url: this.props.url + '/' + newPost.user,
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
    console.log('IN APP', post);
    state.postData.push(post);
    this.setState(state);
  },
  render: function() {
    return (
      <div>
        <p>WHAT UP WHAT UP WHAT UUUUP</p>
        <PostList data={this.state.postData}/>
        <PostForm onNewPostSubmit={this.onNewPost} url={this.props.postsBaseUrl} />
      </div>
    )
  }
})

React.render(<App postsBaseUrl={'/posts'}/>, document.body)
