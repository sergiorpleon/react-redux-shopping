import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AdminBar from '../../components/admin/parts/AdminBar';
//import PropTypes from 'prop-types';

import { getUsers } from '../../actions';


const URL_HOME = "http://localhost:3004/users";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { tienda: { users: '' } }
  }

  generateUsers(users) {
    if (users) {
      return (

        <div className="box-body table-responsive no-padding">
          <div className="new-product row">
            <div className="col-sm-1">
            </div>
            <div className="col-sm-10">
              <p>
                <Link to="/users/new" ><button className="btn btn-primary">Create New Users</button></Link>
              </p>
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>

                  {
                    users.map((item) => {
                      return (

                        <tr key={item.id}>
                          <td >{item.id}</td>
                          <td >{item.name}</td>
                          <td><Link to={this.makeRoute(item.id)} ><button className="btn btn-warning">Edit</button></Link>
                            <form>
                              <button className="btn btn-danger" value={item.id} onClick={this.deleteUser}>Delete</button>
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

  makeRoute(id) {
    return "/users/edit/" + id;
  }

  componentDidMount() {
    this.props.getUsers();
  }

  deleteUser(event) {
    let URL = URL_HOME + "/" + event.target.value;
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

        <div className="contenido"> {this.generateUsers(this.props.users)} </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUsers }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Users);