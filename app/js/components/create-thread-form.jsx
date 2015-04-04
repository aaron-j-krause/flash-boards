'use strict';

var React = require('react');
var ThreadActions = require('../actions/thread-actions');

module.exports = React.createClass({
  getInitialState: function(){
    return {createdThread:{subject: ''}}
  },

  handleChange: function(event) {
    var thread = this.state.createdThread;
    thread.subject = event.target.value;
    this.setState({createdThread: thread});
  },

  handleSubmit: function(event){
    event.preventDefault();
    var createdThread = this.state.createdThread;
    createdThread.author = this.props.sessionData.name;
    ThreadActions.createThread(createdThread);
    this.setState({createdThread:{subject: ''}});
  },

  render: function() {
    return (
      <form name="create-thread" method="POST" className="create-thread-form"
        onSubmit={this.handleSubmit}>
        <input type="text" name="create-thread" value={this.state.createdThread.subject}
        onChange={this.handleChange} placeholder="Subject"></input>
        <input name="create-thread" type="submit" value="Create Thread"/>
      </form>
    );
  }
});
