'use strict';

var React = require('react');
var Post = require('./post.jsx');

module.exports = React.createClass({
  render: function() {
    var posts = this.props.postData.posts.map(function(post){
      return (
        <Post postData={post} key={post._id} url={this.props.url}
          sessionData={this.props.sessionData}/>
      )
    }.bind(this));
    return (
      <div>
        <header>{this.props.postData.thread.subject}</header>
        <ul className='post-list'>
          {posts}
        </ul>
      </div>
    );
  }
});
