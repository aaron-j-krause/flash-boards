var React = require('react');
var EditPostForm = require('./edit-post-form.jsx');

module.exports = React.createClass({
  getInitialState: function(){
    return{
      showEdit: false
    }
  },

  showEdit: function(event){
    var state = this.state;
    state.showEdit = !state.showEdit;
    this.setState(state);
  },

  render: function() {
    var editForm;
    var buttonText = this.state.showEdit ? 'Cancel' : 'Edit Post';

    if (this.state.showEdit) {
      editForm = <EditPostForm className="edit-post-form"
        data={this.props.data} url={this.props.url} showEdit={this.showEdit}/>
    }

    return (
      <li className="post">
        <section className="post-body">{this.props.data.body}</section>
        <aside className="user-data">posted by: {this.props.data.user}</aside>
        <button className="show-edit" onClick={this.showEdit}>{buttonText}</button>
        {editForm}
      </li>
    );
  }
});