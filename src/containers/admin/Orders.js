import React, { Component } from 'react';
//import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import { loginUser, getProductsCar, getCategories, getProducts, getUsers, getOrders, getItems } from '../../actions';

import AdminBar from '../../components/admin/parts/AdminBar';
//import PropTypes from 'prop-types';

//const URL_HOME = "http://localhost:3004/users";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { name: '' },
      redirectnew: false,
      orders: this.props.orders ? this.props.orders : [],
      items: this.props.items ? this.props.items : [],
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
                  <th>User</th>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
                {
                  this.state.orders.map((item, index) => {

                    const theu = this.getU(item);
                    //const thep = this.getP(item);

                    return (
                      <tr key={item.id}>
                        <td >{item.id}</td>
                        <td >{theu.name}</td>
                        <td >{item.cantidad}</td>
                        <td >{item.subtotal}</td>
                        <td><Link to={this.makeRoute(item.id)} ><button className="btn btn-info">View</button></Link></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <div className="col-sm-12">
              <Link to="/checkout" ><button className="btn btn-primary">CHECKOUT</button></Link>
            </div>
          </div>
          <div className="col-sm-3">
          </div>
        </div>
      </div>

    )
    // }
  }

  makeRoute(id) {
    return "/orders/" + id;
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

  getU(order) {
    let theuser = "";
    this.props.users.forEach(element => {
      if (element.name === order.name) {
        theuser = element;
      }
    });

    return theuser;
  }

  getP(order) {
    let theitems = {price: 0, cantidad: 0};
    this.props.items.forEach(element => {
      if (element.order_id === order.id) {
        //theitems.price += element.price;
        //theitems.cantidad += element.cantidad;
      }
    });

    return theitems;
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
    let newstate = this.state;
    if (nextProps.car) {
      newstate.car = nextProps.car;
    }
    if (nextProps.users) {
      newstate.users = nextProps.users;
    }
    if (nextProps.orders) {
      newstate.orders = nextProps.orders;
    }
    if (nextProps.items) {
      newstate.items = nextProps.items;
    }
    this.setState(newstate);
  }
  componentDidMount() {
    this.props.getItems();
    this.props.getOrders();
    this.props.getProducts();
    this.props.getCategories();
    this.props.getUsers();

    this.props.getProductsCar(this.state.login.name);


    let newstate = this.state;
    newstate.redirectnew = false;
    this.setState(newstate);
    console.log('state: ' + JSON.stringify(this.state))
  }



  render() {
    return (
      <div>
        <div className="top-bar">
          <AdminBar />
        </div>
        <div className="contenido"> {this.generateProducts(this.props.orders)} </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    orders: state.orders.orders,
    items: state.orders.items,
    products: state.products.products,
    car: state.car.car,
    categories: state.categories,
    user: state.user.user,
    users: state.users,
    redirectnew: state.user.redirectnew,
    login: state.user.login
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser, getProductsCar, getProducts, getCategories, getOrders, getUsers, getItems }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
