import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


import AdminBar from '../../components/admin/parts/AdminBar';
//import PropTypes from 'prop-types';

import {getProducts, getCategories} from '../../actions';

const URL_HOME_PRODUCTS = "http://localhost:3004/products";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = { tienda: { products: '', categories: '' } };
  }
  generateProducts(products) {
    if (products) {
      return (
        <div className="box-body table-responsive no-padding">
          <div className="new-product row">
            <div className="col-sm-1">
            </div>
            <div className="col-sm-10">
              <p>
                <Link to="/products/new" ><button className="btn btn-primary">Create New Product</button></Link>
              </p>
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Visible</th>
                    <th>Action</th>
                  </tr>
                  {
                    products.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td >{item.id}</td>
                          <td > <img className="img-product-crud" src={item.image} alt="img"/></td>
                          <td >{item.name}</td>
                          <td >{this.getCategory(item.id_category)}</td>
                          <td >$ {item.price}</td>
                          <td> true</td>
                          <td><Link to={this.makeRoute(item.id)} ><button className="btn btn-warning">Edit</button></Link>
                            <form>
                              <button className="btn btn-danger" value={item.id} onClick={this.deleteProduct}>Delete</button>
                            </form>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            <div className="col-sm-3">
            </div>
          </div>
        </div>

      )
    }
  }

  getCategory(id) {
    let thecategory = "";
    this.props.categories.forEach(element => {
      if (element.id === id) {
        thecategory = element;
      }
    });

    return (
      <div>{
        thecategory.title
      }</div>
    )
  }

  makeRoute(id) {
    return "/products/edit/" + id;
  }

  
  componentDidMount() {
    this.props.getProducts();
    this.props.getCategories();
  }

  deleteProduct(event) {
    let URL = URL_HOME_PRODUCTS + "/" + event.target.value;
    fetch(URL, {
      method: 'delete',
    }).then(response => response.json())
      .then(json => {
        this.componentDidMount();
      })
  }

  render() {
    return (
      <div>
        <div className="top-bar">
          <AdminBar />
        </div>
        <div className="contenido"> {this.generateProducts(this.props.products)} </div>
      </div>
    );
  }
}



function mapStateToProps(state){
  return {
    products: state.products.products, 
    categories: state.categories
  };
}

 function mapDispatchToProps(dispatch){
    return bindActionCreators({getProducts, getCategories},dispatch);
 }
 

export default connect(mapStateToProps, mapDispatchToProps)(Products);
