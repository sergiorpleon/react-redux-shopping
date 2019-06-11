export default function(state=[], action){

    switch(action.type){
        case 'GET_ORDERS': {
            return {
                ...state,
                orders: action.payload
            } 
        }
        case 'GET_ITEMS': {
            return {
                ...state,
                items: action.payload
            } 
        }
        case 'GET_ORDER':{

           
    console.log('payload: '+JSON.stringify(action.payload));
            return {
               ...state,
               redirectedit: false,
               order : {
                   id: action.payload.id,
                   subtotal: action.payload.subtotal,
                   cantidad: action.payload.cantidad,
                   name: action.payload.name
               }
           }
        }
        case 'GET_ITEM':{

           
            console.log('payload: '+JSON.stringify(action.payload));
                    return {
                       ...state,
                       redirectedit: false,
                       item : action.payload
                   }
                }
        default: return state
    }
    
}