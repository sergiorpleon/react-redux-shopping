import React, { Component } from 'react';

import AdminBar from './parts/AdminBar';
//import PropTypes from 'prop-types';

const URL_HOME = "http://localhost:3004/products";
const URL_HOME_CATEGORIES = "http://localhost:3004/categories";

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: { name: '', description: '', extract: '', price: '', image: '', visible: '', category: '' },
      categories: ''
    };
  }

  generateFormProduct(products) {
    if (products) {
      return (

        <div className="box-body table-responsive no-padding">
          <div className="new-product row">
            <div className="col-sm-3">
            </div>
            <div className="col-sm-6">
              <div className="row">
                <h2 className="col-sm-12 display-5">Create Product</h2>
                <p className="col-sm-12 lead">Add new product!!!.</p>
              </div>
              <form className="row">
                <p className="col-sm-12">
                  <input
                    className="col-sm-12"
                    type="text"
                    placeholder="name"
                    value={this.state.product.name}
                    onChange={this.onChangeInputTitle}
                  />
                </p>
                <p className="col-sm-12">
                  <textarea
                    className="col-sm-12"
                    rows="5"
                    placeholder="description"
                    value={this.state.product.description}
                    onChange={this.onChangeInputDescription}
                  ></textarea>
                </p>
                <p className="col-sm-12">
                  <input
                    className="col-sm-12"
                    type="text"
                    placeholder="extract"
                    value={this.state.product.extract}
                    onChange={this.onChangeInputExtract}
                  />
                </p>
                <p className="col-sm-12">
                  <input
                    className="col-sm-12"
                    type="text"
                    placeholder="price"
                    value={this.state.product.price}
                    onChange={this.onChangeInputPrice}
                  />
                </p>
                <p className="col-sm-12">
                  <input
                    className="col-sm-12"
                    type="text"
                    placeholder="image"
                    value={this.state.product.image}
                    onChange={this.onChangeInputImage}
                  />
                </p>
                <p className="col-sm-12">
                  <input
                    className="col-sm-12"
                    type="text"
                    placeholder="visible"
                    value={this.state.product.visible}
                    onChange={this.onChangeInputVisible}
                  />
                </p>
                <p className="col-sm-12">
                  <select
                    className="col-sm-12"
                    type="text"
                    placeholder="category"
                    value={this.state.category}
                    onChange={this.onChangeInputCategory}
                  >

                    {
                      this.generateOptions()
                    }
                  </select>
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

  generateOptions() {
    let cats = this.state.categories;

    if (cats) {

      return (


        cats.map((item) => {
          return (
            <option key={item.id} value={item.title}>{item.title}</option>
          )
        })


      )
    }
  }
  onChangeInputTitle = (event) => {
    this.state.product.name = event.target.value;
    this.setState(
      this.state
    );

  }

  onChangeInputDescription = (event) => {
    this.state.product.description = event.target.value;
    this.setState(
      this.state
    );

  }

  onChangeInputExtract = (event) => {
    this.state.product.extract = event.target.value;
    this.setState(
      this.state
    );

  }

  onChangeInputPrice = (event) => {
    this.state.product.price = event.target.value;
    this.setState(
      this.state
    );

  }

  onChangeInputImage = (event) => {
    this.state.product.image = event.target.value;
    this.setState(
      this.state
    );

  }

  onChangeInputVisible = (event) => {
    this.state.product.visible = event.target.value;
    this.setState(
      this.state
    );

  }

  onChangeInputCategory = (event) => {
    this.state.product.category = event.target.value;
    this.setState(
      this.state
    );

  }

  handleSubmit = (event) => {
    event.preventDefault();
    let product = this.state.product;
    this.saveProduct(product);

  }


  componentDidMount() {
    fetch(URL_HOME_CATEGORIES, { method: 'GET' })
      .then(response => response.json())
      .then(json => {
        this.state.categories = json;
        this.setState(this.state);

      });
  }

  saveProduct(product) {
    //console.log({ name: product.tile, description: product.description });

    fetch(URL_HOME, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: product.name,
        description: product.description,
        extract: product.extract,
        price: product.price,
        image: product.image,
        visible: product.visible,
        category: product.category
      })

    }).then(response => response.json())
      .then(() => {

      })
  }

  render() {
    return (
      <div>

        <div className="top-bar">
          <AdminBar />
        </div>

        <div className="contenido"> {this.generateFormProduct(this.state.product)} </div>

      </div>
    );
  }
}



export default NewProduct;
