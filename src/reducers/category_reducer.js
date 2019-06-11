export default function (state = [], action) {

    switch (action.type) {
        case 'GET_CATEGORY': return action.payload;
        case 'EDIT_CATEGORY': {
            const data = action.payload;
            const category = { id: data.id, title: data.title, description: data.description };
            console.log('edit: ' + JSON.stringify(category));
            console.log('state: ' + JSON.stringify(state));
            return {
                ...state,
                redirectedit: false,
                redirectenew: false,
                category: { 
                    id: data.id, 
                    title: data.title, 
                    description: data.description 
                }
            }
        }
        case 'SAVE_CATEGORY': {
            return {
                ...state,
                redirectedit: true,
                category: { 
                    id: action.payload.id, 
                    title: action.payload.title, 
                    description: action.payload.description 
                }
            }
        }
        case 'NEW_CATEGORY': {
            return {
                ...state,
                redirectnew: true,
                category: { 
                    id: action.payload.id, 
                    title: action.payload.title, 
                    description: action.payload.description 
                }
            }
        }
        case 'UPDATE': {
            const editcategory = {
                title: action.data.newTitle,
                message: action.data.newDescription
            };
            if (state.category.id === action.id) {
                return {
                    ...state,
                    category: editcategory

                }
                } else return state.category;

        }
        default: return state
    }

}