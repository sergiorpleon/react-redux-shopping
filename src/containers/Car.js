import React, { Component } from 'react';
//import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import { loginUser, getProductsCar, getCategories, getProducts } from '../actions';

import TopBar from '../components/admin/parts/TopBar';

//import AdminBar from '../components/admin/parts/AdminBar';
//import PropTypes from 'prop-types';

//const URL_HOME = "http://localhost:3004/users";

class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { name: '' },
      redirectnew: false,
      car: this.props.car ? this.props.car : [],
      login: this.props.login && this.props.login !== '' ? this.props.login : { 'name': 'JustinCane' }
    };
  }

  generateProducts(products) {
    // if (products) {
    return (
      <div className="box-body table-responsive no-padding">
        <div className="new-product row">
          <div className="col-sm-1">
          </div>
          <div className="col-sm-10">
            <div className="row">
              <h2 className="col-sm-12 display-5">Carrito</h2>
              <p className="col-sm-12 lead">Sus productos!!!.</p>
            </div>
            <table className="table table-hover">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                </tr>
                {
                  this.state.car.map((item, index) => {

                    const thep = this.getP(item);

                    return (
                      <tr key={item.id}>
                        <td >{thep.id}</td>
                        <td > <img className="img-product-crud" src={thep.image} alt="img" /></td>
                        <td >{thep.name}</td>
                        <td >{this.getCategory(thep.id_category)}</td>
                        <td >$ {item.price}</td>
                        <td>
                          <input type="number" name={index} value={item.cantidad} onChange={this.onChangeInputCant} />
                        </td>
                        <td >$ {this.multiplicar(thep.price, this.state.car[index].cantidad)}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <div className="col-sm-12">
              <Link to="/checkout" ><button className="btn btn-info">CHECKOUT</button></Link>
            </div>
          </div>
          <div className="col-sm-3">
          </div>
        </div>
      </div>

    )
    // }
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

  getP(car) {
    let theproduct = "";
    this.props.products.forEach(element => {
      if (element.id === car.id) {
        theproduct = element;
      }
    });

    return theproduct;
  }

  multiplicar(price, cant) {
    return price * cant;
  }

  onChangeInputCant = (event) => {
    event.preventDefault();

    if (event.target.value >= 1) {
      let newstate = this.state;
      newstate.car[event.target.name].cantidad = event.target.value;
      this.setState(
        newstate
      );
    }

  }

  handleSubmit = (event) => {
    event.preventDefault();

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.car) {
      let newstate = this.state;
      newstate.car = nextProps.car;
      this.setState(newstate);
    }
  }
  componentDidMount() {
    this.props.getProducts();
    this.props.getCategories();

    this.props.getProductsCar(this.state.login.name);


    let newstate = this.state;
    newstate.redirectnew = false;
    this.setState(newstate);
  }



  render() {
    return (
      <div>
        <TopBar />

        <div className="contenido"> {this.generateProducts(this.props.car)} </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    products: state.products.products,
    car: state.car.car,
    categories: state.categories,
    user: state.user.user,
    redirectnew: state.user.redirectnew,
    login: state.user.login
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser, getProductsCar, getProducts, getCategories }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Car);
