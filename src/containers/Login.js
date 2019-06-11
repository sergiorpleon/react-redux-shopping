import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loginUser } from '../actions';

import TopBar from '../components/admin/parts/TopBar';

//import AdminBar from '../components/admin/parts/AdminBar';
//import PropTypes from 'prop-types';

//const URL_HOME = "http://localhost:3004/users";

class Login extends Component {
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
              <h2 className="col-sm-12 display-5">Login</h2>
              <p className="col-sm-12 lead">Login for build!!!.</p>
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
                <button type="submit" className="btn btn-primary col-sm-12" onClick={this.handleSubmit}>Login</button>
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
    this.props.loginUser(user)
  }

  render() {
    return (
      <div>
        <TopBar />

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
  return bindActionCreators({ loginUser }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
