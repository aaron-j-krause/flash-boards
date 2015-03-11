var React = require('react');
var $ = require('jquery');


var postData = [];


var Post = React.createClass({
  render: function() {
    return (
      <li>
        <p>{this.props.data.body}</p>
        <p>posted by: {this.props.data.author}</p>
      </li>
    )
  }
})

var PostList = React.createClass({
  render: function() {
    var posts = this.props.data.map(function(post){
      return (<Post data={post} key={post._id}/> )
    });
    console.log(this.props.data, posts, "POST STUUUFF");
    return (
      <ul className='post-list'>
        {posts}
      </ul>
    )
  }
})

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
  render: function() {
    return (
      <div>
        <p>WHAT UP WHAT UP WHAT UUUUP</p>
        <PostList data={this.state.postData}/>
      </div>
    )
  }
})

React.render(<App/>, document.body)