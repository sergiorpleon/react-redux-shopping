import React, { Component } from 'react';
import { connect } from 'react-redux';


class EditCategoryComponent extends Component {
handleEdit = (e) => {
  e.preventDefault();
  const newTitle = this.getTitle.value;
  const newDescription = this.getDescription.value;
  const data = {
    newTitle,
    newDescription
  }
  this.props.dispatch({ type: 'UPDATE_CATEGORY', id: this.props.category.id, data: data })
}
render() {
return (
<div>
  <form onSubmit={this.handleEdit}>
    <input required type="text" ref={(input) => this.getTitle = input}
    defaultValue={this.props.category.title} placeholder="Enter Category Title" /><br /><br />
    <textarea required rows="5" ref={(input) => this.getDescription = input}
    defaultValue={this.props.category.message}  placeholder="Enter Description" /><br /><br />
    <button>Update</button>
  </form>
</div>
);
}
}
export default connect()(EditCategoryComponent);