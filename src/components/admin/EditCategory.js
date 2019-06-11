import React, { Component } from 'react';

import AdminBar from './parts/AdminBar';
//import PropTypes from 'prop-types';

const URL_HOME = "http://localhost:3004/categories/";

class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { category: '' };
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
                <h2 className="col-sm-12 display-5">Edit Category</h2>
                <p className="col-sm-12 lead">Edit the category!!!.</p>
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
                  <button className="col-sm-12" type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Salvar</button>
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
    this.state.category.title = event.target.value;
    this.setState(
      this.state
    );

  }

  onChangeInputDescription = (event) => {
    this.state.category.description = event.target.value;
    this.setState(
      this.state
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let category = this.state.category;
    this.saveCategory(category);

  }


  componentDidMount() {
    let URL = URL_HOME + this.props.match.params.id;
    fetch(URL, { method: 'GET' })
      .then(response => response.json())
      .then(json => {
        this.setState({ category: json });
        console.log(json);
      })
  }

  saveCategory(category) {
    console.log({ title: category.tile, description: category.description });
    //fetch(URL_HOME, {
    //  method: 'delete'
    //});
    let URL = URL_HOME + this.props.match.params.id;
    fetch(URL, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: category.title, description: category.description })

    }).then(response => response.json())
      .then(() => {
        this.componentDidMount();
      })
  }

  render() {
    return (
      <div>

        <div className="top-bar">
          <AdminBar />
        </div>

        <div className="contenido"> {this.generateFormCategory(this.state.category)} </div>

      </div>
    );
  }
}



export default EditCategory;
