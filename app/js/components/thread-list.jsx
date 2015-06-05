'use strict';

var React = require('react');
var PostActions = require('../actions/post-actions');
var ThreadActions = require('../actions/thread-actions');
var NavEmitter = require('../stores/navigation-emitter');

//child route of post-controller-view
var ThreadList = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    NavEmitter.addChangeListener(this._nav);
  },

  componentWillUnmount: function() {
    NavEmitter.removeChangeListener(this._nav);
  },

  _nav: function() {
    this.context.router.transitionTo('/thread')
  },

  handleClick: function(event) {
    event.preventDefault();
    ThreadActions.getThreadById(event.target.dataset.id);
    PostActions.getPosts(event.target.dataset.id);
    ThreadActions.setCurrentSubject(event.target.text);
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
        <ul className='thread-list'>
          {threadLinks}
        </ul>
    );
  }
});

module.exports = ThreadList;
