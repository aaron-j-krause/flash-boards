var React = require('react');

var EditPostForm = require('./edit-post-form');

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
      editForm = <EditPostForm onEdit={this.props.handlers.edit} onDelete={this.props.handlers.del}
        data={this.props.data} url={this.props.url} showEdit={this.showEdit}/>
        }
    return (
      <li className="post">
        <p>{this.props.data.body}</p>
        <p>posted by: {this.props.data.user}</p>
        <button onClick={this.showEdit}>{buttonText}</button>
        {editForm}
      </li>
    );
  }
});