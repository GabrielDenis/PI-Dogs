import { GET_ALL_DOGS, GET_DOG_BY_NAME, GET_DOG_DETAIL, CREATE_DOG, GET_ALL_TEMPERAMENTS } from './actionTypes'
const axios = require('axios')

export const getAllDogs = () => {
    return async function (dispatch) {
        return axios("http://localhost:3001/dogs")
        .then(dogs => {
            dispatch({ type: GET_ALL_DOGS, payload: dogs.data })
        })
    }
}