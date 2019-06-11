import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



import { getProduct, saveProduct } from '../../actions';

import AdminBar from '../../components/admin/parts/AdminBar';
//import PropTypes from 'prop-types';

const URL_HOME_CATEGORIES = "http://localhost:3004/categories";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectedit: false,
      product: {
        id: this.props.product ? this.props.product.id : null,
        name: this.props.product ? this.props.product.name : '',
        description: this.props.product ? this.props.product.description : '',
        extract: this.props.product ? this.props.product.extract : '',
        price: this.props.product ? this.props.product.price : '',
        image: this.props.product ? this.props.product.image : '',
        visible: this.props.product ? this.props.product.visible : '',
        id_category: this.props.product ? this.props.product.id_category : ''
      }
    };
  }

  generateFormProduct(products) {

    return (

      <div className="box-body table-responsive no-padding">
        <div className="new-product row">
          <div className="col-sm-3">
          </div>
          <div className="col-sm-6">
            <div className="row">
              <h2 className="col-sm-12 display-5">Edit Product</h2>
              <p className="col-sm-12 lead">Edit the product!!!.</p>
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

  generateOptions() {
    let cats = this.state.categories;

    if (cats) {
      return (
        cats.map((item) => {
          if (this.state.product.id_category === item.id) {
            return (
              <option selected key={item.id} value={item.id}>{item.title}</option>
            )
          } else {
            return (
              <option key={item.id} value={item.id}>{item.title}</option>
            )
          }

        })
      )
    }
  }

  onChangeInputTitle = (event) => {
    let newstate = this.state;
    newstate.product.name = event.target.value;
    //this.state.product.name = event.target.value;
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
    this.props.saveProduct(this.props.match.params.id, product);
  }


  componentWillReceiveProps(nextProps) {
    console.log('nextProps: ', nextProps)
    if (nextProps.product) {
      this.setState(

        {
          product: {
            id: nextProps.product.id,
            name: nextProps.product.name,
            description: nextProps.product.description,
            extract: nextProps.product.extract,
            price: nextProps.product.price,
            image: nextProps.product.image,
            visible: nextProps.product.visible,
            id_category: nextProps.product.id_category
          }, redirectedit: nextProps.redirectedit
        });
    }
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
    fetch(URL_HOME_CATEGORIES, { method: 'GET' })
      .then(response => response.json())
      .then(json => {
        let newstate = this.state;
        newstate.categories = json;
        newstate.redirectedit = false;
        this.setState(newstate);
      });
  }

  render() {
    return (
      <div>
        <div className="top-bar">
          <AdminBar />
        </div>
        {this.state.redirectedit ? <Redirect to="/products" /> : <div className="contenido"> {this.generateFormProduct()} </div>}
      </div>
    );
  }
}


function mapStateToProps(state, props) {
  return {
    product: state.product.product,
    redirectedit: state.product.redirectedit
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getProduct, saveProduct }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
