import React, { Component } from 'react';

import AdminBar from '../../components/admin/parts/AdminBar';
//import PropTypes from 'prop-types';

const URL_HOME = "http://localhost:3004/users";

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = { user: { name: '', description: '' } };
  }

  generateFormUser(users) {
    if (users) {
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
                  value={this.state.user.name}
                  onChange={this.onChangeInputTitle}
                />
                </p>
                
                <p className="col-sm-12">
                <button className="col-sm-12" type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Salvar</button>
                </p>
              </form>
            </div>
            <div className="col-sm-3">
            </div>
          </div>
        </div>

      )
    }
  }

  onChangeInputTitle = (event) => {
    this.state.user.name = event.target.value;
    this.setState(
      this.state
    );

  }

  handleSubmit = (event) => {
    event.preventDefault();
    let user = this.state.user;
    this.saveUser(user);

  }


  componentDidMount() {

  }

  saveUser(user) {
    console.log({ name: user.name, description: user.description });

    fetch(URL_HOME, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: user.name })

    }).then(response => response.json())
      .then(() => {

      })
  }

  render() {
    return (
      <div>

        <div className="top-bar">
          <AdminBar />
        </div>

        <div className="contenido"> {this.generateFormUser(this.state.user)} </div>

      </div>
    );
  }
}



export default NewUser;
