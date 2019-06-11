const initialstate = {
        car: [
          
        ]
    
}

export default function (state = initialstate, action) {

    switch (action.type) {
        case 'ADD_PRODUCT': {
            console.log('state: ' + JSON.stringify(state.car))

            const newcar = action.payload + 1;
            return state.concat(newcar);
        }
        case 'ADD_PRODUCT1': {
            /*
            return [
                ...state.car,
            Object.assign({}, ...state.car, {
                id: action.payload.id,
              })
            ]
            */

            //let newP = -1;
            //let i = 0;
            /*
                   state.car.forEach(element => { 
                       if(action.payload.id === element.id){
                           newP = i;
                       }
                       i++;
                   });
       */


            let theitem = {};
            const prunedIds = state.car.filter(item => {
                if(item.id === action.payload.id){
                    theitem = item;
                }
                return item.id === action.payload.id // return all the items not matching the action.id
            })



            console.log('log ' + JSON.stringify(prunedIds));
            if (prunedIds.length === 0) {
                console.log('logsize ' + JSON.stringify(prunedIds.length));
                return {
                    ...state,
                    //lolo
                    car: [...state.car,
                    {
                        'id': action.payload.id,
                        'cantidad': action.payload.cantidad,
                        'price': action.payload.price
                    }]

                }

            }

            const newcant = theitem.cantidad + 1;
            const index = state.car.indexOf(theitem);
            const newcar = state.car.slice(0, index)
                .concat([{
                    'id': action.payload.id,
                    'cantidad': newcant,
                    'price': action.payload.price
                }]).concat(state.car.slice(index + 1));

            return Object.assign({}, state, {
                car: newcar
            });

/*
            return Object.assign({}, state, {
                car: state.car.concat({
                    'id': action.payload.id,
                    'cantidad': (action.payload.cantidad + 1)
                })
            });

            return {
                ...state,
                car: [...state.car, {
                    'id': action.payload.id,
                    'cantidad': action.payload.cantidad
                }]
            }

            return [
                ...state,
                Object.assign({}, ...state.car.car.indexOf(newP).cantidad, action.payload.cantidad + 1
                )
            ]

            return {
                ...state.car.indexOf(newP),
                'cantidad': action.payload.cantidad + 1

            }

            return {
                //...state,
                //lolo
                ...state.car[action.payload.id],

                'cantidad': action.payload.cantidad

            }


            return {
                ...state.car,
                // action.payload.id,
                [action.payload.id]:
                {
                    'id': action.payload.id,
                    'cantiad': 1
                }
            }
            */

        }
        default: return state
    }

}