const URL_HOME_PRODUCTS = "http://localhost:3004/products";
const URL_HOME_CATEGORIES = "http://localhost:3004/categories";
const URL_HOME_USERS = "http://localhost:3004/users";
const URL_HOME_ORDERS_ITEMS = "http://localhost:3004/orders_items";
const URL_HOME_ORDERS = "http://localhost:3004/orders";


//------------------------------PRODUCTOS
export function getProducts() {
    const request = fetch(URL_HOME_PRODUCTS, { method: 'GET' })
        .then(response => response.json())
    return {
        type: 'GET_PRODUCTS',
        payload: request
    }
}

export function getProduct(id) {
    let URL = URL_HOME_PRODUCTS + '/' + id;
    const request = fetch(URL, { method: 'GET' })
        .then(response => response.json());

    return {
        type: 'GET_PRODUCT',
        payload: request
    }

}

export function saveProduct(id, product) {
    let URL = URL_HOME_PRODUCTS + '/' + id;
    fetch(URL, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: product.name,
            description: product.description,
            extract: product.extract,
            price: product.price,
            image: product.image,
            visible: product.visible,
            id_category: product.id_category
        })

    }).then(response => response.json())


    const p = fetch(URL_HOME_PRODUCTS, { method: 'GET' })
        .then(response => response.json())
    return {
        type: 'SAVE_PRODUCT',
        payload:
            p
    }
}

export function newProduct(product) {
    const uuidv1 = require('uuid/v1');

    let num = uuidv1();
    fetch(URL_HOME_PRODUCTS, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: 'p'+num,
            name: product.name,
            description: product.description,
            extract: product.extract,
            price: product.price,
            image: product.image,
            visible: product.visible,
            id_category: product.id_category
        })

    }).then(response => response.json())

    const p = fetch(URL_HOME_PRODUCTS, { method: 'GET' })
        .then(response => response.json())

    return {
        type: 'NEW_PRODUCT',
        payload: p
    }
}


//-------------------------------CATEGORIAS
export function getCategories() {
    const request = fetch(URL_HOME_CATEGORIES, { method: 'GET' })
        .then(response => response.json());

    return {
        type: 'GET_CATEGORIES',
        payload: request
    }
}
export function getCategory(id) {
    let URL = URL_HOME_CATEGORIES + "/" + id;
    const request = fetch(URL, { method: 'GET' })
        .then(response => response.json());
    return {
        type: 'EDIT_CATEGORY',
        payload: request
    }
}
export function saveCategory(id, category) {
    let URL = URL_HOME_CATEGORIES + '/' + id;
    fetch(URL, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: category.title, description: category.description })

    }).then(response => response.json())

    const c = fetch(URL_HOME_CATEGORIES, { method: 'GET' })
        .then(response => response.json())
    return {
        type: 'SAVE_CATEGORY',
        payload: c
    }
}

export function newCategory(category) {
    const uuidv1 = require('uuid/v1');

    let num = uuidv1();
    fetch(URL_HOME_CATEGORIES, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: 'c'+num,
            title: category.title,
            description: category.description
        })
    }).then(response => response.json())

    const c = fetch(URL_HOME_CATEGORIES, { method: 'GET' })
        .then(response => response.json())
    return {
        type: 'NEW_CATEGORY',
        payload: c
    }
}

//------------------------------------USUARIOS
export function getUsers() {
    const request = fetch(URL_HOME_USERS, { method: 'GET' })
        .then(response => response.json());

    return {
        type: 'GET_USERS',
        payload: request
    }
}

export function getUser(id) {
    let URL = URL_HOME_USERS + "/" + id;
    const request = fetch(URL, { method: 'GET' })
        .then(response => response.json());

    //console.log('user: ' + JSON.stringify(request))
    return {
        type: 'EDIT_USER',
        payload: request
    }
}
export function saveUser(id, user) {
    let URL = URL_HOME_USERS + '/' + id;
    fetch(URL, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: user.name })

    }).then(response => response.json())

    return {
        type: 'SAVE_USER',
        payload: { id: user.id, name: user.name }
    }
}

export function newUser(user) {
    const uuidv1 = require('uuid/v1');

    let num = uuidv1();

    fetch(URL_HOME_USERS, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            id: 'u'+num,
            name: user.name })
    }).then(response => response.json())

    //console.log(JSON.stringify(request))
    return {
        type: 'NEW_USER',
        payload: { name: user.name }
    }
}


export function getProductsCar(name) {
    const request = fetch(URL_HOME_USERS+'?name='+name, {
        method: 'GET'}).then(response => response.json())

    //console.log(JSON.stringify(request))
    return {
        type: 'USER_CAR',
        payload: request
    }
}

//--------------------------LOGIN
export function registerUser(user) {
    fetch(URL_HOME_USERS, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: user.name })
    }).then(response => response.json())

    //console.log(JSON.stringify(request))
    return {
        type: 'REGISTER_USER',
        payload: { name: user.name }
    }
}

export function loginUser(user) {
        const request = fetch(URL_HOME_USERS+'?name='+user.name, { method: 'GET' })
        .then(response => response.json());

    //console.log('url: '+URL_HOME_USERS+'?name='+user.name)
    //console.log('get: '+JSON.stringify(request))
    return {
        type: 'LOGIN_USER',
        payload:  request
    }
}

export function logoutUser() {
return {
        type: 'LOGOUT_USER',
        payload:  {id: '', name: ''}
    }
}

//----------------------------CAR
export function addProduct(car) {

    return {
        type: 'ADD_PRODUCT1',
        payload:  car
    }
}



export function makeCheckout(car, user, price, cantidad) {
    const uuidv1 = require('uuid/v1');

    let num = uuidv1();

    fetch(URL_HOME_ORDERS, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: 'o'+num,
            subtotal: price,
            cantidad: cantidad,
            name: user.name
         })
    }).then(response => response.json())

    car.forEach(element => {
        uuidv1 = require('uuid/v1');

        let num2 = uuidv1();
        fetch(URL_HOME_ORDERS_ITEMS, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                id: 'i'+num,
                order_id: 'o'+num,
                product_id: element.id,
                cantidad: element.cantidad,
                price: element.price
             })
        }).then(response => response.json())
    });

    

    return {
        type: 'MAKE_CHECKOUT',
        payload:  {}
    }
}


//----Orders
export function getOrders() {
    const request = fetch(URL_HOME_ORDERS, { method: 'GET' })
        .then(response => response.json())
    return {
        type: 'GET_ORDERS',
        payload: request
    }
}

export function getItems() {
    const request = fetch(URL_HOME_ORDERS_ITEMS, { method: 'GET' })
        .then(response => response.json())
    return {
        type: 'GET_ITEMS',
        payload: request
    }
}

export function getOrder(id) {
    let URL = URL_HOME_ORDERS + '/' + id;
    const request = fetch(URL, { method: 'GET' })
        .then(response => response.json());
    return {
        type: 'GET_ORDER',
        payload: request
    }
}

export function getItem(id) {
    let URL = URL_HOME_ORDERS_ITEMS + '?order_id=' + id;
    const request = fetch(URL, { method: 'GET' })
        .then(response => response.json());
    return {
        type: 'GET_ITEM',
        payload: request
    }
}