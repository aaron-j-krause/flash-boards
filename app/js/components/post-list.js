var React = require('react');
var Post = require('./post');

module.exports = React.createClass({
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
