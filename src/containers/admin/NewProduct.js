import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { newProduct } from '../../actions';

import AdminBar from '../../components/admin/parts/AdminBar';
//import PropTypes from 'prop-types';

const URL_HOME_CATEGORIES = "http://localhost:3004/categories";

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: { name: '', description: '', extract: '', price: '', image: '', visible: '', id_category: '' },
      categories: '',
      redirectnew: false,
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
                    value={this.state.id_category}
                    onChange={this.onChangeInputCategory}
                  >

                    {
                      this.generateOptions()
                    }
                  </select>
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

  generateOptions() {
    let cats = this.state.categories;

    if (cats) {
      return (
        cats.map((item) => {
          return (
            <option key={item.id} value={item.id}>{item.title}</option>
          )
        })


      )
    }
  }
  onChangeInputTitle = (event) => {
    let newstate = this.state;
    newstate.product.name = event.target.value;
    this.setState(
      newstate
    );

  }

  onChangeInputDescription = (event) => {
    let newstate = this.state;
    newstate.product.description = event.target.value;
    //this.state.product.description = event.target.value;
    this.setState(
      newstate
    );

  }

  onChangeInputExtract = (event) => {
    let newstate = this.state;
    newstate.product.extract = event.target.value;
    //this.state.product.extract = event.target.value;
    this.setState(
      newstate
    );

  }

  onChangeInputPrice = (event) => {
    let newstate = this.state;
    newstate.product.price = event.target.value;
    //this.state.product.price = event.target.value;
    this.setState(
      newstate
    );

  }

  onChangeInputImage = (event) => {
    let newstate = this.state;
    newstate.product.image = event.target.value;
    //this.state.product.image = event.target.value;
    this.setState(
      newstate
    );

  }

  onChangeInputVisible = (event) => {
    let newstate = this.state;
    newstate.product.visible = event.target.value;
    //this.state.product.visible = event.target.value;
    this.setState(
      newstate
    );

  }

  onChangeInputCategory = (event) => {
    let newstate = this.state;
    newstate.product.id_category = event.target.value;
    //this.state.product.id_category = event.target.value;
    this.setState(
      newstate
    );

  }

  handleSubmit = (event) => {
    event.preventDefault();
    let product = this.state.product;
    this.saveProduct(product);

  }


  componentWillReceiveProps(nextProps) {
    console.log('nextProps: ', nextProps)
    if (nextProps.redirectnew) {
      let newstate = this.state;
    newstate.redirectnew = true;
      //this.state.redirectnew = true;
      this.setState(newstate);
    }
  }

  componentDidMount() {
    fetch(URL_HOME_CATEGORIES, { method: 'GET' })
      .then(response => response.json())
      .then(json => {
        let newstate = this.state;
        newstate.categories = json;
        newstate.redirectnew = false;
        this.setState(newstate);
      });
  }

  saveProduct(product) {
    //console.log({ name: product.tile, description: product.description });
    this.props.newProduct(product);

  }

  render() {
    return (
      <div>

        <div className="top-bar">
          <AdminBar />
        </div>

        {this.state.redirectnew ? <Redirect to="/products" /> : <div className="contenido"> {this.generateFormProduct(this.state.product)} </div>}

      </div>
    );
  }
}


function mapStateToProps(state, props) {
  return {
    product: state.product.product,
    redirectnew: state.product.redirectnew
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ newProduct }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);

