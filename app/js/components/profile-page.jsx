'use strict';

var React = require('react');
var PostActions = require('../actions/post-actions');
var ThreadActions = require('../actions/thread-actions');
//child route of post-controller-view
module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  handleClick: function(event) {
    event.preventDefault();
    ThreadActions.getThreadById(event.target.dataset.id);
  },

  render: function() {
    var threadLinks = this.props.threadData.map(function(thread, i){
      return (
        <li key={i}>
          <a style={{color:'red'}} href="#" onClick={this.handleClick}
            key={thread._id} data-id={thread._id}>{thread.subject}</a>
        </li>)
    }.bind(this));

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