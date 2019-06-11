import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getProducts, getCategories, addProduct, logoutUser, loginUser, getProductsCar } from '../actions';
//import PropTypes from 'prop-types';
import TopBar from '../components/admin/parts/TopBar';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tienda: { products: '', categories: '' },
      car: this.props.car && this.props.car !== '' ? this.props.car : [],
      login: this.props.login ? this.props.login : ''
    };
  }

  generateProducts(products) {
    if (products) {
      return (
        <div className="grid-product row">

          {
            products.map((item) => {
              return (

                <div key={item.id} className="col-sm-3">

                  <div className="img-grid-product" style={{ backgroundImage: `url("${item.image}")` }}>

                    <button className="btn btn-primary btn-default btn-buy" onClick={() => this.addCar(item)} ><span className="glyphicon glyphicon-shopping-cart"></span><i className="fa fa-fw fa-cart-plus"></i>Adicionar</button>
                    <div className="text-grid-product">
                      <div className="title">{item.name}</div>
                      <div className="price">$ {item.price}</div>
                      <div className="category">{this.getCategory(item.id_category)}</div>
                    </div>
                  </div>
                </div>

              )
            })
          }
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

  addCar = (product) => {
    this.props.addProduct({ 'id': product.id, 'cantidad': 1, 'price': product.price });
  }

  componentWillReceiveProps(nextProps) {
    let newstate = this.state;
    if (nextProps.car) {
      newstate.car = nextProps.car;
    }
    if (nextProps.login && nextProps.login.id && nextProps.login.name) {
      newstate.login.id = nextProps.login.id;
      newstate.login.name = nextProps.login.name;

    }
    if (nextProps.car) {
      newstate.car = nextProps.car;
    }

    newstate.products = nextProps.products;
    this.setState(newstate);
  }

  componentDidMount() {
    this.props.getProducts();
    this.props.getCategories();
    this.props.getProductsCar(this.state.login.name);
  }


  render() {
    return (
      <div>

        <TopBar />

        <div className="contenido"> {this.generateProducts(this.props.products)} </div>
        <button className="btn btn-primary">Aceptar</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.products,
    categories: state.categories,
    car: state.car.car,
    login: state.user.login
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getProducts, getCategories, addProduct, logoutUser, loginUser, getProductsCar }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
