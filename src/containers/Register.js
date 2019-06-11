import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import { registerUser } from '../actions';

//import AdminBar from '../components/admin/parts/AdminBar';
//import PropTypes from 'prop-types';

//const URL_HOME = "http://localhost:3004/users";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { name: '' },
      redirectnew: false,
      login: this.props.login && this.props.login !== '' ? this.props.login : ''
    };
  }

  generateFormUser() {

    return (

      <div className="box-body table-responsive no-padding">
        <div className="new-product row">
          <div className="col-sm-3">
          </div>
          <div className="col-sm-6">
            <div className="row">
              <h2 className="col-sm-12 display-5">Create Account</h2>
              <p className="col-sm-12 lead">Create an account for build!!!.</p>
            </div>
            <form className="row">
              <p className="col-sm-12">
                <input
                  className="col-sm-12"
                  type="text"
                  placeholder="name"
                  value={this.state.user.name}
                  onChange={this.onChangeInputTitle}
                />
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

  onChangeInputTitle = (event) => {
    let newstate = this.state;
    newstate.user.name = event.target.value;
    this.setState(
      newstate
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let user = this.state.user;
    this.saveUser(user);
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

  saveUser(user) {
    this.props.registerUser(user)
  }

  render() {
    return (
      <div>
        <div className="top-bar">
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to="/" className="navbar-brand" href="\\">Shopping</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample02">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link to="/car" className="nav-link">Carrito ({this.state.car})<span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item active">
                  <Link to="/login" className="nav-link">User {this.state.login.name}<span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item dropdown show">
                  <a className="nav-link dropdown-toggle" href="\\" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Dropdown</a>
                  <div className="dropdown-menu" aria-labelledby="dropdown03">
                    <a className="dropdown-item" href="\\">Action</a>
                    <a className="dropdown-item" href="\\">Another action</a>
                    <a className="dropdown-item" href="\\">Something else here</a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        {this.state.redirectnew ? <Redirect to="/" /> : <div className="contenido"> {this.generateFormUser()} </div>}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user.user,
    redirectnew: state.user.redirectnew,
    login: state.user.login
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ registerUser }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
