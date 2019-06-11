export default function(state=[], action){

    switch(action.type){
        case 'GET_PRODUCT':{
             return {
                ...state,
                redirectedit: false,
                product : {
                    name: action.payload.name,
                    description: action.payload.description,
                    extract: action.payload.extract,
                    price: action.payload.price,
                    image: action.payload.image,
                    visible: action.payload.visible,
                    id_category: action.payload.id_category
                }
            }
        }
        case 'SAVE_PRODUCT':{
            return {
                ...state,
                redirectedit: true,
                products :  action.payload
            }
        }
        case 'NEW_PRODUCT':{

            return {
                ...state,
                redirectnew: true,
                products :  action.payload
            }
        }
        default: return state
    }
    
}