import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getUser, saveUser } from '../../actions';

import AdminBar from '../../components/admin/parts/AdminBar';
//import PropTypes from 'prop-types';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectedit: false,
      user: {
        id: this.props.user ? this.props.user.id : null,
        name: this.props.user ? this.props.user.name : ''
      }
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
              <h2 className="col-sm-12 display-5">Edit User</h2>
              <p className="col-sm-12 lead">Edit the user!!!.</p>
            </div>
            <form className="row">
              <p className="col-sm-12">
                <input
                  className="col-sm-12"
                  type="text"
                  placeholder="name"
                  name="name"
                  value={this.state.user.name}
                  onChange={this.onChangeInput}
                />
              </p>

              <p className="col-sm-12">
                <button type="submit" className="btn btn-primary col-sm-12" onClick={this.handleEdit}>Salvar</button>
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

  handleEdit = (e) => {
    e.preventDefault();

    this.props.saveUser(
      this.props.match.params.id,
      this.state.user
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({
        redirectedit: nextProps.redirectedit,
        user: {
          id: nextProps.user.id,
          name: nextProps.user.name
        }
      });
    }
  }
  componentDidMount() {
    this.props.getUser(this.props.match.params.id)
    let newstate =this.state;
    newstate.redirectedit = false;
    this.setState(newstate);
  }

  render() {
    return (
      <div>
        <div className="top-bar">
          <AdminBar />
        </div>
        {this.state.redirectedit ? <Redirect to="/users" /> : <div className="contenido"> {this.generateFormUser()} </div>}
      </div>
    );
  }
}


function mapStateToProps(state, props) {
  return {
    user: state.user.user,
    redirectedit: state.user.redirectedit
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUser, saveUser }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EditUser);