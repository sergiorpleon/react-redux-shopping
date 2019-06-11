import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { newCategory } from '../../actions';

import AdminBar from '../../components/admin/parts/AdminBar';
//import PropTypes from 'prop-types';

class NewCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { category: { title: '', description: '' }, redirectnew: false };
  }

  generateFormCategory(categories) {
    if (categories) {
      return (

        <div className="box-body table-responsive no-padding">
          <div className="new-product row">
            <div className="col-sm-3">
            </div>
            <div className="col-sm-6">
              <div className="row">
                <h2 className="col-sm-12 display-5">Create Category</h2>
                <p className="col-sm-12 lead">Add new category!!!.</p>
              </div>
              <form className="row">
                <p className="col-sm-12">
                  <input
                    className="col-sm-12"
                    type="text"
                    placeholder="name"
                    value={this.state.category.title}
                    onChange={this.onChangeInputTitle}
                  />
                </p>
                <p className="col-sm-12">
                  <textarea
                    className="col-sm-12"
                    rows="5"
                    placeholder="description"
                    value={this.state.category.description}
                    onChange={this.onChangeInputDescription}
                  ></textarea>
                </p>
                <p className="col-sm-12">
                  <button type="submit" className="btn btn-primary col-sm-12" onClick={this.handleSubmit}>Salvar</button>
                </p>
              </form>
            </div>
            <div className="col-sm-3">
            </div>
          </div>
        </div>

      )
    }
  }

  onChangeInputTitle = (event) => {
    let newstate = this.state;
    newstate.category.title = event.target.value;
    this.setState(
      newstate
    );

  }

  onChangeInputDescription = (event) => {
    let newstate = this.state;
    newstate.category.description = event.target.value;
    this.setState(
      newstate
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let category = this.state.category;
    this.saveCategory(category);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectnew) {
      let newstate = this.state;
      newstate.redirectnew = nextProps.redirectnew;
      this.setState(newstate);
    }
  }
  componentDidMount() {
    let newstate = this.state;
    newstate.redirectnew = false;
    this.setState(newstate);
  }

  saveCategory(category) {
    this.props.newCategory(category)
  }

  render() {
    return (
      <div>

        <div className="top-bar">
          <AdminBar />
        </div>

        {this.state.redirectnew ? <Redirect to="/categories" /> : <div className="contenido"> {this.generateFormCategory(this.state.category)} </div>}

      </div>
    );
  }
}


function mapStateToProps(state, props) {
  return {
    category: state.category.category,
    redirectnew: state.category.redirectnew
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ newCategory }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(NewCategory);
