export default function(state=[], action){

    switch(action.type){
        case 'EDIT_USER': {
            console.log('state: ' + JSON.stringify(state));
            console.log('action: ' + JSON.stringify(action.payload));
            return {
                ...state,
                redirectedit: false,
                redirectnew: false,
                user : {
                    id: action.payload.id, 
                    name: action.payload.name
                }
            }
        }
        case 'SAVE_USER': {
            return {
                ...state,
                redirectedit: true,
                user : {
                    id: action.payload.id, 
                    name: action.payload.name
                }
            }
        }
        case 'NEW_USER': {
            return {
                ...state,
                redirectnew: true,
                user : {
                    id: action.payload.id, 
                    name: action.payload.name
                }
            }
        }
        case 'REGISTER_USER': {
            return {
                ...state,
                redirectnew: true,
                login : {
                    id: action.payload.id, 
                    name: action.payload.name
                }
            }
        }
        case 'LOGIN_USER': {
            if(action.payload[0]){
            return {
                ...state,
                redirectnew: true,
                login : {
                    id: action.payload[0].id, 
                    name: action.payload[0].name
                }
            }
        }else{
            return state
        }

        }

        case 'LOGOUT_USER': {
            console.log('LOGOUT_USER');
            let newstate = state;
            newstate.redirectnew = true;
            newstate.login.id = '';
            newstate.login.name = '';
            return  {
                ...state,
                redirectnew: true,
                login : {
                    id: '', 
                    name: ''
                }
            }
        }

        case 'USER_CAR': {
            if(action.payload[0]){
            return {
                ...state,
                redirectnew: true,
                cars :  action.payload[0].car 
            }
        }else{
            return state
        }
        }
        default: return state
    }
    
}