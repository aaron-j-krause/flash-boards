'use strict';

var React = require('react');
var Post = require('./post.jsx');

//child of controller view routed to by links in header
var PostList = React.createClass({
  render: function() {
    var posts = this.props.postData.map(function(post, i){
      return (
        <Post postData={post} key={post._id} url={this.props.url}
          sessionData={this.props.sessionData} postNumber={i + 1}/>
      )
    }.bind(this));
    return (
      <div>
        <header className="thread-header">{this.props.threadSubject}</header>
        <ul className='thread'>
          {posts}
        </ul>
      </div>
    );
  }
});

module.exports = PostList;