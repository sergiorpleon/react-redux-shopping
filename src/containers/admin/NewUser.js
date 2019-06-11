import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { newUser } from '../../actions';

import AdminBar from '../../components/admin/parts/AdminBar';
//import PropTypes from 'prop-types';

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { name: '' }, redirectnew: false
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
              <h2 className="col-sm-12 display-5">Create User</h2>
              <p className="col-sm-12 lead">Add new user!!!.</p>
            </div>
            <form className="row">
              <p className="col-sm-12">
                <input
                  className="col-sm-12"
                  type="text"
                  placeholder="name"
                  name= "name"
                  value={this.state.user.name}
                  onChange={this.onChangeInput}
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

  onChangeInput = (event) => {
    this.setState(
      {
      ...this.state,
      user: { [event.target.name] : event.target.value}
      }
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let user = this.state.user;
    this.saveUser(user);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectnew) {
      //this.state.redirectnew = nextProps.redirectnew;
      this.setState(...this.state, {redirectnew : nextProps.redirectnew});
    }
  }
  componentDidMount() {
    //this.state.redirectnew = false;
    //this.setState(this.state);
    this.setState(...this.state, {redirectnew : false});
  }

  saveUser(user) {
    this.props.newUser(user)
  }

  render() {
    return (
      <div>
        <div className="top-bar">
          <AdminBar />
        </div>
        {this.state.redirectnew ? <Redirect to="/users" /> : <div className="contenido"> {this.generateFormUser()} </div>}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user.user,
    redirectnew: state.user.redirectnew
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ newUser }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
