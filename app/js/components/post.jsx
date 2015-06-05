'use strict';

var React = require('react');
var EditPostForm = require('./edit-post-form.jsx');

module.exports = React.createClass({
  getInitialState: function(){
    return{
      showEdit: false
    }
  },

  showEdit: function(){
    var state = this.state;
    state.showEdit = !state.showEdit;
    this.setState(state);
  },

  render: function() {
    var isUser = (this.props.sessionData.name === this.props.postData.user);
    var buttonText = this.state.showEdit ? 'Cancel' : 'Edit Post';
    var editForm;
    var editButton;

    if(isUser) {
      editButton = <button className="show-edit"
        onClick={this.showEdit}>{buttonText}</button>
    }

    if (this.state.showEdit) {
      editForm = <EditPostForm className="edit-post-form"
        postData={this.props.postData} showEdit={this.showEdit}/>
    }

    return (
      <li className="post">
        <div className="post-top-bar">#</div>
        <aside className="user-data">posted by: {this.props.postData.user}</aside>
        <section className="post-body">{this.props.postData.body}</section>
        {editButton}
        {editForm}
      </li>
    );
  }
});