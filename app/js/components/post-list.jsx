'use strict';

var React = require('react');
var Post = require('./post.jsx');

//child of controller view routed to by links in header
var PostList = React.createClass({
  render: function() {
    var posts = this.props.postData.map(function(post){
      return (
        <Post postData={post} key={post._id} url={this.props.url}
          sessionData={this.props.sessionData}/>
      )
    }.bind(this));
    return (
      <div>
        <header className="thread-header">{this.props.threadSubject}</header>
        <ul className='post-list'>
          {posts}
        </ul>
      </div>
    );
  }
});

module.exports = PostList;