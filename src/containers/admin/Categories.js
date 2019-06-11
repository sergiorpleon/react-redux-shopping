import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



import AdminBar from '../../components/admin/parts/AdminBar';
//import PropTypes from 'prop-types';

import { getCategories, getCategory } from '../../actions';

const URL_HOME = "http://localhost:3004/categories";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = { tienda: { categories: '' } }
  }

  generateCategories(categories) {
    if (categories) {
      return (

        <div className="box-body table-responsive no-padding">
          <div className="new-product row">
            <div className="col-sm-1">
            </div>
            <div className="col-sm-10">
              <p>
                <Link to="/categories/new" ><button className="btn btn-primary">Create New Category</button></Link>
              </p>
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>

                  {
                    categories.map((item) => {
                      return (

                        <tr key={item.id}>
                          <td >{item.id}</td>
                          <td >{item.title}</td>
                          <td><Link to={this.makeRoute(item.id)} ><button className="btn btn-warning">Edit</button></Link>
                            <form>
                              <button className="btn btn-danger" value={item.id} onClick={this.deleteCategory}>Delete</button>
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
    return "/categories/edit/" + id;
  }

  componentDidMount() {
    this.props.getCategories();
  }

  deleteCategory(event) {
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
        <div className="contenido"> {this.generateCategories(this.props.categories)} </div>
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {
    categories: state.categories,
    category: state.category.category

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCategories, getCategory }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Categories);
