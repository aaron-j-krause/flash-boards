'use strict';

var React = require('react');
var PostActions = require('../actions/post-actions');
var ThreadActions = require('../actions/thread-actions');
var NavEmitter = require('../stores/navigation-emitter');
var ThreadList = require('./thread-list.jsx');

//child route of post-controller-view
var ProfilePage = React.createClass({
  componentDidMount: function() {
    ThreadActions.getThreadsByTag(this.props.sessionData.name);
  },

  render: function() {
    return (
      <div>
        <p>Threads You Started</p>
        <ThreadList threadData={this.props.threadData} />
        <p>Threads You're Tagged In</p>
        <ThreadList threadData={this.props.taggedThreads}/>
      </div>
    );
  }
});

module.exports = ProfilePage;
