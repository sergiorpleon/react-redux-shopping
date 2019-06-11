import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
//import ReactDOM from 'react-dom';

import Home from '../containers/Home';
import Car from '../containers/Car';
import Checkout from '../containers/Checkout';

import Register from '../containers/Register';
import Login from '../containers/Login';
import Logout from '../containers/Logout';

import Products from '../containers/admin/Products';
import NewProduct from '../containers/admin/NewProduct';
import EditProduct from '../containers/admin/EditProduct';

import Categories from '../containers/admin/Categories';
import NewCategory from '../containers/admin/NewCategory';
import EditCategory from '../containers/admin/EditCategory';

import Users from '../containers/admin/Users';
import NewUser from '../containers/admin/NewUser';
import EditUser from '../containers/admin/EditUser';

import Orders from '../containers/admin/Orders';
import ShowOrder from '../containers/admin/ShowOrder';
//import App from './App';

//let store = createStore(helloReducer) // this is store


class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/car" component={Car} />
                        <Route exact path="/checkout" component={Checkout} />

                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/logout" component={Logout} />

                        <Route exact path="/products" component={Products} />
                        <Route exact path="/products/new" component={NewProduct} />
                        <Route exact path="/products/edit/:id" component={EditProduct} />

                        <Route exact path="/categories" component={Categories} />
                        <Route exact path="/categories/new" component={NewCategory} />
                        <Route exact path="/categories/edit/:id" component={EditCategory} />

                        <Route exact path="/users" component={Users} />
                        <Route exact path="/users/new" component={NewUser} />
                        <Route exact path="/users/edit/:id" component={EditUser} />
                        
                        <Route exact path="/orders" component={Orders} />
                        <Route exact path="/orders/:id" component={ShowOrder} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
//registerServiceWorker();

export default App;
