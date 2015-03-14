var React = require('react');
var Post = require('./post');

module.exports = React.createClass({
  render: function() {
    var posts = this.props.data.map(function(post){
      console.log('in postlist map', post);
      return (
        <Post data={post} key={post._id}
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
