import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loginUser, getProductsCar, getCategories, getProducts, makeCheckout } from '../actions';

import TopBar from '../components/admin/parts/TopBar';

//import AdminBar from '../components/admin/parts/AdminBar';
//import PropTypes from 'prop-types';

//const URL_HOME = "http://localhost:3004/users";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_price: 0,
      total_product: 0,
      user: { name: '' },
      redirecthome: false,
      car: this.props.car ? this.props.car : [],
      login: this.props.login && this.props.login !== '' ? this.props.login : { id: '', name: ''}
    };
  }

  generateProducts() {
    // if (products) {
    let total = 0;
    

    return (
      <div>
        <div className="container">
          <div className="py-5 text-center">
            <h2>Checkout form</h2>
            <p className="lead">Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
          </div>

          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                <span className="badge badge-secondary badge-pill">{this.state.car ? this.state.car.length : '0'}</span>
              </h4>
              <ul className="list-group mb-3">
                {

                  this.state.car.map((item, index) => {
                    const thep = this.getP(item);
                    total += thep.price * this.state.car[index].cantidad;

                    return (
                      <li key={item.id} className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                          <h6 className="my-0">{thep.name}</h6>
                          <small className="text-muted">{this.state.car[index].cantidad}</small>
                        </div>
                        <span className="text-muted">${thep.price}</span>
                      </li>
                    )
                  })
                }
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>${total}</strong>
                </li>
              </ul>

            </div>
            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Billing address</h4>
              <form className="needs-validation" noValidate>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label data-for="firstName">First name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="" defaultValue="" required />
                    <div className="invalid-feedback">
                      Valid first name is required.
                </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label data-for="lastName">Last name</label>
                    <input type="text" className="form-control" id="lastName" placeholder="" defaultValue="" required />
                    <div className="invalid-feedback">
                      Valid last name is required.
                </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label data-for="username">Username</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">@</span>
                    </div>
                    <input type="text" className="form-control" id="username" placeholder="Username" required />
                    <div className="invalid-feedback" style={{ width: 100 + '%' }}>
                      Your username is required.
                </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label data-for="email">Email <span className="text-muted">(Optional)</span></label>
                  <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
              </div>
                </div>

                <div className="mb-3">
                  <label data-for="address">Address</label>
                  <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
              </div>
                </div>

                <div className="mb-3">
                  <label data-for="address2">Address 2 <span className="text-muted">(Optional)</span></label>
                  <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
                </div>

                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label data-for="country">Country</label>
                    <select className="custom-select d-block w-100" id="country" required>
                      <option defaultValue="">Choose...</option>
                      <option>United States</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label data-for="state">State</label>
                    <select className="custom-select d-block w-100" id="state" required>
                      <option defaultValue="">Choose...</option>
                      <option>California</option>
                    </select>
                    <div className="invalid-feedback">
                      Please provide a valid state.
                </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label data-for="zip">Zip</label>
                    <input type="text" className="form-control" id="zip" placeholder="" required />
                    <div className="invalid-feedback">
                      Zip code required.
                </div>
                  </div>
                </div>
                <hr className="mb-4" />
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="same-address" />
                  <label className="custom-control-label" data-for="same-address">Shipping address is the same as my billing address</label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="save-info" />
                  <label className="custom-control-label" data-for="save-info">Save this information for next time</label>
                </div>
                <hr className="mb-4" />

                <h4 className="mb-3">Payment</h4>

                <div className="d-block my-3">
                  <div className="custom-control custom-radio">
                    <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" defaultChecked required />
                    <label className="custom-control-label" data-for="credit">Credit card</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
                    <label className="custom-control-label" data-for="debit">Debit card</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required />
                    <label className="custom-control-label" data-for="paypal">Paypal</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label data-for="cc-name">Name on card</label>
                    <input type="text" className="form-control" id="cc-name" placeholder="" required />
                    <small className="text-muted">Full name as displayed on card</small>
                    <div className="invalid-feedback">
                      Name on card is required
                </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label data-for="cc-number">Credit card number</label>
                    <input type="text" className="form-control" id="cc-number" placeholder="" required />
                    <div className="invalid-feedback">
                      Credit card number is required
                </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label data-for="cc-expiration">Expiration  {this.state.redirecthome + "000"}</label>
                    <input type="text" className="form-control" id="cc-expiration" placeholder="" required />
                    <div className="invalid-feedback">
                      Expiration date required
                </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label data-for="cc-expiration">CVV</label>
                    <input type="text" className="form-control" id="cc-cvv" placeholder="" required />
                    <div className="invalid-feedback">
                      Security code required
                </div>
                  </div>
                </div>
                <hr className="mb-4" />

                {this.state.redirecthome ? <Redirect to="/" /> : <button type="submit" className="btn btn-primary col-sm-12" onClick={this.handleEdit}>Salvar</button>}
              </form>
            </div>
          </div>


        </div>
      </div>)
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

    if (this.props.products)
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

  handleEdit = (e) => {
    e.preventDefault();

    this.props.makeCheckout(
      this.state.car,
      this.state.login,
      this.state.total_price,
      this.state.total_product
    );
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
    let newstate = this.state;
    if (nextProps.products) {
      newstate.products = nextProps.products;
      //this.setState(this.state);
    }
    if (nextProps.redirecthome) {
      newstate.redirecthome = nextProps.redirecthome;
    }
    if (nextProps.login && nextProps.login.id && nextProps.login.name) {
      newstate.login.id = nextProps.login.id;
      newstate.login.name = nextProps.login.name;
  }

    newstate.total_price = 0;
    newstate.total_product = 0;
    this.state.car.map((item, index) => {
      const thep = this.getP(item);
      newstate.total_price += thep.price * this.state.car[index].cantidad;
      newstate.total_product += this.state.car[index].cantidad;
      return item;
    });

    newstate.products = nextProps.products;
    this.setState(newstate);

  }
  componentDidMount() {
    this.props.getProducts();
    this.props.getCategories();
    this.props.getProductsCar(this.state.login.name);

    let newstate = this.state;
    newstate.redirecthome = false;
    this.setState(newstate);
  }



  render() {
    return (
      <div>
        <TopBar />

        <div className="contenido"> {this.generateProducts()} </div>
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
    redirecthome: state.checkout.redirecthome,
    login: state.user.login
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser, getProductsCar, getProducts, getCategories, makeCheckout }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
