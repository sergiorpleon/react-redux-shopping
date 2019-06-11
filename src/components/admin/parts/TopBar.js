import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { loginUser, getProductsCar, logoutUser } from '../../../actions';

class TopBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            car: this.props.car && this.props.car !== '' ? this.props.car : [],
            login: {
                id: this.props.login ? this.props.login.id : '',
                name: this.props.login ? this.props.login.name : ''
            }
        };
    }

    render() {
        return (
            <div className="top-bar">
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to="/" className="navbar-brand" href="#">Shopping</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample02">
                        <ul className="navbar-nav mr-auto">

                                <li className="nav-item active">
                                    <Link to="/car" className="nav-link" href="\\">Carrito ({this.state.car ? this.state.car.length : '0'})<span className="sr-only">(current)</span></Link>
                                </li>

                            {this.state.login.name !== "" ?
                                <li className="nav-item dropdown show">
                                    <a className="nav-link dropdown-toggle" href="\\" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">{this.state.login.name}</a>
                                    <div className="dropdown-menu" aria-labelledby="dropdown03">
                                        <a className="dropdown-item" href="\\">Info</a>
                                        <Link to="/products" className="dropdown-item" href="\\">Admin Panel</Link>
                                        <Link to="/logout" className="dropdown-item" href="\\">Logout</Link>
                                    </div>
                                </li>
                                :
                                <li className="nav-item active">
                                    <Link to="/login" className="nav-link" href="\\">Login<span className="sr-only">(current)</span></Link>
                                </li>
                            }
                        </ul>
                    </div>
                </nav>
            </div>

        );
    }

    logout() {
        this.props.logoutUser();
    }


    componentWillReceiveProps(nextProps) {
        let newstate = this.state;
        if (nextProps.car) {
            newstate.car = nextProps.car;
        }
        console.log(JSON.stringify(nextProps));
        if (nextProps.login && nextProps.login.id && nextProps.login.name) {
            newstate.login.id = nextProps.login.id;
            newstate.login.name = nextProps.login.name;

        }
        console.log(JSON.stringify(newstate))
        this.setState(newstate);
    }

    componentDidMount() {
        this.props.getProductsCar(this.state.login.name);
    }

}

function mapStateToProps(state) {
    return {
        car: state.car.car,
        login: state.user.login
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loginUser, getProductsCar, logoutUser }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(TopBar);