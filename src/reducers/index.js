import { combineReducers } from 'redux';
import products from './products_reducer';
import product from './product_reducer';
import categories from './categories_reducer';
import category from './category_reducer';
import users from './users_reducer';
import user from './user_reducer';
import car from './car_reducer';
import checkout from './checkout_reducer';
import orders from './orders_reducer';

const rootReducers = combineReducers({
    products,
    product,
    categories,
    category,
    users,
    user,
    car,
    checkout,
    orders
});

export default rootReducers;