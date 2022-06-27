import { GET_ALL_DOGS, GET_DOG_BY_NAME, GET_DOG_DETAIL, CREATE_DOG, GET_ALL_TEMPERAMENTS, ORDER_DOGS, TEMP_FILTER } from './actionTypes'
const axios = require('axios')

export const getAllDogs = () => {
    return async function (dispatch) {
        return axios("http://localhost:3001/dogs")
        .then(dogs => {
            dispatch({ type: GET_ALL_DOGS, payload: dogs.data })
        })
    }
}

export const getAllTemperaments = () => {
    return async function (dispatch) {
        return axios("http://localhost:3001/temperaments")
        .then(tempe => {
            dispatch({ type:GET_ALL_TEMPERAMENTS, payload: tempe.data })
        })
    }
}

export const getDetails = (id) => {
    return async function (dispatch) {
        return axios(`http://localhost:3001/dogs/${id}`)
        .then(details => {
            dispatch({ type:GET_DOG_DETAIL, payload: details.data })
        })
    }
}

export const getDogByName = (name) => {
    return async function (dispatch) {
        return axios(`http://localhost:3001/dogs?name=${name}`)
        .then(names => {
            dispatch({ type:GET_DOG_BY_NAME, payload: names.data })
        })
    }
}

export const temperamentsFilter = (payload) => {
    console.log(payload);
    return async function (dispatch) {
        return dispatch({ type:TEMP_FILTER, payload: payload })
    }
}

export const orderDogs = (orderType) => {
    return async function (dispatch) {
        return dispatch({ type:ORDER_DOGS, payload: orderType })
    }
}