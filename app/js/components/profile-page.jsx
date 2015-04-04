'use strict';

var React = require('react');
var PostActions = require('../actions/post-actions');
//child route of post-controller-view
module.exports = React.createClass({
  render: function() {
    var threadLinks = this.props.threadData.map(function(thread){
      return (
        <li>
          <a style={{color:'red'}} href="#" onClick={this.handleClick}
            key={thread._id}>{thread.subject}</a>
        </li>)
    })
    return (
      <div>
        <p>THIS IS THE PROFILE PAGE</p>
        <ul>
        {threadLinks}
        </ul>
      </div>
    );
  }
})