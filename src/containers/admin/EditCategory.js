import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AdminBar from '../../components/admin/parts/AdminBar';

import { getCategory, saveCategory } from '../../actions';

//const URL_HOME = "http://localhost:3004/categories/";
//let newcategory = {};
class EditCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectedit: false,
      category: {
        id: this.props.category ? this.props.category.id : null,
        title: this.props.category ? this.props.category.title : '',
        description: this.props.category ? this.props.category.description : ''
      }
    };

  }

  handleEdit = (e) => {
    e.preventDefault();


    this.props.saveCategory(
      this.props.match.params.id,
      this.state.category
    );
  }


  generateFormCategory() {
    if (true) {
      return (

        <div className="box-body table-responsive no-padding">
          <div className="new-product row">
            <div className="col-sm-3">
            </div>
            <div className="col-sm-6">
              <div className="row">
                <h2 className="col-sm-12 display-5">Edit Category</h2>
                <p className="col-sm-12 lead">Edit the category!!!.</p>
              </div>

              <form className="form" onSubmit={this.handleEdit}>
                <p className="col-sm-12">
                  <input
                    className="col-sm-12"
                    type="text"
                    placeholder="name"
                    //ref = { (input) => this.getTitle = input}
                    value={this.state.category.title}
                    onChange={this.onChangeInputTitle}
                  />
                </p>

                <p className="col-sm-12">
                  <textarea
                    className="col-sm-12"
                    rows="5"
                    placeholder="description"
                    //ref = { (input) => this.getDescription = input}
                    value={this.state.category.description}
                    onChange={this.onChangeInputDescription}
                  ></textarea>
                </p>

                <p className="col-sm-12">
                  <button className="btn btn-primary col*sm-12">Salvar</button>
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
    let newstate = this.state;
    newstate.category.title = event.target.value;
    this.setState(
     newstate
    );

  }

  onChangeInputDescription = (event) => {
    let newstate = this.state;
    newstate.category.description = event.target.value;
    this.setState(
      newstate
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category) {
      this.setState({
        redirectedit: nextProps.redirectedit,
        category: {
          id: nextProps.category.id,
          title: nextProps.category.title,
          description: nextProps.category.description
        }
      });
    }
  }

  componentDidMount() {
    this.props.getCategory(this.props.match.params.id);
    let newstate = this.state;
    newstate.redirectedit = false;
    this.setState(newstate);
  }

  render() {
    return (
      <div>
        <div className="top-bar">
          <AdminBar />
        </div>
        {this.state.redirectedit ? <Redirect to="/categories" /> : <div className="contenido"> {this.generateFormCategory()} </div>}

      </div>
    );
  }
}


function mapStateToProps(state, props) {
  return {
    category: state.category.category,
    redirectedit: state.category.redirectedit
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCategory, saveCategory }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);