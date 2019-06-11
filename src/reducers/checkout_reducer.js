const initialstate = {
  
}

export default function (state = initialstate, action) {

    switch (action.type) {
        case 'MAKE_CHECKOUT': {
            
            return {
                ...state,
                redirecthome: true
            };
        }
        default: return state
    }

}