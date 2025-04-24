import * as types from '../types'
const initialState = {
    buttonClicked: false,
}


export default function(state = initialState, action){
    switch(action.type){
        case types.BUTTON_CLICKED_SUCCESS:{
            console.log('success')
            const newState = {...state}
            newState.buttonClicked = !newState.buttonClicked

            return newState;
        }

        case types.BUTTON_CLICKED_FAILURE:{
            console.log('erro')

            return state;
        }

        case types.BUTTON_CLICKED_REQUEST:{
            console.log('fazendo requisição')

            return state;
        }

        default:{
            return state;
        }
    }
}

