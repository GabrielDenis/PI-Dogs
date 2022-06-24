import { GET_ALL_DOGS, GET_DOG_BY_NAME, GET_DOG_DETAIL, CREATE_DOG, GET_ALL_TEMPERAMENTS } from '../actions/actionTypes'

const initialState = {
    allDogs: [],
    dogDetail: {},
    allTemperaments: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                allDogs: action.payload
            }
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                allTemperaments: action.payload
            }
        case GET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: action.payload
            }
        default:
            return {...state}
    }
}

export default rootReducer